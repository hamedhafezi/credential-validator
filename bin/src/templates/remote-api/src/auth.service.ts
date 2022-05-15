import axios from "axios";
import { createHash, BinaryToTextEncoding } from "crypto";
import config from "config";
import { InvalidENV } from "./error/exceptions";

const HTTP_METHOD: "get" | "post" = config.get("HTTP_METHOD");
const AUTH_METHOD: "jwt" | "Basic auth" = config.get("AUTH_METHOD");
const JWT_PREFIX: string = config.get("JWT_PREFIX");
const URL: string = config.get("URL");
const JWT_KEY: string = config.get("JWT_KEY");
const USER_NAME_KEY: string = config.get("USER_NAME_KEY");
const PASSWORD_KEY: string = config.get("PASSWORD_KEY");
const PASSWORD_HASH_ALG: string = config.get("PASSWORD_HASH_ALG");
const CREDENTIAL_CONTAINER: "body" | "header" = config.get(
  "CREDENTIAL_CONTAINER"
);
const HEADER_NAME: string = config.get("HEADER_NAME");
if (HTTP_METHOD === "get" && CREDENTIAL_CONTAINER === "body") {
  throw new InvalidENV(
    "Enviroment variables error: Cannot send data through get method"
  );
}
export async function verify(
  username: string,
  password: string,
  token?: string
) {
  let data: any;
  let headers: any;
  let auth: any;
  let pass = password;

  if (PASSWORD_HASH_ALG !== "Plain") {
    pass = hash(password, PASSWORD_HASH_ALG);
  }
  if (AUTH_METHOD === "Basic auth") {
    if (CREDENTIAL_CONTAINER === "body") {
      data = {
        [USER_NAME_KEY]: username,
        [PASSWORD_KEY]: pass,
      };
    } else if (CREDENTIAL_CONTAINER === "header") {
      auth = {
        username,
        password: pass,
      };
    } else {
      throw new InvalidENV("CREDENTIAL_CONTAINER");
    }
  } else if (AUTH_METHOD === "jwt") {
    if (CREDENTIAL_CONTAINER === "body") {
      data = {
        [JWT_KEY]: `${JWT_PREFIX} ${token}`,
      };
    } else if (CREDENTIAL_CONTAINER === "header") {
      headers = {
        [HEADER_NAME]: `${JWT_PREFIX} ${token}`,
      };
    } else {
      throw new InvalidENV("CREDENTIAL_CONTAINER");
    }
  } else {
    throw new InvalidENV("Auth method must be 'basic-auth' or 'jwt'");
  }

  const response = axios({
    url: URL,
    method: HTTP_METHOD,
    data,
    headers,
    auth,
  });
  return response;
}

function hash(
  str: string,
  alg: string,
  encoding: BinaryToTextEncoding = "hex"
) {
  const hash = createHash(alg);
  return hash.update(str).digest(encoding);
}
