import { Sequelize } from "sequelize";
import { BestProfessionUsecase } from "./best-profession.usecase";
import { BestProfessionType } from "../types/best-profession.type";

export class BestProfessionUsecaseImpl implements BestProfessionUsecase {
  async bestProfessionInsideDateRange(
    sequelize: Sequelize, query: any
  ): Promise<BestProfessionType> {

    const { start, end } = query;

    const [results] = await sequelize.query(`
      select p.profession, sum(j.price) as money from Jobs j
      join Contracts c on c.id = j.ContractId
      join Profiles p on p.id = c.ContractorId
      where j.paid = true and j.paymentDate >= '${start}' and j.paymentDate <= '${end}'
      group by p.id, p.profession
    `);

    const professions = results  as BestProfessionType[]
    
    let bestProfession: BestProfessionType;

    professions.forEach((profession) => {
      if (!bestProfession || profession.money > bestProfession.money) {
        bestProfession = profession;
      }
    });

    return bestProfession!;
  }
}
