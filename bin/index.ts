import execa from "execa";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import fs from "fs";
import { prompt } from "inquirer";
import { asymmetricJWT, redis, remoteAPI, symmetricJWT } from "./src/questions";
import {
  createJwtSymmetricEnvFile,
  createRedisEnvFile,
  createRemoteApiEnvFile,
} from "./src/env-creators";
import { IValidator, Template } from "./src/types";
const copy = promisify(ncp);
const access = promisify(fs.access);

const validatorTypes: IValidator = {
  AsymmetricJWT: {
    questions: asymmetricJWT,
    todo: asymmetricJWTInit,
  },
  SymmetricJWT: {
    questions: symmetricJWT,
    todo: symmetricJWTInit,
  },
  Redis: {
    questions: redis,
    todo: redisInit,
  },
  RemoteAPI: {
    questions: remoteAPI,
    todo: remoteApiInit,
  },
};
async function main() {
  removeGit();
  try {
    const { validatorType } = await prompt([
      {
        type: "list",
        name: "validatorType",
        message: "Select a validator type:",
        choices: Object.keys(validatorTypes),
      },
    ]);
    const questions =
      validatorTypes[validatorType as keyof IValidator].questions;
    const todo = validatorTypes[validatorType as keyof IValidator].todo;
    // const envCreator = validatorTypes[validatorType].envCreator;
    const answers = await prompt(questions);
    console.log(answers);
    todo(answers);
  } catch (error: any) {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  }
}
// async function initGit(options) {
//   const result = await execa("git", ["init"], {
//     cwd: options.targetDirectory,
//   });
//   if (result.failed) {
//     return Promise.reject(new Error("Failed to initialize Git"));
//   }
//   return result;
// }
async function redisInit(answers: any) {
  createRedisEnvFile(answers);
  await cleanUp(Template.RDIS);
}
async function remoteApiInit(answers: any) {
  createRemoteApiEnvFile(answers);
  await cleanUp(Template.REMOTE_API);
}
async function symmetricJWTInit(answers: any) {
  createJwtSymmetricEnvFile(answers);
  await cleanUp(Template.JWT_SYMMETRIC);
}
async function asymmetricJWTInit(answers: any) {
  console.log(answers);
  createJwtSymmetricEnvFile({ ...answers });
  await cleanUp(Template.JWT_ASYMMETRIC);
}
async function copyTemplate(temp: Template) {
  const templateDir = path.join(__dirname, "src", "templates", temp);
  try {
    await access(templateDir, fs.constants.R_OK);
    await copy(templateDir, "./");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
async function cleanUp(temp: Template) {
  await copyTemplate(temp);
  removeLock();
  fs.rm(path.join(__dirname, "..", "bin"), { recursive: true }, (err) => {
    if (err) throw err;
  });
  execa("yarn", { cwd: path.join(__dirname, "..") }).stdout.pipe(
    process.stdout
  );
  // process.on("exit", () => {
  //   fs.rmSync(path.join(__dirname, "..", "bin"), { recursive: true });
  //   fs.rmSync(path.join(__dirname, "..", ".git"), { recursive: true });
  // });
}
function removeLock() {
  const yarnLock = "yarn.lock";
  const npmLock = "package-lock.json";
  const yarnLockExists = fs.existsSync(path.resolve(__dirname, "..", yarnLock));
  const npmLockExists = fs.existsSync(path.resolve(__dirname, "..", npmLock));
  if (yarnLockExists) {
    fs.rm(path.resolve(__dirname, "..", yarnLock), (err) => {
      if (err) throw err;
    });
  }
  if (npmLockExists) {
    fs.rm(path.resolve(__dirname, "..", npmLock), (err) => {
      if (err) throw err;
    });
  }
}
function removeGit() {
  fs.rm(
    path.join(__dirname, "..", ".git"),
    { recursive: true, force: true },
    (err) => {
      if (err) throw err;
    }
  );
}
main();
