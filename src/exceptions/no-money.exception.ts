import { ApiException } from "./api.exception";

export class NoMoneyException extends ApiException {
  constructor() {
    super("Client has no money this pay this job", 400);
  }
}
