import { Question } from "inquirer";
export = <Question[]>[
  {
    name: "pubKey",
    message: "Enter public key",
  },
  {
    name: "privateKey",
    message: "Enter private key",
  },
  {
    name: "subjectKeyName",
    message: "Enter subject key name",
    default: "sub",
  },
];
