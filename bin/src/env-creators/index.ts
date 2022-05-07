import fs from "fs";
import path from "path";
import {
  IAsymmetricJWTAnswers,
  IRedisAnswers,
  IRemoteApiAnswers,
  ISymmetricJWTAnswers,
  Template,
} from "../types";
const PORT = 8081;
export function createFile(pth: string, content: string) {
  fs.writeFile(pth, content, (err) => {
    console.log(err);
  });
}
function pathCreator(templateName: string) {
  return path.join(__dirname, `../templates/${templateName}`, ".env");
}
const publicKeyPath = path.join(
  __dirname,
  `../templates/${Template.JWT_ASYMMETRIC}/`,
  "public.pem"
);
export function createJwtAsymmetricEnvFile({
  alg,
  headerKey,
  subPayload,
  publicKey,
}: IAsymmetricJWTAnswers) {
  createFile(publicKeyPath, publicKey);
  createFile(
    pathCreator(Template.JWT_ASYMMETRIC),
    `SUB_PAYLOAD=${subPayload}\nALG=${alg}\nHEADER_KEY=${headerKey}PORT=${PORT}`
  );
}
export function createJwtSymmetricEnvFile({
  secretKey,
  alg,
  headerKey,
  subPayload,
}: ISymmetricJWTAnswers) {
  createFile(
    pathCreator(Template.JWT_SYMMETRIC),
    `JWT_SECRET=${secretKey}\nSUB_PAYLOAD=${subPayload}\nALG=${alg}\nHEADER_KEY=${headerKey}\nPORT=${PORT}`
  );
}
export function createRemoteApiEnvFile({
  authMethod,
  credentialContainer,
  headerName,
  httpMethod,
  jwtPrefix,
  jwyKey,
  passwordHashAlg,
  passwordKey,
  url,
  usernameKey,
}: IRemoteApiAnswers) {
  createFile(
    pathCreator(Template.JWT_SYMMETRIC),
    `HTTP_METHOD=${httpMethod}\nURL=${url}\nAUTH_METHOD=${authMethod}\nCREDENTIAL_CONTAINER=${credentialContainer}\nUSER_NAME_KEY=${usernameKey}\nPASSWORD_KEY=${passwordKey}\nPASSWORD_HASH_ALG=${passwordHashAlg}\nJWT_KEY=${jwyKey}\nHEADER_NAME=${headerName}\nJWT_PREFIX=${jwtPrefix}\nPORT=${PORT}`
  );
}
export function createRedisEnvFile({
  appendData,
  host,
  instanceNumber,
  password,
  port,
  prefixKey,
  user,
}: IRedisAnswers) {
  createFile(
    pathCreator(Template.JWT_SYMMETRIC),
    `USER=${user}\nPASSWORD=${password}\nPORT=${port}\nPREFIX_KEY=${prefixKey}\nHOST=${host}\nINSTANCE_NUMBER=${instanceNumber}\nAPPEND_DATA=${appendData}\nPORT=${PORT}`
  );
}
