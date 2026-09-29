import { verify, createPublicKey, KeyObject } from "node:crypto";
export function verifySignature({ payload, signature, publicKey, }) {
    const key = publicKey instanceof KeyObject
        ? publicKey
        : createPublicKey({
            key: Buffer.concat([
                Buffer.from("302a300506032b6570032100", "hex"),
                Buffer.from(publicKey, "base64"),
            ]),
            format: "der",
            type: "spki",
        });
    const isValid = verify(null, payload, key, Buffer.from(signature, "base64"));
    return isValid;
}
