import { Sequelize } from "sequelize";
import { sortByProperty } from "../../../utils/sort.utils";
import { BestClientsType } from "../types/best-clients.type";
import { BestClientsUseCase } from "./best-client.usecase";

export class BestClientsUsecaseImpl implements BestClientsUseCase {
  async bestClientsInsideDateRange(
    sequelize: Sequelize,
    query: any
  ): Promise<BestClientsType[]> {
    const { start, end, limit = 2 } = query;

    const [results] = await sequelize.query(`
      select 
          p.id as id, 
          (p.firstName || ' ' || p.lastName)  as fullName, 
          sum(j.price) as paid 
      from Jobs j
      join Contracts c on c.id = j.ContractId
      join Profiles p on p.id = c.ClientId
      where 
          j.paid = true and 
          j.paymentDate >= '${start}' and 
          j.paymentDate <= '${end}'
      group by p.id
      limit ${limit}
    `);

    return (results as BestClientsType[]).sort((a, b) =>
      sortByProperty(a, b, "paid", "desc")
    );
  }
}
