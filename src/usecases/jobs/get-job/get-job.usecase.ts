import { Contract, Job } from "../../../model";

export interface GetJobUseCase {
    getUnpaidJobs(profileId: string, jobModel: any): Promise<Job[]>;
}