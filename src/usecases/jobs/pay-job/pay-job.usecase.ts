import { Contract, Job } from "../../../model";

export interface PayJobUseCase {
    payJob(jobId: string, profileId: string, jobModel: any): Promise<Job[]>;
}