import express from "express";
import helmet from "helmet";
import Controller from "./controller";
import { errorMiddleware } from "./error";
import { notFoundMiddleware } from "./middlewares/not-found";

const app = express();
const { verify } = new Controller();

app.use(helmet());

app.post("/verify", verify);

// hanlde unspecified routes
app.use(notFoundMiddleware);

// central error hanlder
app.use(errorMiddleware);

export default app;
