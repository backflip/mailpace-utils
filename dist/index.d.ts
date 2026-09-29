import { KeyObject } from "node:crypto";
export declare function verifySignature({ payload, signature, publicKey, }: {
    payload: Buffer;
    signature: string;
    publicKey: KeyObject | string;
}): boolean;
