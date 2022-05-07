import jwt, { Algorithm } from "jsonwebtoken";
import fs from "fs";
import path from "path";
import config from "config";

const subPayload: string = config.get("SUB_PAYLOAD");
const alg: Algorithm = config.get("ALG");

export async function verify(token: string) {
  const cert = fs.readFileSync(path.resolve(__dirname, "public.pem"));
  return jwt.verify(token, cert, {
    algorithms: [alg],
    subject: subPayload,
  });
}
