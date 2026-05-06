import { Router, type IRouter } from "express";
import healthRouter from "./health";
import structureWorkflowRouter from "./structureWorkflow";

const router: IRouter = Router();

router.use(healthRouter);
router.use(structureWorkflowRouter);

export default router;
