import { Request, Response } from "express";
import { GetJobUseCase } from "../usecases/jobs/get-job/get-job.usecase";
import { GetJobUseCaseImpl } from "../usecases/jobs/get-job/get-job.usecase.impl";
import { PayJobUseCase } from "../usecases/jobs/pay-job/pay-job.usecase";
import { PayJobUseCaseImpl } from "../usecases/jobs/pay-job/pay-job.usecase.impl";

export class JobController {
  constructor(
    private getJobsUseCase: GetJobUseCase = new GetJobUseCaseImpl(),
    private payJobUseCase: PayJobUseCase = new PayJobUseCaseImpl(),
    ) {
    this.listUnpaidJobs = this.listUnpaidJobs.bind(this);
    this.payJob = this.payJob.bind(this);
  }

  async listUnpaidJobs(req: Request, res: Response): Promise<any> {
    const { Job } = req.app.get("models");
    const jobs = await this.getJobsUseCase.getUnpaidJobs(
      req.get("profile_id")!,
      Job
    );
    if (!jobs) return res.status(404).send();
    res.json(jobs);
  }

  async payJob(req: Request, res: Response): Promise<any> {
    const { Job } = req.app.get("models");
    const jobs = await this.payJobUseCase.payJob(
      req.params['job_id'],
      req.get("profile_id")!,
      Job
    );
    if (!jobs) return res.status(404).send();
    res.json(jobs);
  }
}

export default new JobController();
