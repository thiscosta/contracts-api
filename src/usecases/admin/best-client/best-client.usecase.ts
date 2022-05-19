import { Sequelize } from "sequelize";
import { BestClientsType } from "../types/best-clients.type";

export interface BestClientsUseCase {
  bestClientsInsideDateRange(
    sequelize: Sequelize,
    query: any
  ): Promise<BestClientsType[]>;
}
