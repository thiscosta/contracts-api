import { Sequelize } from "sequelize";
import { BestProfessionType } from "../types/best-profession.type";

export interface BestProfessionUsecase {
  bestProfessionInsideDateRange(
    sequelize: Sequelize,
    query: any
  ): Promise<BestProfessionType>;
}
