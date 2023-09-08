import { Router } from "express";

import harvestRouter from "./harvest.routes";
import userRouter from "./user.routes";
import { errorHandler } from "@/utils/functions/errorHandler";

const router = Router();

router.use("/user", userRouter);
router.use("/harvest", harvestRouter);
router.use(errorHandler);

export default router;
