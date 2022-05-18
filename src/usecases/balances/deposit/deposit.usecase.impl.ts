import { Sequelize } from "sequelize";
import { DepositExceedException } from "../../../exceptions/deposit-exceed.exception";
import { Contract, Profile } from "../../../model";
import { DepositUseCase } from "./deposit.usecase";

export class DepositUseCaseImpl implements DepositUseCase {
  async depositForUser(
    profileId: string,
    amount: number,
    jobModel: any,
    profileModel: any
  ): Promise<Profile> {
    const profile = await profileModel.findOne({ where: { id: profileId } });

    const totalJobsToPay = await jobModel.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("price")), 'totalPrice'],
      ],
      include: [
        {
          attributes: [],
          model: Contract,
          where: { ClientId: profileId },
        },
      ],
    });

    if ((amount * 4) >= totalJobsToPay[0].dataValues.totalPrice) {
      throw new DepositExceedException();
    }

    profile.balance += amount;
    await profile.save();
    return profile;
  }
}
