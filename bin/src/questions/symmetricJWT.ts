import { Question } from "inquirer";

enum SymmetricJWTKeys {
  SECRET_KEY = "secretKey",
  SUBJECT_PAYLOAD = "subPayload",
  ALG = "alg",
  HEADER_KEY = "headerKey",
}
export default <Question[]>[
  {
    name: SymmetricJWTKeys.SECRET_KEY,
    message: "Enter secret key",
  },
  {
    name: SymmetricJWTKeys.SUBJECT_PAYLOAD,
    message: "Enter subject payload",
  },
  {
    name: SymmetricJWTKeys.HEADER_KEY,
    message: "Enter header key",
  },
  {
    name: SymmetricJWTKeys.ALG,
    message: "Enter algorithm",
  },
];
