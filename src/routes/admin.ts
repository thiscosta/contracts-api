import express from "express";

import { AdminController } from "../controllers/admin.controller";
import { getProfile } from "../middleware/get-profile";

const adminController = new AdminController();

const router = express.Router();

router.route("/best-profession").get(getProfile, adminController.bestProfession);
router.route("/best-clients").get(getProfile, adminController.bestClients);

export default router;
