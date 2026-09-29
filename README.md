# MailPace Node.js Utils

Utility function for [MailPace](https://mailpace.com), a transactional email service.

> [!NOTE]  
> This package contains untranspiled TypeScript only. Node.js >=22.18.0 is able to [consume this just fine](https://nodejs.org/api/typescript.html#type-stripping).

## `verifySignature`

[Webhook requests](https://docs.mailpace.com/guide/webhooks) for events or incoming emails are signed using Ed25519. This is [not exactly straight-forward](https://keygen.sh/blog/how-to-use-hexadecimal-ed25519-keys-in-node/) to implement in Node.js.

```ts
import { verifySignature } from "mailpace-utils";

const publicKeyBase64 = process.env.MAILPACE_PUBLIC_KEY; // Copy from MailPace dashboard

const message = <Buffer>; // raw request body
const signature = ""; // `x-mailpace-signature` request header

const isValid = verifySignature({ message, signature, publicKey });

if (!isValid) {
  throw new Error("Invalid signature");
}
```
