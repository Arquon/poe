import { Router } from "express";

import harvestRouter from "./harvest.routes";
import userRouter from "./user.routes";
import { errorHandler } from "@/utils/functions/errorHandler";
import { redirectMiddleware } from "@/middleware/redirect.middleware";

const router = Router();

router.use(redirectMiddleware);
router.use("/user", userRouter);
router.use("/harvest", harvestRouter);
router.use(errorHandler);

export default router;
