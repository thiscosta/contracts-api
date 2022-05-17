import express from "express";

import { ContractController } from "../controllers/contract.controller";
import { getProfile } from "../middleware/getProfile";

const contractController = new ContractController();

const router = express.Router();

router.route("/").get(getProfile, contractController.listAll);
router.route("/:id").get(getProfile, contractController.getContractById);

export default router;
