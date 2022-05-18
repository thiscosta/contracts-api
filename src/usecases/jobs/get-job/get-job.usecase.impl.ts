import sequelize from "sequelize";
import { Contract, Job, Profile } from "../../../model";
import { GetJobUseCase } from "./get-job.usecase";
import { GetUnpaidJobByIdType } from "./types/get-unpaid-job-by-id.type";

export class GetJobUseCaseImpl implements GetJobUseCase {
  getUnpaidJobs(profileId: string, jobModel: any): Promise<Job[]> {
    return jobModel.findAll({
      where: { paid: false },
      include: [
        {
          model: Contract,
          where: {
            [sequelize.Op.or]: [
              { ContractorId: profileId },
              { ClientId: profileId },
            ],
          },
        },
      ],
    });
  }

  getUnpaidJobById(
    jobId: string,
    profileId: string,
    jobModel: any
  ): Promise<GetUnpaidJobByIdType> {
    return jobModel.findOne({
      where: { id: jobId, paid: { [sequelize.Op.not]: true } },
      include: [
        {
          model: Contract,
          where: {
            [sequelize.Op.or]: [{ ClientId: profileId }],
          },
          include: [
            {
              model: Profile,
              as: "Client",
            },
          ],
        },
      ],
    });
  }
}
