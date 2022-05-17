import express from "express";
import { JobController } from "../controllers/jobs.controller";

import { getProfile } from "../middleware/getProfile";

const jobController = new JobController();

const router = express.Router();

router.route("/unpaid").get(getProfile, jobController.listUnpaidJobs);
router.route("/:job_id/pay").post(getProfile, jobController.payJob);

export default router;
