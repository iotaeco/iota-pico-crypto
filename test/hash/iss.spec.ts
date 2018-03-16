/**
 * Tests for ISS.
 */
import { Address } from "@iota-pico/data/dist/data/address";
import { Hash } from "@iota-pico/data/dist/data/hash";
import { SignatureMessageFragment } from "@iota-pico/data/dist/data/signatureMessageFragment";
import { Trytes } from "@iota-pico/data/dist/data/trytes";
import * as chai from "chai";
import { ISS } from "../../src/hash/iss";

describe("ISS", () => {
    it("can be created", () => {
        const obj = new ISS();
        chai.should().exist(obj);
    });

    describe("key", () => {
        it("can fail with invalid seed", async () => {
            chai.expect(() => ISS.key(undefined, undefined, undefined)).to.throw("The seed");
        });

        it("can fail with invalid index", async () => {
            const seed = Hash.fromTrytes(Trytes.fromString("N".repeat(81)));
            chai.expect(() => ISS.key(seed, undefined, undefined)).to.throw("The index");
        });

        it("can fail with invalid security", async () => {
            const seed = Hash.fromTrytes(Trytes.fromString("N".repeat(81)));
            chai.expect(() => ISS.key(seed, 0, undefined)).to.throw("The security");
        });

        it("can fail with invalid security too low", async () => {
            const seed = Hash.fromTrytes(Trytes.fromString("N".repeat(81)));
            chai.expect(() => ISS.key(seed, 0, 0)).to.throw("The security");
        });

        it("can fail with invalid security too high", async () => {
            const seed = Hash.fromTrytes(Trytes.fromString("N".repeat(81)));
            chai.expect(() => ISS.key(seed, 0, 4)).to.throw("The security");
        });

        it("can be called", () => {
            const seed = Hash.fromTrytes(Trytes.fromString("N".repeat(81)));

            const res = ISS.key(seed, 0, 1);
            // tslint:disable-next-line:max-line-length
            chai.expect(Array.from(res)).to.be.deep.equal([-1, 0, 1, 0, 1, 1, 0, 0, 0, 1, -1, -1, 1, 0, 0, 0, 1, 0, 1, -1, -1, -1, 0, -1, -1, 0, -1, -1, 0, 1, -1, 1, 0, 1, 1, -1, 1, -1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 1, 1, 0, 0, 1, -1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, -1, 0, -1, 0, -1, 1, 0, -1, 0, 1, 1, -1, -1, 0, -1, 0, 1, 0, -1, 1, -1, -1, 0, 0, 0, 1, -1, -1, 1, 1, 0, -1, -1, 0, 1, 0, 1, 0, 1, 1, 1, -1, 1, -1, 0, 1, 0, -1, -1, -1, 0, -1, 0, 1, -1, -1, 0, -1, 0, 1, 0, -1, 0, -1, 0, -1, -1, 0, 1, 1, 0, 0, 0, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, -1, 1, 0, 1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, -1, 0, 1, -1, 1, 1, -1, -1, 0, -1, -1, 1, 0, 1, -1, 0, -1, 1, 1, -1, 1, 1, -1, 1, 0, 1, -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 0, 1, 0, -1, 0, 1, 1, -1, 1, 0, 1, -1, -1, 0, 1, 1, 0, 0, 0, 0, -1, -1, 0, 0, -1, 0, 1, -1, 1, 0, -1, -1, 1, -1, 0, 1, -1, -1, 0, 1, 0, 0, 0, 1, 0, -1, -1, 1, -1, 0, 1, -1, 1, 0, 0, -1, 0, 0, -1, 0, -1, -1, 0, 1, -1, -1, 0, 1, -1, 0, 1, -1, 1, -1, 1, 0, 1, -1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, -1, 0, 0, -1, 0, 1, 0, 1, 1, -1, -1, 0, 1, 1, 0, 0, 0, -1, 1, 0, 1, 0, 0, -1, 1, -1, 0, 0, 1, -1, -1, -1, -1, -1, -1, 0, 1, 1, -1, -1, 1, 0, -1, -1, 0, 0, 0, 0, 1, 0, 0, 1, -1, 0, 0, 0, -1, 1, 1, -1, 0, 0, -1, -1, 1, -1, 1, 0, -1, 1, 0, 0, -1, 0, 0, 1, 1, -1, -1, 1, 0, 0, 0, 1, 0, -1, -1, -1, 1, -1, 1, 0, -1, 1, 1, 1, 0, -1, 0, 1, -1, -1, 0, 0, 0, 1, 0, 1, 0, -1, 1, 0, 0, 0, -1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, -1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, -1, 1, 0, 1, 1, 1, 0, 0, -1, 0, 0, 0, -1, -1, 0, 1, -1, 0, -1, 0, 1, 0, 0, 1, -1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 1, 0, -1, 1, 0, -1, 1, 1, 0, -1, -1, 1, 1, 1, 0, 0, 1, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, -1, 0, 0, 1, 1, -1, -1, 0, 1, -1, 1, -1, 1, 1, 0, -1, -1, 1, 0, -1, -1, 0, 1, 0, 1, 1, -1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 0, 0, 0, 0, 1, -1, -1, 1, 1, -1, -1, 0, 0, 0, 1, -1, 0, 0, -1, -1, 1, 0, 1, -1, -1, -1, 0, 0, -1, 0, 0, 0, -1, 1, -1, 1, -1, 1, 1, -1, 0, 0, 1, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, -1, -1, 1, 0, 0, 1, 0, 1, 0, 1, -1, 1, 0, 0, 1, -1, 0, -1, 0, -1, 0, -1, -1, -1, 1, 0, 0, 1, -1, -1, 0, -1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, -1, -1, 0, 0, 1, 0, 1, -1, 1, -1, 1, -1, -1, 0, -1, -1, 1, 0, 0, 0, 1, 0, 0, -1, 1, 1, 1, 0, 0, 1, 0, -1, -1, 1, 0, -1, 1, 0, -1, 0, -1, 1, -1, 0, 0, 0, 1, 0, 0, -1, 0, 1, 0, -1, 1, -1, -1, -1, 1, -1, -1, -1, 0, 0, 1, 0, 0, -1, 1, 0, 0, 1, -1, 0, 1, 0, -1, -1, -1, 0, 1, 0, -1, 1, -1, 1, -1, 1, -1, 1, -1, -1, 1, -1, 0, 1, 1, 0, 0, -1, -1, 0, 0, 0, -1, 0, 1, -1, 1, 0, -1, 1, 0, -1, -1, 1, -1, 0, 0, -1, 0, 0, 0, -1, 1, -1, 1, 1, 1, -1, 0, 0, 0, -1, 0, 1, 0, 1, 1, 1, 1, 0, -1, -1, -1, 0, 0, -1, 0, 0, 1, 1, -1, 1, -1, 1, 0, 0, -1, 0, -1, 0, 1, 1, 0, 1, 0, -1, 1, 0, 0, 1, 0, 0, 1, -1, -1, -1, -1, 0, 0, 1, -1, -1, 0, 0, 1, 0, 0, -1, -1, 1, -1, 1, 0, -1, 0, 1, -1, 0, 1, 0, -1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 0, 0, 0, -1, 1, -1, -1, 1, 1, 1, -1, 0, 0, 0, 1, 1, 0, -1, -1, 1, -1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, -1, -1, -1, 1, 1, 1, 1, 1, 0, -1, 1, 0, 0, -1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, -1, -1, 0, -1, 0, 1, 0, 1, -1, -1, -1, -1, 1, 0, 0, -1, 0, 1, -1, 1, -1, 0, -1, -1, 0, 0, -1, 0, -1, 0, -1, 1, 1, -1, -1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0, 1, 0, 0, -1, 0, 1, 1, -1, 1, 0, 1, -1, 0, 1, 0, -1, 0, -1, -1, 0, 1, 1, 0, 0, -1, 0, -1, 1, 0, 1, 0, -1, 1, 0, 0, -1, -1, 0, -1, 1, 1, -1, 0, 0, 1, 1, 1, 0, 0, 1, -1, -1, 0, 1, -1, 1, 0, -1, -1, 0, -1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, -1, 1, -1, 0, 0, 0, 1, 1, -1, -1, 0, 1, -1, 0, -1, -1, 0, 1, -1, -1, 0, -1, -1, 0, 0, 0, 1, 0, 1, -1, 0, -1, 0, -1, 0, -1, 1, 0, 1, 1, 0, 1, 0, 0, -1, 1, 0, -1, -1, 1, 1, -1, 1, 0, -1, 0, -1, -1, 0, -1, 0, -1, -1, 1, 1, -1, -1, -1, 0, 1, -1, 0, 1, 0, 1, 1, 1, -1, 1, 1, 0, -1, 0, 0, -1, -1, 0, 1, 0, 0, -1, 0, -1, 0, 0, 1, 1, 1, 1, 0, 1, 0, -1, 0, 0, 0, -1, 1, 1, 0, 1, 1, -1, 0, 0, -1, 0, -1, 0, 0, 1, 0, 0, 0, 1, -1, 0, -1, 0, -1, 0, 0, 1, -1, -1, 0, -1, 1, 0, -1, -1, 1, -1, 1, -1, 1, -1, 0, 0, -1, 1, 1, 0, -1, 0, 1, -1, 0, 1, -1, 1, 1, 0, 0, 0, 1, -1, -1, 0, 1, 0, 1, 1, 1, 0, 0, -1, 1, -1, -1, 1, 1, 1, -1, 1, 1, 0, 0, -1, 1, 0, -1, -1, -1, 0, -1, -1, 1, 1, 0, 0, 0, 1, -1, 0, 0, -1, 0, 1, -1, -1, 1, 0, 0, -1, 0, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, 1, 1, -1, 1, 0, -1, 0, 1, 0, -1, 1, -1, 0, 1, 1, 1, -1, 0, -1, 0, 1, 1, -1, 1, -1, -1, 1, 0, 1, -1, 0, -1, -1, 0, 0, -1, 0, 1, 1, -1, 0, 1, 0, 0, -1, -1, 0, -1, 1, 0, -1, 1, 0, 0, 1, 1, -1, -1, 1, -1, 1, 1, 0, 1, -1, 0, -1, 1, 0, -1, -1, 1, -1, 0, -1, 0, 1, -1, 1, 0, -1, 1, -1, 0, 1, 0, -1, 1, 1, 0, -1, 0, 1, 0, -1, 0, -1, 0, 0, -1, 0, 0, -1, 0, -1, -1, 0, -1, 1, -1, 1, 0, 1, 0, 0, -1, 0, 1, -1, -1, 1, -1, 1, -1, -1, 0, -1, 1, -1, 1, 0, 0, 0, -1, -1, 0, -1, 1, 0, -1, -1, -1, 0, -1, 0, -1, 1, -1, 1, 1, 0, -1, -1, 1, -1, -1, 0, -1, 0, 1, 0, 1, -1, 1, -1, 1, -1, 1, 1, -1, -1, 0, 1, -1, 0, 1, 1, -1, 1, 0, -1, -1, 0, 0, 0, 0, 1, 1, 0, -1, -1, -1, 1, 1, 1, 0, 1, 0, 1, 0, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 0, 1, -1, 0, 1, 0, 1, 1, -1, 0, 0, 1, 1, 1, 1, 0, 0, -1, -1, -1, 0, 0, 1, -1, -1, 1, 1, -1, -1, 0, 0, 0, -1, 1, -1, 1, -1, 1, 0, 0, 0, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 1, 1, -1, -1, 0, 1, -1, 1, -1, 0, 0, 0, -1, -1, -1, 0, 1, 1, 0, 1, -1, 0, 1, 0, -1, 1, 0, -1, 1, 0, 0, 1, 0, -1, 0, -1, 0, -1, 1, 1, 0, -1, 0, 1, 1, 1, -1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, -1, 1, 1, 0, 1, 1, 1, 1, -1, 0, 0, -1, 0, -1, -1, 1, -1, 1, 1, 0, 0, 1, -1, -1, -1, 0, -1, 0, 0, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 0, 0, -1, 0, -1, 1, 1, 0, 1, 0, 1, -1, -1, 0, 0, 0, 0, 0, 0, 1, 1, 1, -1, -1, -1, 1, 1, -1, 1, 0, 1, 0, 0, 0, 0, 1, -1, 1, -1, -1, -1, 1, 0, -1, -1, 0, 0, 1, -1, -1, 0, -1, 1, 1, 0, 0, -1, 0, -1, -1, 1, 1, -1, 1, 0, 0, -1, 0, -1, 1, 1, -1, -1, -1, 1, 1, -1, 0, 1, 1, 0, -1, 0, 1, 1, -1, -1, 1, 1, 0, 0, -1, 0, 1, 0, 1, -1, 1, -1, 0, 1, 1, 0, 0, 0, 0, -1, 1, 1, 0, -1, -1, 0, 1, 0, -1, -1, 1, 1, 1, -1, -1, -1, 0, 0, -1, -1, 0, 1, 0, -1, 0, 1, 1, -1, 1, -1, 0, -1, -1, -1, 0, 1, 1, 0, 0, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, 0, -1, -1, 0, 0, -1, 0, 0, -1, 0, -1, 0, -1, -1, -1, 1, 0, -1, -1, -1, -1, 1, 0, 1, 1, 0, -1, 0, 1, 0, 1, 1, 0, -1, -1, 1, 0, 0, -1, -1, -1, 1, 0, 1, 1, 1, -1, 0, -1, 1, -1, 1, 0, -1, 1, -1, 1, 0, 1, -1, -1, 1, 0, 0, 0, 1, -1, 1, 1, 0, 0, -1, 1, -1, 0, -1, 0, -1, -1, 1, 0, 0, -1, -1, -1, 1, 1, 0, -1, 0, 1, 0, -1, 1, -1, 1, 0, 0, 1, 0, 1, 0, -1, 0, 0, -1, 1, -1, 1, 1, 1, 1, 1, 0, 0, -1, -1, -1, 0, 0, -1, -1, 1, 0, 0, 0, 0, -1, 0, -1, -1, -1, 0, -1, -1, 1, -1, 0, 0, -1, -1, 0, 0, -1, -1, -1, 1, 0, 0, 0, 0, -1, 1, 1, 0, 0, -1, 0, 1, 0, -1, 1, 1, 1, 0, -1, 1, 0, 1, 0, 1, 1, 1, 0, 0, -1, 1, 1, 1, 0, -1, -1, 0, -1, 0, 0, 1, -1, 0, 0, 1, -1, 0, 1, -1, -1, 0, -1, -1, 1, -1, 0, 1, 0, -1, 0, 0, 1, -1, 0, -1, 0, 0, 0, 1, -1, 0, 1, 1, 0, -1, -1, 1, 1, -1, 0, 0, 0, 0, -1, -1, 0, 1, 0, 1, 0, -1, -1, 1, -1, 1, -1, 1, 0, 0, 1, 0, 0, 0, 0, -1, 0, -1, 1, 1, 0, 0, -1, -1, -1, 0, 0, -1, -1, 0, -1, 1, -1, 1, 0, -1, 0, 0, 1, 0, -1, -1, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, -1, -1, 1, -1, -1, 1, 1, 0, -1, -1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, -1, 0, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 0, 1, 1, -1, 0, -1, 1, 1, 0, 1, 0, -1, 0, -1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, -1, 1, -1, 0, 1, 1, 0, -1, 1, -1, 0, 0, 1, -1, 0, 0, 1, 1, -1, 1, 0, 1, -1, -1, 0, -1, 0, 0, -1, 1, 0, 0, -1, -1, -1, 1, 0, 1, -1, -1, -1, -1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, 0, -1, 0, 0, 1, 1, 0, 1, -1, -1, 1, 1, 1, 1, 1, -1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, -1, -1, 0, 0, 1, -1, 1, -1, -1, -1, 1, 0, 1, -1, -1, 1, 0, 0, 0, 0, 0, 0, -1, 1, 1, -1, 0, -1, -1, -1, 0, -1, 1, 1, -1, -1, 1, 0, -1, -1, -1, 0, 0, 0, 1, 0, 0, -1, -1, -1, -1, 1, -1, 0, 0, 0, -1, 1, 0, 1, 1, -1, 1, 1, -1, -1, 1, 1, 1, -1, 0, 1, 1, 1, -1, 1, -1, 0, 0, 0, 0, -1, 0, 1, 0, 1, 1, -1, 0, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 0, 1, 0, 0, 0, -1, 1, -1, -1, 1, -1, 0, 0, 1, 1, -1, 0, 1, 1, 0, 0, -1, 1, 1, 0, -1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, -1, 0, 0, 0, 0, 1, 0, 1, 0, 1, -1, -1, -1, 1, -1, 0, -1, 0, 1, 0, 0, 1, 0, 0, -1, 1, 0, 1, 0, -1, -1, 0, 0, 1, 0, 1, -1, -1, 1, 1, 0, -1, -1, 1, 0, 1, 1, 1, 1, -1, -1, 0, -1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, -1, 1, 1, 1, 1, -1, -1, -1, 1, 0, -1, -1, 0, -1, 1, -1, -1, 1, -1, 0, 0, 0, 1, -1, -1, 1, 1, -1, -1, 0, 0, 1, -1, -1, 0, -1, 0, 1, 0, -1, 1, 1, -1, 1, -1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 0, 1, 1, -1, 1, 1, 1, 0, -1, 1, 1, -1, 0, 0, 1, -1, -1, 0, -1, 1, 0, 1, 0, 0, 0, 1, 1, -1, 0, 0, 1, -1, -1, 0, 0, 0, 1, -1, 1, 1, -1, 1, 0, 0, -1, 0, 0, 1, 0, -1, 1, 0, 0, 0, -1, -1, 1, -1, 1, 0, 0, 1, -1, 1, 1, 1, 0, 0, 0, 1, 1, -1, -1, 1, 1, 1, -1, 0, 1, -1, 1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, -1, 0, -1, -1, -1, 0, 1, -1, 1, -1, 1, -1, 0, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1, -1, -1, 0, 0, 0, 1, 0, 1, 1, 0, -1, -1, 0, 1, 0, -1, 1, 1, 0, 1, -1, 0, -1, 0, -1, 1, -1, -1, -1, 1, 0, -1, -1, -1, 0, 1, -1, 1, 0, 0, 0, 1, 1, -1, 0, -1, -1, -1, -1, 0, 1, 0, 0, -1, -1, 1, 0, -1, -1, 1, 0, -1, -1, 1, 0, 0, -1, 1, 1, 1, -1, 0, -1, 0, 1, 0, -1, -1, 1, 0, 0, 0, 1, -1, -1, 0, 0, -1, -1, -1, 0, -1, -1, 0, 1, 1, 1, 1, 1, 0, 1, -1, 1, 0, -1, -1, 1, -1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, -1, 1, 0, 0, -1, -1, 1, 1, 0, -1, -1, -1, 1, -1, 1, 0, 1, 1, 1, -1, 0, 1, 0, 0, 0, -1, 1, -1, 1, 1, 1, 1, -1, 1, 0, 0, 0, 1, -1, 1, 1, 1, 1, 0, 1, 1, 1, -1, -1, 0, 1, 1, 1, 0, 0, 1, 0, 1, -1, 0, 0, 1, 0, 1, -1, 0, -1, 1, -1, 1, 1, -1, 0, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 0, 1, 0, 1, -1, -1, 1, 1, -1, 0, 1, 1, 1, 1, 0, 1, 0, -1, -1, -1, -1, 1, -1, 0, 0, -1, 1, 0, 0, -1, 1, 0, -1, -1, 1, 1, 1, 0, 0, 1, 0, -1, 1, -1, 0, 1, 0, -1, 1, 1, 1, 0, 1, -1, -1, -1, 0, 0, 0, -1, 0, 1, -1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 0, -1, 0, -1, 0, -1, -1, -1, 0, 0, 1, 0, 0, -1, 1, 1, 0, -1, 1, 0, 1, 1, -1, 0, 1, -1, 1, -1, -1, -1, 1, -1, 0, -1, 0, 0, 0, -1, 0, 0, 1, 1, 1, -1, 1, 0, 0, -1, 1, 0, 1, 1, 0, 0, 1, -1, -1, -1, -1, 0, -1, 0, 0, 0, -1, 0, 0, -1, -1, 0, -1, 1, 1, 0, 1, -1, -1, 1, -1, 0, -1, 1, -1, 0, -1, 1, 0, -1, 0, 1, 0, -1, 1, 1, 0, 1, 1, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1, -1, -1, 1, 1, -1, 1, 0, 1, -1, -1, 0, 0, -1, 0, -1, 1, 0, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 0, 0, -1, -1, 1, 0, 1, 0, -1, 0, -1, 1, -1, -1, -1, 0, 0, 1, -1, 1, 1, 1, 0, 0, 0, -1, 0, 1, -1, -1, 0, 1, 1, -1, 1, 1, 1, -1, 1, 1, -1, 0, 1, 1, 0, -1, 0, -1, 0, -1, 0, -1, -1, -1, -1, -1, 1, 0, -1, 1, 1, 1, -1, 0, 0, -1, 1, 1, 0, 0, -1, 0, -1, 0, 0, 0, -1, -1, -1, 1, -1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, -1, 0, 1, 0, 1, 0, -1, 1, 0, -1, -1, 1, 1, 1, -1, 0, 1, -1, 1, -1, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 1, -1, 1, 1, 1, 0, 1, -1, 0, 1, 1, 0, 1, 1, -1, 0, -1, -1, 0, -1, 0, 0, -1, 0, 0, 1, -1, -1, -1, 0, -1, -1, 0, 0, -1, 1, -1, 1, -1, 0, 1, 0, 1, 0, 1, -1, 1, 0, 1, -1, 0, -1, -1, -1, 1, -1, 0, 0, 1, 1, -1, 1, -1, 1, -1, -1, 1, 1, 1, 0, 1, 1, 0, -1, 1, -1, 0, 0, -1, 0, 1, -1, -1, 0, 0, -1, -1, -1, 0, 0, -1, 1, -1, 1, 1, -1, 1, 1, 1, 0, -1, -1, 1, -1, -1, 0, 0, 1, 0, 0, -1, 1, 1, 0, 0, -1, -1, 1, -1, 1, -1, 1, -1, -1, 1, 0, 0, -1, 0, 0, -1, -1, 1, -1, 1, 1, -1, 1, -1, 1, -1, -1, 1, -1, 1, 1, 0, 1, -1, 0, -1, 0, 1, -1, 0, -1, -1, -1, 1, -1, 0, -1, 0, 1, 0, 1, -1, -1, 1, 1, 0, 1, 1, 1, -1, 0, 0, -1, 1, -1, -1, -1, 0, 1, 0, -1, -1, 1, 0, 1, 1, 0, 0, -1, 0, 0, 0, 0, 1, 1, -1, 0, -1, 0, 0, -1, 0, 1, 1, 1, 1, -1, -1, 1, 1, 0, -1, -1, 0, 1, 1, 0, 1, 0, -1, 0, -1, 0, 0, 1, 0, 0, 1, 1, -1, -1, 1, 0, -1, 0, -1, -1, 0, 0, 1, 0, -1, 1, -1, 1, -1, -1, -1, -1, 0, 0, 1, 1, 1, -1, -1, 0, 1, 0, -1, -1, -1, 1, -1, 0, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, 1, 1, -1, 0, 0, 0, 1, -1, 0, -1, -1, -1, 0, -1, 0, -1, -1, 0, 0, -1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, -1, 1, 0, -1, 1, -1, 1, 1, 0, 1, 1, -1, -1, 0, 0, 1, 0, -1, 1, 1, 0, 1, 0, 0, -1, 0, 0, 0, -1, -1, -1, -1, 1, 0, -1, 1, 0, 1, -1, -1, 1, -1, -1, 0, -1, 0, -1, 0, -1, -1, 0, -1, 0, 0, 1, -1, -1, -1, 0, 0, -1, 1, -1, 0, 0, -1, 1, 1, 1, -1, 0, 1, 1, 1, 1, 1, 0, 1, 0, -1, 1, 0, 0, 0, 0, 0, 1, -1, 0, 1, 0, -1, 1, 0, 0, -1, 1, 1, -1, -1, 1, -1, -1, -1, 0, -1, -1, 0, -1, 1, -1, -1, 0, 0, -1, 1, 0, 1, 0, 0, -1, -1, 1, -1, -1, 0, 0, 0, 1, -1, -1, 0, 0, -1, 0, -1, 0, 0, 0, -1, -1, -1, 0, -1, 0, -1, 1, -1, 0, 0, -1, 0, -1, -1, -1, 1, -1, 0, 0, 1, 0, 0, 1, 1, 1, -1, 0, 0, -1, -1, 1, -1, -1, -1, -1, 0, 1, 1, -1, -1, 0, 1, 1, 0, -1, 1, 1, -1, -1, -1, 0, 1, 0, 0, 1, 0, 1, -1, 1, 1, 0, -1, 0, 1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 0, 0, -1, 0, 1, -1, 0, 1, 0, 0, -1, -1, 0, 0, -1, 1, 1, 0, 1, 0, 0, -1, 0, 1, -1, -1, 1, -1, -1, 1, -1, 0, 0, -1, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, -1, 0, -1, -1, 0, 1, 1, 0, -1, 0, 1, -1, 0, 1, 1, 1, 1, 1, -1, 1, -1, -1, -1, 1, 1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 1, 0, -1, 1, 1, 1, 0, 1, -1, 0, -1, 0, 0, 1, 1, 0, -1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, -1, -1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, -1, 1, 1, 1, 0, 0, 1, 1, -1, -1, 0, -1, 0, -1, 0, 1, 1, -1, 0, 0, -1, -1, 1, 0, 0, 1, 0, -1, 0, -1, 1, 1, 1, -1, -1, -1, 1, 1, -1, 0, 1, 1, 0, -1, 1, 0, 1, 0, -1, -1, -1, -1, -1, 1, -1, 1, -1, 0, 1, 1, 0, 1, 1, 0, -1, 1, 0, 0, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, -1, 0, 0, 0, 1, 1, -1, -1, -1, 0, -1, -1, -1, -1, 0, -1, 0, -1, -1, 0, 0, 1, 0, -1, 0, 1, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, -1, -1, 0, 1, -1, 1, 1, 0, -1, -1, 1, -1, -1, -1, 0, 1, -1, -1, -1, 1, 1, 0, -1, 0, 0, -1, 1, 0, -1, 1, -1, 1, -1, 0, -1, 0, 1, 0, 1, -1, 0, -1, 0, 0, 1, 0, 0, -1, 1, -1, 0, -1, 0, 1, -1, -1, -1, 0, -1, 0, 1, 1, 1, -1, -1, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 1, 1, -1, 0, 0, -1, 0, 0, 0, -1, -1, 0, 0, 0, 1, -1, -1, 0, 0, -1, -1, 1, 0, 1, -1, -1, 1, 0, -1, 0, 1, -1, -1, -1, 1, 0, 1, 1, -1, 1, -1, -1, 0, 1, -1, -1, -1, 1, 1, -1, 1, -1, 0, 1, 1, 0, 1, 1, 1, -1, 0, 0, 0, 1, 1, 0, 0, -1, 0, 0, -1, -1, 0, -1, 0, 1, -1, 1, -1, 1, 0, 1, 0, 0, -1, -1, 1, -1, -1, -1, 1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 1, -1, -1, 1, 1, 0, -1, 1, 1, -1, 1, 1, 0, -1, 0, 0, 1, 1, 0, 1, -1, 1, 0, 1, 0, 0, -1, -1, 0, 1, 1, -1, 1, -1, -1, -1, -1, 0, -1, 0, 0, 0, 0, 0, 1, 0, 1, -1, -1, -1, 0, 0, 0, 0, 1, 0, -1, 0, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 0, 1, 1, -1, 0, 1, 0, 0, 0, 1, -1, 0, -1, 0, 0, 0, 1, -1, 0, 1, 1, 0, -1, -1, -1, 0, 1, -1, 0, 0, -1, -1, 1, -1, 1, 0, -1, 1, 0, 1, 1, 0, 0, -1, 1, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 0, -1, -1, 0, -1, -1, -1, 0, -1, 0, -1, 1, 1, -1, -1, -1, 0, -1, 1, 1, 0, -1, -1, 1, 0, 1, -1, 0, -1, 1, 0, 1, 0, -1, 1, 1, -1, -1, 1, -1, 1, 1, 0, 0, 1, 1, 0, 1, -1, 1, 0, -1, 0, 1, 0, -1, 1, -1, 1, 1, 1, 0, -1, 1, -1, -1, 1, 1, 1, -1, 0, 0, 0, 1, 1, 1, 1, 0, 0, -1, 1, -1, 1, -1, 0, 0, 0, -1, 0, 0, -1, 0, 0, 0, -1, 1, -1, -1, 0, 1, 0, -1, -1, -1, 0, -1, 0, -1, 1, -1, -1, 1, 0, -1, 0, -1, -1, -1, 1, 1, -1, 1, 1, 0, 1, -1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, -1, -1, -1, -1, 0, 0, 1, 0, 0, -1, -1, -1, 0, -1, 1, 1, 0, 0, 1, 0, -1, 0, -1, 1, 1, -1, 1, 0, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 0, 1, -1, -1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, -1, 0, -1, 0, -1, 1, 0, -1, 1, -1, 1, 1, -1, 0, 0, 0, 0, -1, 0, -1, -1, -1, -1, 0, 0, 0, -1, -1, 0, 1, 1, 0, -1, 0, 1, 1, 0, -1, 0, 1, 0, 1, 0, -1, -1, -1, 0, 0, 1, 1, 1, 0, -1, 0, 1, 1, 1, 1, -1, 1, -1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, -1, -1, 1, -1, 0, -1, -1, -1, 1, -1, -1, 1, -1, 1, 0, 1, -1, 1, -1, -1, 1, -1, -1, 1, -1, 0, 1, -1, -1, -1, -1, 1, -1, -1, 0, 0, 1, 1, 1, 0, -1, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, 1, 0, -1, -1, 1, -1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, -1, -1, 1, -1, -1, 0, 0, -1, -1, 1, 0, -1, 0, 0, 0, -1, 1, -1, 0, 0, 1, 1, 0, -1, 0, 0, 1, -1, 1, -1, -1, 1, -1, 1, 0, 0, 1, 0, -1, 1, -1, 0, 1, -1, 0, 0, 1, 1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1, 1, 0, 1, 1, 0, 0, 0, 1, -1, 1, 1, 0, -1, 0, 0, 1, 0, 1, 0, -1, 0, -1, -1, 0, 0, 0, -1, 0, -1, -1, 1, 0, -1, 0, 1, 1, -1, 1, 0, 1, 0, -1, 1, 0, -1, -1, -1, 0, -1, 0, 1, 0, 1, 1, 1, 1, -1, -1, 0, 0, -1, 0, 1, 0, -1, -1, 0, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, 0, -1, -1, 1, 0, 0, 1, 1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, 1, -1, -1, 0, 1, 0, -1, 0, 0, 1, -1, -1, 1, 0, 1, 0, 0, 1, 1, 0, 1, -1, -1, 0, 0, 0, -1, 0, 1, -1, -1, 0, 1, 0, -1, 0, 1, 0, -1, 1, 0, 0, 1, -1, 0, 0, -1, 0, -1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, -1, 1, 0, 0, 0, 1, -1, 0, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 0, -1, 0, -1, 0, -1, 1, 0, 1, 0, 0, 1, 1, -1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, -1, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, 1, 0, 1, -1, 1, 0, 0, 0, 1, 1, 1, 1, 1, -1, 0, 1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 0, 0, -1, 1, -1, -1, 1, 0, 0, 1, 1, -1, -1, 1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 1, -1, 1, 1, -1, 1, -1, 0, -1, -1, 1, 1, 0, -1, -1, 1, 0, 1, -1, 0, 0, 1, 1, 0, 0, 0, 0, 1, -1, -1, 1, 0, -1, 0, -1, 1, -1, -1, 0, 0, -1, 1, 1, -1, -1, 1, 0, 1, -1, 0, 1, 1, 0, 1, -1, 0, 0, 1, -1, 1, -1, 1, 0, 1, 1, 1, -1, 0, -1, 1, -1, 1, -1, 1, 1, 0, -1, 0, 1, 0, 0, -1, 1, -1, -1, -1, 0, 1, 1, 1, 1, 0, -1, 1, 1, 1, 0, 0, 1, -1, 1, 0, -1, 1, 1, 0, 0, 1, 1, -1, -1, 1, 1, 0, 0, -1, 1, 0, -1, 1, 0, -1, -1, -1, -1, 0, 1, -1, 1, -1, 1, 1, 0, -1, 0, 1, -1, -1, -1, 1, -1, 1, 1, 0, -1, 0, -1, 1, 1, 1, 1, 0, -1, 1, 0, 0, -1, -1, 1, -1, 1, 1, 1, 0, -1, 1, 0, -1, 0, 0, 1, -1, 1, -1, 1, 1, 0, -1, -1, 1, 0, -1, -1, 0, 0, 1, -1, -1, 0, 0, 1, -1, 1, -1, -1, 1, 0, 1, 0, 1, -1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, -1, -1, -1, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, 0, 1, 1, 0, 0, -1, 1, 1, 1, 0, 0, -1, 0, 0, -1, 0, -1, 0, 1, -1, 1, -1, -1, 1, 0, 0, 0, 0, 1, 1, -1, 0, -1, 0, 0, -1, 0, -1, 1, -1, 0, 1, 0, 0, -1, 1, -1, -1, 1, 1, -1, 0, -1, 0, -1, -1, -1, -1, 1, -1, 1, -1, -1, 0, 1, 1, 1, 1, 0, -1, 0, -1, -1, 0, 1, -1, -1, 1, -1, -1, 1, -1, -1, 0, 1, 1, -1, 0, 1, 0, 1, 0, -1, -1, 1, 0, 1, 1, -1, 1, -1, 0, 0, 1, -1, -1, -1, 1, -1, 0, 1, 0, -1, 0, 1, 1, 0, 1, -1, -1, -1, 1, 0, 0, 0, 0, 0, 1, -1, 0, -1, 0, 0, 0, -1, -1, -1, 1, 1, -1, 1, 0, -1, -1, 1, -1, -1, 1, 0, -1, 1, 0, 0, -1, 0, 1, 1, -1, 0, -1, -1, 0, -1, -1, 1, -1, 0, 0, 1, 0, -1, 1, 0, -1, -1, -1, 1, 1, 0, 0, 0, -1, 0, -1, -1, -1, 1, 1, -1, 1, -1, 0, 0, 1, 0, 0, 0, 1, 1, 0, -1, 1, -1, -1, 0, -1, 0, -1, -1, 1, 1, 1, 1, 0, 1, -1, -1, 0, -1, -1, 1, 1, 1, 1, 1, 1, 0, -1, 1, 1, -1, 0, -1, 0, -1, 0, 0, -1, 1, -1, -1, 1, -1, -1, -1, 0, 1, 1, 0, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 0, -1, -1, 1, 1, -1, 0, 0, -1, 0, 1, 1, 0, 0, 0, -1, 1, 1, 0, 0, -1, 1, -1, 1, 0, -1, 1, 1, 0, 0, -1, 1, 0, -1, -1, -1, 1, 1, 1, 1, 0, -1, 0, 0, 1, 1, -1, -1, -1, 1, 1, -1, 0, 0, 1, 1, 1, 1, 0, -1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1, 1, 1, -1, 1, -1, -1, -1, 0, -1, 0, 1, -1, 0, 0, 0, -1, 0, 1, 1, 1, -1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, -1, 1, -1, 0, 0, 1, -1, -1, 1, -1, 0, 1, 1, 0, -1, 1, 0, 0, 0, -1, 0, 1, 1, -1, 0, 1, 0, 0, 0, 1, -1, 1, 0, 1, -1, 0, 1, 1, 0, 1, -1, -1, 1, 1, 1, 0, 0, 1, 1, -1, 0, -1, 1, 0, -1, 1, -1, 0, -1, 0, 1, 1, -1, 1, 1, 0, 1, -1, 0, 0, 0, 1, 1, 0, -1, 0, 0, 0, -1, -1, 0, -1, 0, 0, 0, 1, 1, -1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, -1, -1, -1, 0, 1, 0, 1, 0, -1, -1, 1, 0, 0, 1, 0, -1, 0, 1, 0, 1, -1, 0, 0, 0, 1, -1, -1, -1, 1, -1, 1, 0, 0, 0, 0, -1, 1, 1, 1, -1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, 0, 1, -1, 0, -1, 0, -1, 0, -1, 1, -1, 0, 0, 1, -1, 1, 0, -1, 1, -1, -1, 0, 0, 0, 0, 1, 1, 0, -1, 1, 1, -1, -1, -1, 0, 1, 1, 0, 0, 0, 1, -1, 0, 0, 1, 1, 0, -1, 0, -1, -1, 1, -1, 0, 0, -1, -1, 1, 0, 0, -1, 0, 0, 1, -1, 1, 1, 1, -1, 1, 0, 0, 1, -1, 0, 0, 0, 1, -1, 1, -1, 0, -1, 0, -1, 0, -1, -1, 0, 0, 1, 0, -1, 0, 0, -1, 0, -1, 1, -1, -1, 0, -1, 0, 1, 0, 0, 0, -1, -1, 1, 1, 0, 1, 0, -1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, -1, -1, -1, -1, 1, 1, 0, -1, -1, 0, -1, 1, -1, 0, -1, -1, -1, 0, -1, -1, 0, 1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, 0, -1, 1, 0, 0, 0, 0, 1, 1, -1, 1, 0, -1, 1, 0, -1, -1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, -1, -1, 0, 0, 0, 0, 1, 0, 0, -1, 1, -1, 1, 1, 1, 0, 0, 1, 1, 1, 1, -1, 0, 0, 1, -1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, -1, 1, 0, -1, 0, 0, -1, -1, 0, -1, -1, 1, -1, 0, 0, 1, -1, -1, 0, -1, 1, 0, 0, -1, -1, 0, -1, 0, -1, 1, -1, -1, -1, 0, 1, -1, 1, 1, 1, -1, 1, 0, 1, 0, -1, 1, 0, 1, -1, -1, -1, 1, -1, 0, 0, -1, 0, 0, -1, -1, 0, -1, -1, 1, 1, 0, -1, 1, -1, 0, 1, -1, 0, -1, 0, 1, 0, 1, 1, -1, -1, 1, 1, 0, 0, -1, 1, 1, 0, 0, 0, 1, 1, 0, -1, 1, 1, 1, 1, 1, 0, -1, 1, 1, 0, 0, 0, -1, 1, 1, -1, -1, 1, 1, -1, 0, 0, -1, 1, 1, -1, 0, 0, 0, 1, 1, -1, 1, -1, -1, -1, 1, -1, 0, 0, 0, 0, -1, -1, 0, -1, 1, -1, -1, 0, 0, 0, 1, 1, -1, -1, 1, -1, 1, -1, -1, -1, 0, -1, -1, 0, 0, 1, 0, 1, -1, -1, -1, 1, 0, 1, 1, 1, 1, 0, -1, 0, 1, 1, 0, 1, -1, 0, 1, -1, 0, -1, -1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, -1, 0, 0, 1, 1, 1, -1, 0, 1, 0, -1, 0, -1, 0, -1, -1, 1, 1, 0, 1, -1, 1, 0, 1, 1, 1, 0, -1, 0, -1, 0, 0, 1, -1, 1, 1, 1, 0, 0, 1, 0, 1, -1, -1, 0, 1, 1, -1, 0, -1, 1, 1, 0, 1, 0, 0, -1, -1, -1, 0, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 1, 1, 0, -1, -1, 1, 1, -1, 1, -1, -1, 0, 1, 0, -1, -1, 1, 1, 0, -1, 0, 1, 0, -1, 1, 0, 0, 0, 1, -1, -1, 1, -1, -1, -1, 1, 0, 0, -1, 0, 0, 1, -1, -1, 1, 1, 1, -1, -1, 1, 0, -1, 1, 0, 0, -1, 0, 1, 1, 1, 0, 1, -1, -1, -1, -1, 0, -1, -1, 1, -1, 0, 1, 0, -1, 0, 0, 1, -1, 1, 0, -1, 1, 1, 1, 0, -1, 0, 0, 1, 0, 1, 1, -1, 1, 1, 0, 1, 0, 0, 0, -1, 1, 0, -1, -1, -1, -1, 0, -1, 0, -1, -1, -1, 1, 1, -1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, -1, 1, 0, -1, 0, 1, 0, -1, 0, 1, 1, 1, -1, -1, -1, 0, 1, 1, -1, -1, 1, -1, -1, 1, 0, -1, 0, -1, 1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 0, -1, -1, 1, 1, 1, 0, 1, -1, 0, 0, 1, -1, -1, -1, -1, 0, 1, -1, 0, -1, -1, 0, 1, -1, -1, -1, 1, 1, -1, 0, -1, 0, 0, 1, 0, 0, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, 1, -1, -1, 1, 1, 0, -1, 1, -1, -1, 1, 0, 0, 1, 1, 0, -1, 0, 0, 1, 0, 1, -1, 1, 1, 1, 1, -1, 0, 1, -1, -1, 1, -1, 0, 1, 1, 1, 1, 1, 1, -1, 1, 1, 0, 1, 0, -1, 1, -1, -1, 1, -1, -1, -1, 1, 1, 0, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, -1, 1, 1, 1, 1, -1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 1, -1, -1, 1, 1, 0, 0, 1, 0, -1, -1, -1, 0, 0, 1, 0, 0, 1, 0, 0, -1, -1, -1, 1, 1, 0, 0, 0, 0, -1, 1, 0, -1, 0, -1, 1, -1, 1, 0, 0, 0, 1, 0, 1, 0, 0, -1, -1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, -1, -1, -1, 0, 1, 1, 0, 0, 1, -1, 0, 0, 0, -1, 0, 0, 0, -1, 1, -1, 1, 0, -1, -1, 0, 1, -1, -1, -1, 0, 0, -1, -1, -1, 0, -1, 0, 1, 0, 0, -1, 1, -1, 1, -1, 0, 0, -1, -1, 1, 0, 0, 0, -1, -1, 0, -1, 1, -1, 1, 0, 1, 0, 0, 0, 1, -1, 1, 1, -1, 0, 0, 1, 1, 0]);
        });
    });

    describe("address", () => {
        it("can fail with invalid digests", async () => {
            chai.expect(() => ISS.address(undefined)).to.throw("The digests");
        });

        it("can fail with invalid digests length", async () => {
            chai.expect(() => ISS.address(new Int8Array(1))).to.throw("Invalid digests length");
        });

        it("can be called", () => {
            const res = ISS.address(new Int8Array(243));
            // tslint:disable-next-line:max-line-length
            chai.expect(Array.from(res)).to.be.deep.equal([0, 0, 0, -1, -1, -1, 1, -1, 1, -1, 1, 0, 1, -1, 0, 0, 0, 1, 1, -1, 1, 1, 0, 1, -1, 1, -1, 0, 1, -1, -1, 1, -1, 1, -1, 0, 1, -1, -1, 1, 0, 0, 0, 1, 0, 0, -1, -1, -1, 0, 1, 1, -1, 0, -1, -1, 0, 0, 1, -1, 1, -1, 1, 0, 1, 1, -1, -1, 0, 0, -1, -1, 0, 0, 0, 0, -1, -1, 1, 0, 0, 1, 0, -1, -1, -1, 0, -1, 1, 0, -1, -1, -1, -1, -1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, -1, 0, 0, 0, -1, -1, -1, 0, 0, 0, -1, 1, 0, -1, -1, 0, 0, 1, -1, -1, 0, -1, -1, 1, 0, -1, 0, 0, -1, 1, -1, 0, 1, 0, 1, -1, 1, -1, -1, 0, 1, 1, 1, 0, 1, 0, 0, -1, -1, -1, 1, 0, -1, 0, 1, 0, 1, 1, -1, 1, -1, 1, 0, 0, 0, -1, 1, 1, 0, 1, -1, 0, 1, 1, 1, -1, 0, -1, -1, 1, 0, 0, -1, 0, 0, -1, -1, 1, 0, 1, -1, -1, -1, 1, 0, 1, -1, -1, 0, 1, 1, -1, 0, 0, -1, 0, 1, 1, 0, 0, 0, 0, 0, -1, 1, 0, -1, -1, 1, 0, -1, -1, -1, -1, -1, -1, 1, 1, -1, 0, 0, -1, -1, 0]);
        });
    });

    describe("digest", () => {
        it("can fail with invalid normalizedBundleFragment", async () => {
            chai.expect(() => ISS.digest(undefined, undefined)).to.throw("The normalizedBundleFragment");
        });

        it("can fail with invalid signatureMessageFragment", async () => {
            chai.expect(() => ISS.digest(new Int8Array(4 * 27), undefined)).to.throw("The signatureMessageFragment");
        });

        it("can be called", () => {
            const normalizedBundle = new Int8Array(4 * 27);
            const signatureMessageFragment = new Int8Array(6561);

            const res = ISS.digest(normalizedBundle, signatureMessageFragment);
            // tslint:disable-next-line:max-line-length
            chai.expect(Array.from(res)).to.be.deep.equal([1, -1, 1, -1, 1, 0, 0, 0, -1, -1, -1, 1, 0, -1, 1, 0, 0, 1, 1, 1, 0, -1, -1, 1, -1, -1, -1, 0, -1, 0, 1, 0, -1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, -1, 0, 0, 0, -1, -1, 0, -1, 1, -1, -1, 0, 0, 1, 1, 1, 0, 0, -1, 1, 0, -1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 1, -1, 0, 0, 0, 1, -1, 0, -1, 1, 0, -1, 0, 1, 1, -1, 0, 1, 1, 0, -1, -1, 1, 1, -1, 1, -1, -1, -1, 0, -1, 0, -1, -1, 1, -1, 1, 1, -1, 0, 1, -1, 0, 1, -1, 0, 1, 1, 0, 1, 0, 1, -1, -1, -1, -1, 1, 0, 0, 1, 1, 0, 0, 1, 0, -1, 0, 0, 1, 1, -1, 0, -1, -1, -1, 0, 1, 0, -1, 1, -1, -1, -1, 0, 1, -1, 1, 1, -1, 1, -1, -1, -1, 1, 1, 1, -1, 0, 0, 1, 0, 1, 0, -1, 1, -1, 1, 0, 0, 0, 0, -1, 0, -1, -1, 0, 1, 0, 1, 0, 0, -1, -1, 1, 0, -1, 0, 1, -1, 1, 0, 0, -1, -1, -1, 1, 1, 0, 0, 0, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 1, 0, -1, -1, -1, -1, 1, 0, 0]);
        });
    });

    describe("digests", () => {
        it("can fail with invalid subseed", async () => {
            chai.expect(() => ISS.digests(undefined)).to.throw("The subseed");
        });

        it("can fail with invalid subseed length", async () => {
            chai.expect(() => ISS.digests(new Int8Array(1))).to.throw("subseed length");
        });

        it("can be called", () => {
            const subseed = new Int8Array(243 * 27);

            const res = ISS.digests(subseed);
            // tslint:disable-next-line:max-line-length
            chai.expect(Array.from(res).slice(0, 243)).to.be.deep.equal([-1, 0, -1, 0, 0, 0, 1, 1, -1, -1, 0, -1, -1, 0, -1, 0, -1, -1, 0, 1, -1, 1, 0, -1, -1, 0, 0, 0, -1, -1, -1, 0, -1, 1, -1, 0, -1, 0, 1, 0, 0, -1, 1, 1, 0, 0, 0, 1, 1, 1, -1, 0, 1, 0, 1, 0, 0, 1, -1, 1, -1, 1, 1, 1, 0, 0, -1, 1, -1, -1, 0, 1, 0, 0, 1, 1, 0, 1, -1, 1, 0, 1, 1, 0, 0, 1, 1, 0, -1, -1, 0, 0, 1, 0, -1, 1, -1, 1, -1, 0, 1, 0, 0, -1, -1, 1, 1, 1, 0, -1, 1, -1, 1, -1, -1, 0, -1, -1, 1, -1, 0, -1, -1, -1, 1, 1, 0, 0, -1, -1, 1, 0, 1, -1, 1, -1, 1, -1, 0, -1, -1, -1, -1, 1, 0, 1, 1, -1, 1, -1, 0, 1, -1, -1, 0, 1, -1, -1, -1, -1, 1, 1, -1, 0, 0, 1, -1, -1, 1, 0, 1, 1, 1, 0, -1, -1, 0, -1, 1, -1, 0, 0, -1, 1, 1, -1, 1, 1, -1, -1, 1, 0, 0, -1, 1, 1, 1, 1, -1, -1, 0, 1, 1, 0, 0, 0, 1, -1, 1, 0, 0, -1, 1, 0, 0, 1, 0, 1, 0, -1, -1, 0, 1, -1, -1, 1, 1, -1, 0, 1, 0, -1, 1, 0, -1, 0, -1, 1, 0, 1, 0, 1, 0]);
        });
    });

    describe("normalizedBundle", () => {
        it("can fail with invalid bundleHash", async () => {
            chai.expect(() => ISS.normalizedBundle(undefined)).to.throw("The bundleHash");
        });

        it("can be called with sum < 0", () => {
            const hash = Hash.fromTrytes(Trytes.fromString("N".repeat(81)));

            const res = ISS.normalizedBundle(hash);
            // tslint:disable-next-line:max-line-length
            chai.expect(Array.from(res)).to.be.deep.equal([13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 0, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 0, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 0, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13]);
        });

        it("can be called with sum > 0", () => {
            const hash = Hash.fromTrytes(Trytes.fromString("M".repeat(81)));

            const res = ISS.normalizedBundle(hash);
            // tslint:disable-next-line:max-line-length
            chai.expect(Array.from(res)).to.be.deep.equal([-13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, 0, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, 0, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, -13, 0, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13]);
        });
    });

    describe("validateSignatures", () => {
        it("can fail with invalid expectedAddress", async () => {
            chai.expect(() => ISS.validateSignatures(undefined, undefined, undefined)).to.throw("The expectedAddress");
        });

        it("can fail with invalid signatureMessageFragments", async () => {
            const address = Address.fromTrytes(Trytes.fromString("A".repeat(81)));
            chai.expect(() => ISS.validateSignatures(address, undefined, undefined)).to.throw("The signatureMessageFragments");
        });

        it("can fail with invalid bundleHash", async () => {
            const address = Address.fromTrytes(Trytes.fromString("A".repeat(81)));
            const signatureMessageFragments = [
                SignatureMessageFragment.EMPTY
            ];
            chai.expect(() => ISS.validateSignatures(address, signatureMessageFragments, undefined)).to.throw("The bundleHash");
        });

        it("can be called and not match", () => {
            const address = Address.fromTrytes(Trytes.fromString("A".repeat(81)));
            const signatureMessageFragments = [
                SignatureMessageFragment.EMPTY
            ];
            const hash = Hash.fromTrytes(Trytes.fromString("H".repeat(81)));

            const res = ISS.validateSignatures(address, signatureMessageFragments, hash);
            chai.expect(res).to.be.equal(false);
        });

        it("can be called and match", () => {
            const address = Address.fromTrytes(Trytes.fromString("9FXRPIAOIPSQTNQHSUFFJHFDR9NPEAORTJEJFQTU9ALMGSWHRUVDFXUUSDOPUHQ9QGYUMVPSLDBKVSTUX"));
            const signatureMessageFragments = [
                SignatureMessageFragment.EMPTY
            ];
            const hash = Hash.fromTrytes(Trytes.fromString("H".repeat(81)));

            const res = ISS.validateSignatures(address, signatureMessageFragments, hash);
            chai.expect(res).to.be.equal(true);
        });
    });
});