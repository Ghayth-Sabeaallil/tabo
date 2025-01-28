
import Express from "express";
import { userRouter } from "./resources/users";
import cookieParser from "cookie-parser";

export const apiRouter = Express.Router();

apiRouter.use(Express.json());
apiRouter.use(cookieParser());
apiRouter.use("/users", userRouter);
