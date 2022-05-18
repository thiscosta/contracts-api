import express from "express";

import { BalancesController } from "../controllers/balances.controller";
import { getProfile } from "../middleware/get-profile";

const balancesController = new BalancesController();

const router = express.Router();

router.route("/deposit/:userId").post(getProfile, balancesController.depositForUser);

export default router;
