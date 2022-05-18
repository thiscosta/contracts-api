export type GetUnpaidJobByIdType = {
  id: 1;
  description: string;
  price: number;
  paid: boolean | null;
  paymentDate: null;
  createdAt: string;
  updatedAt: string;
  ContractId: number;
  Contract: {
    id: number;
    terms: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    ContractorId: number;
    ClientId: number;
    Client: {
      id: number;
      firstName: string;
      lastName: string;
      profession: string;
      balance: number;
      type: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};
