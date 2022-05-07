export enum Template {
  JWT_ASYMMETRIC = "jwt-asymmetric",
  JWT_SYMMETRIC = "jwt-symmetric",
  RDIS = "redis",
  REMOTE_API = "remote-api",
}
export interface IRemoteApiAnswers {
  httpMethod: "post" | "get";
  url: string;
  authMethod: "jwt" | "basic-auth";
  credentialContainer: "header" | "body";
  usernameKey: string;
  passwordKey: string;
  passwordHashAlg: string;
  jwyKey: string;
  jwtPrefix: string;
  headerName: string;
}
export interface ISymmetricJWTAnswers {
  secretKey: string;
  subPayload: string;
  alg: string;
  headerKey: string;
}
export interface IAsymmetricJWTAnswers {
  subPayload: string;
  alg: string;
  headerKey: string;
  publicKey: string;
}
export interface IRedisAnswers {
  host: string;
  port: number;
  user: string;
  password: string;
  instanceNumber: number;
  prefixKey: string;
  appendData: boolean;
}
export interface IValidator {
  AsymmetricJWT: {
    questions: any;
    todo: any;
  };
  SymmetricJWT: {
    questions: any;
    todo: any;
  };
  Redis: {
    questions: any;
    todo: any;
  };
  RemoteAPI: {
    questions: any;
    todo: any;
  };
}
