import { Contract } from "../../../model";

export interface GetContractUseCase {
    getContractById(id: string, profileId: string, contractModel: any): Promise<Contract>;
    getAllContracts(profileId: string, contractModel: any): Promise<Contract[]>;
}