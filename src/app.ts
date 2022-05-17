import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./model";
import mapRoutes from "./routes";

const app = express();
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

mapRoutes({ app });

export default app;
