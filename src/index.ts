import { verify, createPublicKey, KeyObject } from "node:crypto";

export function verifySignature({
  payload,
  signature,
  publicKey,
}: {
  payload: Buffer;
  signature: string; // base64 encoded
  publicKey: KeyObject | string; // base64 encoded
}) {
  const key =
    publicKey instanceof KeyObject
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
