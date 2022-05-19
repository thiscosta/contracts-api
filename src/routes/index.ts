import { Express } from "express";
import { errorHandling } from "../middleware/error-handling";
import contracts from "./contracts";
import jobs from "./jobs";
import balances from "./balances";
import admin from "./admin";

type MapRoutesType = {
  app: Express;
}

export default function mapRoutes({ app }: MapRoutesType) {
  app.use("/contracts", contracts);
  app.use("/jobs", jobs);
  app.use("/balances", balances);
  app.use("/admin", admin);

  //Needs to be last
  app.use(errorHandling)
}
