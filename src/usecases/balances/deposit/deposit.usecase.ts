import { Profile } from "../../../model";

export interface DepositUseCase {
  depositForUser(
    profileId: string,
    amount: number,
    jobModel: any,
    profileModel: any
  ): Promise<Profile>;
}
