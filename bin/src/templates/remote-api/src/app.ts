import express, { json, urlencoded } from "express";
import helmet from "helmet";
import Controller from "./controller";
import { notFoundMiddleware } from "./middlewares/not-found";
import { errorMiddleware } from "./error";

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
