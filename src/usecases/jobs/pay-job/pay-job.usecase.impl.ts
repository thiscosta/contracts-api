import { Contract, Job, Profile } from "../../../model";
import sequelize, { Sequelize } from "sequelize";
import { PayJobUseCase } from "./pay-job.usecase";
import { NoMoneyException } from "../../../exceptions/no-money.exception";
import { GetJobUseCase } from "../get-job/get-job.usecase";
import { GetJobUseCaseImpl } from "../get-job/get-job.usecase.impl";
import { GetUnpaidJobByIdType } from "../get-job/types/get-unpaid-job-by-id.type";

export class PayJobUseCaseImpl implements PayJobUseCase {
  constructor(private getJobUseCase: GetJobUseCase = new GetJobUseCaseImpl()) {}

  async payJob(
    jobId: string,
    profileId: string,
    jobModel: any,
    profileModel: any,
    sq: Sequelize
  ): Promise<Job[]> {
    const job: GetUnpaidJobByIdType = await this.getJobUseCase.getUnpaidJobById(
      jobId,
      profileId,
      jobModel
    );

    if (job.Contract.Client.balance < job.price) {
      throw new NoMoneyException();
    }

    const transaction = await sq.transaction();

    await profileModel.update(
      { balance: job.Contract.Client.balance - job.price },
      { where: { id: job.Contract.Client.id }, transaction }
    );

    const contractor = await profileModel.findOne({
      where: { id: job.Contract.ContractorId },
    });

    await profileModel.update(
      { balance: contractor.balance + job.price },
      { where: { id: contractor.id }, transaction }
    );

    await jobModel.update(
      { paid: true, paymentDate: new Date() },
      { where: { id: job.id }, transaction }
    );

    await transaction.commit();

    return jobModel.findOne({ where: { id: job.id } });
  }
}
