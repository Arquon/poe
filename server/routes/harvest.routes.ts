import Router from "express";
import harvestController from "@/controllers/harvest.controller";

import { asyncHandlerMap } from "@/utils/functions/asyncHandler";
import { authMiddleWare } from "@/middleware/auth.middleware";

const harvestRouter = Router();

harvestRouter.post("/", ...asyncHandlerMap([authMiddleWare, harvestController.createAttempt]));
harvestRouter.get("/", ...asyncHandlerMap([authMiddleWare, harvestController.getAttempts]));
harvestRouter.get("/:id", ...asyncHandlerMap([authMiddleWare, harvestController.getSingleAttempt]));
harvestRouter.put("/", ...asyncHandlerMap([authMiddleWare, harvestController.updateAttempt]));
harvestRouter.delete("/:id", ...asyncHandlerMap([authMiddleWare, harvestController.deleteAttempt]));

export default harvestRouter;
