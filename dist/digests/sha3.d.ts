/**
 * Sha3 implementation.
 */
export declare class Sha3 {
    static readonly KECCAK_PADDING: Uint32Array;
    /**
     * Create a new instance of SHA3.
     * @param bits The number of input bits.
     * @param padding The padding to use.
     * @param outputBits The number of output bits.
     */
    constructor(bits: number, padding: Uint32Array, outputBits: number);
    /**
     * Reset the digest.
     */
    reset(): void;
    /**
     * Update the digest.
     * @param input Array of data to use in the update.
     */
    update(input: ArrayBuffer): void;
    /**
     * Finalize and return the hash for the digest, will also reset the state.
     * @returns Array buffer containing the digest.
     */
    digest(): ArrayBuffer;
}
