import jwt, { Algorithm } from "jsonwebtoken";
import config from "config";

const key: string = config.get("SECRET_KEY");
const sub: string = config.get("SUB_PAYLOAD");
const alg: Algorithm = config.get("ALG");

export async function verify(token: string): Promise<any> {
  return jwt.verify(token, key, {
    algorithms: [alg],
    subject: sub,
  });
}
