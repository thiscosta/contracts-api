import { ApiException } from "./api.exception";

export class DepositExceedException extends ApiException {
  constructor() {
    super("The amount of the deposit exceed the value of the pending jobs", 400);
  }
}
