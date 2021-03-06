/**
 * Tests for SpongeFactory.
 */
import * as chai from "chai";
import { SpongeFactory } from "../../src/factories/spongeFactory";
import { ISponge } from "../../src/interfaces/ISponge";

describe("SpongeFactory", () => {
    it("can be created", () => {
        const obj = SpongeFactory.instance();
        chai.should().exist(obj);
    });

    it("can register a type", () => {
        const obj = SpongeFactory.instance();
        class TestSponge implements ISponge {
            public getConstant(name: string): number {
                throw new Error("Method not implemented.");
            }
            public getState(): Int8Array {
                throw new Error("Method not implemented.");
            }
            public initialize(state?: Int8Array): void {
                throw new Error("Method not implemented.");
            }
            public reset(): void {
                throw new Error("Method not implemented.");
            }
            public absorb(trits: Int8Array, offset: number, length: number): void {
                throw new Error("Method not implemented.");
            }
            public squeeze(trits: Int8Array, offset: number, length: number): void {
                throw new Error("Method not implemented.");
            }
        }
        obj.register("test", () => new TestSponge());
        chai.expect(obj.create("test") instanceof TestSponge).to.be.equal(true);
    });

    it("can create default curl instance", () => {
        const obj = SpongeFactory.instance().create("curl");
        chai.should().exist(obj);
    });

    it("can create default kerl instance", () => {
        const obj = SpongeFactory.instance().create("kerl");
        chai.should().exist(obj);
    });
});
