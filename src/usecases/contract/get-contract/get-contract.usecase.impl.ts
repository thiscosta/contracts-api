import sequelize from "sequelize";
import { Contract } from "../../../model";
import { GetContractUseCase } from "./get-contract.usecase";

export class GetContractUseCaseImpl implements GetContractUseCase {
  async getContractById(
    id: string,
    profileId: string,
    contractModel: any
  ): Promise<Contract> {
    return contractModel.findOne({
      where: {
        id,
        [sequelize.Op.or]: [
          { ContractorId: profileId },
          { ClientId: profileId },
        ],
      },
    });
  }

  async getAllContracts(
    profileId: string,
    contractModel: any
  ): Promise<Contract[]> {
    return contractModel.findAll({
      where: {
        [sequelize.Op.or]: [
          { ContractorId: profileId },
          { ClientId: profileId },
        ],
      },
    });
  }
}
