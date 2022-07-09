import { Router } from "express";
import * as usersController from "../controllers/UsersController.js";
import validateDataMiddleware from "../middlewares/validateDataMiddleware.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.get("/", usersController.getUsers);
userRouter.get("/:id", usersController.getUser);
userRouter.put("/:id", validateDataMiddleware(userSchema), usersController.updateUser);
userRouter.post("/", validateDataMiddleware(userSchema), usersController.createUser);
userRouter.delete("/:id", usersController.deleteUser);

export default userRouter;
