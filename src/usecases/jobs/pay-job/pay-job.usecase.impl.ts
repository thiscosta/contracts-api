import { Contract, Job, Profile } from "../../../model";
import sequelize from "sequelize";
import { PayJobUseCase } from "./pay-job.usecase";

export class PayJobUseCaseImpl implements PayJobUseCase {
  async payJob(
    jobId: string,
    profileId: string,
    jobModel: any
  ): Promise<Job[]> {
    const jobs = await jobModel.findOne({
      where: { id: jobId, paid: false },
      include: [
        {
          model: Contract,
          where: {
            [sequelize.Op.or]: [
              { ClientId: profileId },
            ],
          },
          include: [{
              model: Profile,
              as: 'Client'
          }]
        },
      ],
    });

    if(jobs.Contract.Client.balance > jobs.price) {
        
    }
    return jobs;
  }
}
