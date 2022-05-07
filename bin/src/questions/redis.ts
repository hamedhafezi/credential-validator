import { Question } from "inquirer";
export = <Question[]>[
  {
    name: "host",
    message: "Enter host address",
  },
  {
    name: "username",
    message: "Enter username",
  },
  {
    name: "password",
    message: "Enter password",
  },
  {
    name: "instanceNumber",
    message: "Enter instance number (0-11)",
    type: "number",
    default: 0,
  },
  {
    name: "prefixKey",
    message: "Enter prefix key",
  },
  {
    name: "appendDate",
    message: "Get related data in response",
    type: "confirm",
  },
];
