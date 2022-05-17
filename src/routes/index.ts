import { Express } from "express";
import contracts from "./contracts";
import jobs from "./jobs";

type MapRoutesType = {
  app: Express;
}

export default function mapRoutes({ app }: MapRoutesType) {
  app.use("/contracts", contracts);
  app.use("/jobs", jobs);
}
