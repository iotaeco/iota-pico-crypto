import { ObjectHelper } from "@iota-pico/core/dist/helpers/objectHelper";
import { CryptoError } from "../error/cryptoError";

/**
 * Sha3 implementation.
 */
export class Sha3 {
    /* Padding to use for Keccak */
    public static readonly KECCAK_PADDING: Uint32Array = new Uint32Array([1, 256, 65536, 16777216]);
    /* @internal */
    private static readonly SHIFT: Uint8Array = new Uint8Array([0, 8, 16, 24]);
    /* @internal */
    private static readonly ROUND_CONSTANTS: Uint32Array = new Uint32Array([1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
        0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
        2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
        2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
        2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648]);

    /* @internal */
    private readonly _padding: Uint32Array;
    /* @internal */
    private readonly _outputBits: number;
    /* @internal */
    private readonly _blockCount: number;
    /* @internal */
    private readonly _byteCount: number;
    /* @internal */
    private readonly _outputBlocks: number;
    /* @internal */
    private readonly _extraBytes: number;
    /* @internal */
    private _blocks: Uint32Array;
    /* @internal */
    private _state: Uint32Array;
    /* @internal */
    private _reset: boolean;
    /* @internal */
    private _block: number;
    /* @internal */
    private _start: number;
    /* @internal */
    private _lastByteIndex: number;

    /**
     * Create a new instance of SHA3.
     * @param bits The number of input bits.
     * @param padding The padding to use.
     * @param outputBits The number of output bits.
     */
    constructor(bits: number, padding: Uint32Array, outputBits: number) {
        this._padding = padding;
        this._outputBits = outputBits;
        this._blockCount = (1600 - (bits << 1)) >> 5;
        this._byteCount = this._blockCount << 2;
        this._outputBlocks = outputBits >> 5;
        this._extraBytes = (outputBits & 31) >> 3;

        this.reset();
    }

    /**
     * Reset the digest.
     */
    public reset(): void {
        this._reset = true;
        this._block = 0;
        this._start = 0;
        this._blocks = new Uint32Array(this._blockCount + 1);
        this._state = new Uint32Array(50);
    }

    /**
     * Update the digest.
     * @param input Array of data to use in the update.
     */
    public update(input: ArrayBuffer): void {
        if (!ObjectHelper.isType(input, ArrayBuffer)) {
            throw new CryptoError("Input is not of type ArrayBuffer");
        }
        const message: Uint8Array = new Uint8Array(input);
        const length = message.length;
        let index = 0;
        let i;

        while (index < length) {
            if (this._reset) {
                this._reset = false;
                this._blocks[0] = this._block;
                for (i = 1; i < this._blockCount + 1; ++i) {
                    this._blocks[i] = 0;
                }
            }
            for (i = this._start; index < length && i < this._byteCount; ++index) {
                this._blocks[i >> 2] |= message[index] << Sha3.SHIFT[i++ & 3];
            }
            this._lastByteIndex = i;
            if (i >= this._byteCount) {
                this._start = i - this._byteCount;
                this._block = this._blocks[this._blockCount];
                for (i = 0; i < this._blockCount; ++i) {
                    this._state[i] ^= this._blocks[i];
                }
                this.keccakPermutation(this._state);
                this._reset = true;
            } else {
                this._start = i;
            }
        }
    }

    /**
     * Finalize and return the hash for the digest, will also reset the state.
     * @return Array buffer containing the digest.
     */
    public digest(): ArrayBuffer {
        this.finalize();

        let i = 0;
        let j = 0;
        const bytes = this._outputBits >> 3;
        let buffer;
        if (this._extraBytes) {
            buffer = new ArrayBuffer((this._outputBlocks + 1) << 2);
        } else {
            buffer = new ArrayBuffer(bytes);
        }
        const array = new Uint32Array(buffer);
        while (j < this._outputBlocks) {
            for (i = 0; i < this._blockCount && j < this._outputBlocks; ++i, ++j) {
                array[j] = this._state[i];
            }
        }
        if (this._extraBytes) {
            array[i] = this._state[i];
            buffer = buffer.slice(0, bytes);
        }
        this.reset();

        return buffer;
    }

    /* @internal */
    private finalize(): void {
        let i = this._lastByteIndex;
        this._blocks[i >> 2] |= this._padding[i & 3];
        if (this._lastByteIndex === this._byteCount) {
            this._blocks[0] = this._blocks[this._blockCount];
            for (i = 1; i < this._blockCount + 1; ++i) {
                this._blocks[i] = 0;
            }
        }
        this._blocks[this._blockCount - 1] |= 0x80000000;
        for (i = 0; i < this._blockCount; ++i) {
            this._state[i] ^= this._blocks[i];
        }
        this.keccakPermutation(this._state);
    }

