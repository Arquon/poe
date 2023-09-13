import { Router } from "express";

import harvestRouter from "./harvest.routes";
import userRouter from "./user.routes";
import { errorHandler } from "@/utils/functions/errorHandler";
import { redirectMiddleware } from "@/middleware/redirect.middleware";

const router = Router();

const isProd = process.env.NODE_ENV === "production";

if (isProd) router.use(redirectMiddleware);

router.use("/user", userRouter);
router.use("/harvest", harvestRouter);
router.use(errorHandler);

export default router;
