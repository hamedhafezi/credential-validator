import { Question } from "inquirer";
export = <Question[]>[
  {
    type: "list",
    name: "method",
    message: "Select http method which remote api uses",
    choices: ["GET", "POST"],
  },
  {
    name: "url",
    message: "Enter the remote api URL",
  },
  {
    type: "list",
    name: "credentialContainer",
    message: "Select the credential container",
    choices: ["Header", "Body"],
    when: (answers) => {
      return answers.method === "POST";
    },
  },
  {
    name: "headerName",
    message: "Enter header name",
    when: (answers) => {
      return answers.credentialContainer === "Header";
    },
  },
  {
    type: "list",
    name: "authMethod",
    message: "Select the authentication method",
    choices: ["Basic auth", "JWT"],
  },
  {
    name: "jwtPrefix",
    message: "Enter jwt header value prefix",
    when: (answers) => {
      return answers.authMethod === "JWT";
    },
    default: "Bearer",
  },
  {
    name: "usernameKey",
    message: "Enter username field key",
    when: (answers) => {
      return answers.authMethod === "Basic auth";
    },
  },
  {
    name: "passwordKey",
    message: "Enter password field key",
    when: (answers) => {
      return answers.authMethod === "Basic auth";
    },
  },
  {
    type: "list",
    name: "passwordFunc",
    message: "Select password applied function",
    choices: ["Plain", "MD5", "SHA1", "Base64"],
    when: (answers) => {
      return answers.authMethod === "Basic auth";
    },
  },
];
