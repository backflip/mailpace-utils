import test from "node:test";
import assert from "node:assert";
import { generateKeyPairSync, sign } from "node:crypto";
import { verifySignature } from "../index.ts";

test("detects correct signature", async (t) => {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  const payload = {
    event: "email.queued",
    payload: {
      status: "queued",
    },
  };

  const signature = sign(
    null,
    Buffer.from(JSON.stringify(payload)),
    privateKey
  );

  const isValid = verifySignature({
    payload: Buffer.from(JSON.stringify(payload)),
    signature,
    publicKey,
  });

  assert.strictEqual(isValid, true);
});

test("detects incorrect signature", async (t) => {
  const { publicKey } = generateKeyPairSync("ed25519");
  const payload = {
    event: "email.queued",
    payload: {
      status: "queued",
    },
  };

  const isInvalid = verifySignature({
    payload: Buffer.from(JSON.stringify(payload)),
    signature: Buffer.from("invalid"),
    publicKey,
  });

  assert.strictEqual(isInvalid, false);
});
