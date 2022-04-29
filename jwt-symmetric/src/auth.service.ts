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
// import { importPKCS8, jwtVerify, JWTVerifyResult } from "jose";
// import config from "config";
// export async function verify(
//   jwt: string | Uint8Array
// ): Promise<JWTVerifyResult> {
//   const key: string = config.get("SECRET_KEY");
//   console.log(key);

//   const ecPrivateKey = await importPKCS8(key, "HS256");
//   return jwtVerify(jwt, ecPrivateKey, {
//     subject: "my_subject",
//   });
// }
