import { createClient, RedisClientType } from "redis";
import config from "config";
import logger from "../logger";

const HOST: string = config.get("HOST");
const REDIS_PORT: number = Number(config.get("REDIS_PORT"));
const USER: string = config.get("USER");
const PASSWORD: string = config.get("PASSWORD");
const INSTANCE_NUMBER: number = Number(config.get("INSTANCE_NUMBER"));

export let redisClient: RedisClientType;
export async function redisInit() {
  try {
    redisClient = createClient({
      socket: {
        host: HOST,
        port: REDIS_PORT,
      },
      database: INSTANCE_NUMBER,
      username: USER,
      password: PASSWORD,
    });
    await redisClient.connect();
    console.log(`Connected to redis on ${HOST}:${REDIS_PORT}`);
  } catch (error) {
    console.log(error);
    logger.error("Redis connection error", error);
    process.exit(1);
  }
}
