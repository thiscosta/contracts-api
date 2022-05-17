import { Request, Response } from "express";
import sequelize from "sequelize";
import { Contract } from "../model";
import { GetContractUseCase } from "../usecases/contract/get-contract/get-contract.usecase";
import { GetContractUseCaseImpl } from "../usecases/contract/get-contract/get-contract.usecase.impl";

export class ContractController {
  constructor(
    private getContractUseCase: GetContractUseCase = new GetContractUseCaseImpl()
  ) {
    this.getContractById = this.getContractById.bind(this);
    this.listAll = this.listAll.bind(this);
  }

  async listAll(req: Request, res: Response): Promise<any> {
    const { Contract } = req.app.get("models");
    const contracts = await this.getContractUseCase.getAllContracts(
      req.get("profile_id")!,
      Contract
    );
    if (!contracts) return res.status(404).send();
    res.json(contracts);
  }

  async getContractById(req: Request, res: Response): Promise<any> {
    const { Contract } = req.app.get("models");
    const contract = await this.getContractUseCase.getContractById(
      req.params.id!,
      req.get("profile_id")!,
      Contract
    );
    if (!contract) return res.status(404).end();
    res.json(contract);
  }
}

export default new ContractController();
