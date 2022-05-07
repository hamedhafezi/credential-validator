import express, { json, urlencoded } from "express";
import config from "config";
import helmet from "helmet";
import Controller from "./controller";
import { errorMiddleware } from "./error";
import { notFoundMiddleware } from "./middlewares/not-found";

const app = express();
const { verify } = new Controller();

app.use(helmet());

app.use(urlencoded({ extended: true }));
app.use(json());

app.post("/verify", verify);

// hanlde unspecified routes
app.use(notFoundMiddleware);

// central error hanlder
app.use(errorMiddleware);

export default app;
