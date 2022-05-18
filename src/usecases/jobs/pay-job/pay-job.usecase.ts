import { Sequelize } from "sequelize/types";
import {  Job } from "../../../model";

export interface PayJobUseCase {
    payJob(jobId: string, profileId: string, jobModel: any, profileModel: any, sequelize: Sequelize): Promise<Job[]>;
}