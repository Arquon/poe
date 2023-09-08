import Router from "express";
import userController from "@/controllers/user.controller";
import { authMiddleWare } from "@/middleware/auth.middleware";
import { asyncHandlerMap } from "@/utils/functions/asyncHandler";

const userRouter = Router();

userRouter.post("/registration", ...asyncHandlerMap([userController.registration]));
userRouter.post("/login", ...asyncHandlerMap([userController.login]));
userRouter.post("/logout", ...asyncHandlerMap([userController.logout]));
userRouter.get("/", ...asyncHandlerMap([authMiddleWare, userController.getCurrentUser]));
userRouter.put("/", ...asyncHandlerMap([authMiddleWare, userController.updateUser]));
userRouter.delete("/", ...asyncHandlerMap([authMiddleWare, userController.deleteUser]));

export default userRouter;
