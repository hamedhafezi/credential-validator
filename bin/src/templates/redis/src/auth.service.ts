import { redisClient } from "./redis";
import config from "config";

const PREFIX_KEY: string = config.get("PREFIX_KEY") || "";

export async function verify(key: string) {
  return redisClient.get(PREFIX_KEY + key);
}
