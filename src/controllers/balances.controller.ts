import { NextFunction, Request, Response } from "express";
import { DepositUseCase } from "../usecases/balances/deposit/deposit.usecase";
import { DepositUseCaseImpl } from "../usecases/balances/deposit/deposit.usecase.impl";

export class BalancesController {
  constructor(
    private depositUseCase: DepositUseCase = new DepositUseCaseImpl()
  ) {
    this.depositForUser = this.depositForUser.bind(this);
  }

  async depositForUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { Job, Profile } = req.app.get("models");
      const profile = await this.depositUseCase.depositForUser(
        req.params.userId,
        req.body.value,
        Job,
        Profile
      );
      if (!profile) return res.status(404).send();
      res.json(profile);
    } catch (err) {
      next(err);
    }
  }
}

export default new BalancesController();
