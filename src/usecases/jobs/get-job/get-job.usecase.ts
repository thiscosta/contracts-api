import { Contract, Job } from "../../../model";
import { GetUnpaidJobByIdType } from "./types/get-unpaid-job-by-id.type";

export interface GetJobUseCase {
    getUnpaidJobs(profileId: string, jobModel: any): Promise<Job[]>;
    getUnpaidJobById(jobId: string, profileId: string, jobModel: any): Promise<GetUnpaidJobByIdType>;
}