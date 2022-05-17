import sequelize from "sequelize";
import { Contract, Job } from "../../../model";
import { GetJobUseCase } from "./get-job.usecase";

export class GetJobUseCaseImpl implements GetJobUseCase {
    getUnpaidJobs(profileId: string, jobModel: any): Promise<Job[]> {
        return jobModel.findAll({
            where: { paid: false },
            include: [{
                model: Contract,
                where: {
                    [sequelize.Op.or]: [
                        { ContractorId: profileId },
                        { ClientId: profileId },
                      ],
                }
            }]
        })
    }
}