    /* @internal */
    private keccakPermutation(s: Uint32Array): void {
        // tslint:disable-next-line:one-variable-per-declaration
        let h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9,
            b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17,
            b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33,
            b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
        for (n = 0; n < 48; n += 2) {
            c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
            c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
            c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
            c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
            c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
            c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
            c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
            c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
            c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
            c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

            h = c8 ^ ((c2 << 1) | (c3 >>> 31));
            l = c9 ^ ((c3 << 1) | (c2 >>> 31));
            s[0] ^= h;
            s[1] ^= l;
            s[10] ^= h;
            s[11] ^= l;
            s[20] ^= h;
            s[21] ^= l;
            s[30] ^= h;
            s[31] ^= l;
            s[40] ^= h;
            s[41] ^= l;
            h = c0 ^ ((c4 << 1) | (c5 >>> 31));
            l = c1 ^ ((c5 << 1) | (c4 >>> 31));
            s[2] ^= h;
            s[3] ^= l;
            s[12] ^= h;
            s[13] ^= l;
            s[22] ^= h;
            s[23] ^= l;
            s[32] ^= h;
            s[33] ^= l;
            s[42] ^= h;
            s[43] ^= l;
            h = c2 ^ ((c6 << 1) | (c7 >>> 31));
            l = c3 ^ ((c7 << 1) | (c6 >>> 31));
            s[4] ^= h;
            s[5] ^= l;
            s[14] ^= h;
            s[15] ^= l;
            s[24] ^= h;
            s[25] ^= l;
            s[34] ^= h;
            s[35] ^= l;
            s[44] ^= h;
            s[45] ^= l;
            h = c4 ^ ((c8 << 1) | (c9 >>> 31));
            l = c5 ^ ((c9 << 1) | (c8 >>> 31));
            s[6] ^= h;
            s[7] ^= l;
            s[16] ^= h;
            s[17] ^= l;
            s[26] ^= h;
            s[27] ^= l;
            s[36] ^= h;
            s[37] ^= l;
            s[46] ^= h;
            s[47] ^= l;
            h = c6 ^ ((c0 << 1) | (c1 >>> 31));
            l = c7 ^ ((c1 << 1) | (c0 >>> 31));
            s[8] ^= h;
            s[9] ^= l;
            s[18] ^= h;
            s[19] ^= l;
            s[28] ^= h;
            s[29] ^= l;
            s[38] ^= h;
            s[39] ^= l;
            s[48] ^= h;
            s[49] ^= l;

            b0 = s[0];
            b1 = s[1];
            b32 = (s[11] << 4) | (s[10] >>> 28);
            b33 = (s[10] << 4) | (s[11] >>> 28);
            b14 = (s[20] << 3) | (s[21] >>> 29);
            b15 = (s[21] << 3) | (s[20] >>> 29);
            b46 = (s[31] << 9) | (s[30] >>> 23);
            b47 = (s[30] << 9) | (s[31] >>> 23);
            b28 = (s[40] << 18) | (s[41] >>> 14);
            b29 = (s[41] << 18) | (s[40] >>> 14);
            b20 = (s[2] << 1) | (s[3] >>> 31);
            b21 = (s[3] << 1) | (s[2] >>> 31);
            b2 = (s[13] << 12) | (s[12] >>> 20);
            b3 = (s[12] << 12) | (s[13] >>> 20);
            b34 = (s[22] << 10) | (s[23] >>> 22);
            b35 = (s[23] << 10) | (s[22] >>> 22);
            b16 = (s[33] << 13) | (s[32] >>> 19);
            b17 = (s[32] << 13) | (s[33] >>> 19);
            b48 = (s[42] << 2) | (s[43] >>> 30);
            b49 = (s[43] << 2) | (s[42] >>> 30);
            b40 = (s[5] << 30) | (s[4] >>> 2);
            b41 = (s[4] << 30) | (s[5] >>> 2);
            b22 = (s[14] << 6) | (s[15] >>> 26);
            b23 = (s[15] << 6) | (s[14] >>> 26);
            b4 = (s[25] << 11) | (s[24] >>> 21);
            b5 = (s[24] << 11) | (s[25] >>> 21);
            b36 = (s[34] << 15) | (s[35] >>> 17);
            b37 = (s[35] << 15) | (s[34] >>> 17);
            b18 = (s[45] << 29) | (s[44] >>> 3);
            b19 = (s[44] << 29) | (s[45] >>> 3);
            b10 = (s[6] << 28) | (s[7] >>> 4);
            b11 = (s[7] << 28) | (s[6] >>> 4);
            b42 = (s[17] << 23) | (s[16] >>> 9);
            b43 = (s[16] << 23) | (s[17] >>> 9);
            b24 = (s[26] << 25) | (s[27] >>> 7);
            b25 = (s[27] << 25) | (s[26] >>> 7);
            b6 = (s[36] << 21) | (s[37] >>> 11);
            b7 = (s[37] << 21) | (s[36] >>> 11);
            b38 = (s[47] << 24) | (s[46] >>> 8);
            b39 = (s[46] << 24) | (s[47] >>> 8);
            b30 = (s[8] << 27) | (s[9] >>> 5);
            b31 = (s[9] << 27) | (s[8] >>> 5);
            b12 = (s[18] << 20) | (s[19] >>> 12);
            b13 = (s[19] << 20) | (s[18] >>> 12);
            b44 = (s[29] << 7) | (s[28] >>> 25);
            b45 = (s[28] << 7) | (s[29] >>> 25);
            b26 = (s[38] << 8) | (s[39] >>> 24);
            b27 = (s[39] << 8) | (s[38] >>> 24);
            b8 = (s[48] << 14) | (s[49] >>> 18);
            b9 = (s[49] << 14) | (s[48] >>> 18);

            s[0] = b0 ^ (~b2 & b4);
            s[1] = b1 ^ (~b3 & b5);
            s[10] = b10 ^ (~b12 & b14);
            s[11] = b11 ^ (~b13 & b15);
            s[20] = b20 ^ (~b22 & b24);
            s[21] = b21 ^ (~b23 & b25);
            s[30] = b30 ^ (~b32 & b34);
            s[31] = b31 ^ (~b33 & b35);
            s[40] = b40 ^ (~b42 & b44);
            s[41] = b41 ^ (~b43 & b45);
            s[2] = b2 ^ (~b4 & b6);
            s[3] = b3 ^ (~b5 & b7);
            s[12] = b12 ^ (~b14 & b16);
            s[13] = b13 ^ (~b15 & b17);
            s[22] = b22 ^ (~b24 & b26);
            s[23] = b23 ^ (~b25 & b27);
            s[32] = b32 ^ (~b34 & b36);
            s[33] = b33 ^ (~b35 & b37);
            s[42] = b42 ^ (~b44 & b46);
            s[43] = b43 ^ (~b45 & b47);
            s[4] = b4 ^ (~b6 & b8);
            s[5] = b5 ^ (~b7 & b9);
            s[14] = b14 ^ (~b16 & b18);
            s[15] = b15 ^ (~b17 & b19);
            s[24] = b24 ^ (~b26 & b28);
            s[25] = b25 ^ (~b27 & b29);
            s[34] = b34 ^ (~b36 & b38);
            s[35] = b35 ^ (~b37 & b39);
            s[44] = b44 ^ (~b46 & b48);
            s[45] = b45 ^ (~b47 & b49);
            s[6] = b6 ^ (~b8 & b0);
            s[7] = b7 ^ (~b9 & b1);
            s[16] = b16 ^ (~b18 & b10);
            s[17] = b17 ^ (~b19 & b11);
            s[26] = b26 ^ (~b28 & b20);
            s[27] = b27 ^ (~b29 & b21);
            s[36] = b36 ^ (~b38 & b30);
            s[37] = b37 ^ (~b39 & b31);
            s[46] = b46 ^ (~b48 & b40);
            s[47] = b47 ^ (~b49 & b41);
            s[8] = b8 ^ (~b0 & b2);
            s[9] = b9 ^ (~b1 & b3);
            s[18] = b18 ^ (~b10 & b12);
            s[19] = b19 ^ (~b11 & b13);
            s[28] = b28 ^ (~b20 & b22);
            s[29] = b29 ^ (~b21 & b23);
            s[38] = b38 ^ (~b30 & b32);
            s[39] = b39 ^ (~b31 & b33);
            s[48] = b48 ^ (~b40 & b42);
            s[49] = b49 ^ (~b41 & b43);

            s[0] ^= Sha3.ROUND_CONSTANTS[n];
            s[1] ^= Sha3.ROUND_CONSTANTS[n + 1];
        }
    }
}