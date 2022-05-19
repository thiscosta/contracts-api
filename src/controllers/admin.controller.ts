import { NextFunction, Request, Response } from "express";
import { BestProfessionUsecase } from "../usecases/admin//best-profession/best-profession.usecase";
import { BestClientsUseCase } from "../usecases/admin/best-client/best-client.usecase";
import { BestClientsUsecaseImpl } from "../usecases/admin/best-client/best-client.usecase.impl";
import { BestProfessionUsecaseImpl } from "../usecases/admin/best-profession/best-profession.usecase.impl";

export class AdminController {
  constructor(
    private bestProfessionUseCase: BestProfessionUsecase = new BestProfessionUsecaseImpl(),
    private bestClientsUseCase: BestClientsUseCase = new BestClientsUsecaseImpl()
  ) {
    this.bestProfession = this.bestProfession.bind(this);
    this.bestClients = this.bestClients.bind(this);
  }

  async bestProfession(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const profession = await this.bestProfessionUseCase.bestProfessionInsideDateRange(
        req.app.get('sequelize'),
        req.query
      );
      if (!profession) return res.status(404).send();
      res.json(profession);
    } catch (err) {
      next(err);
    }
  }

  async bestClients(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const clients = await this.bestClientsUseCase.bestClientsInsideDateRange(
        req.app.get('sequelize'),
        req.query
      );
      if (!clients) return res.status(404).send();
      res.json(clients);
    } catch (err) {
      next(err);
    }
  }
}

export default new AdminController();
