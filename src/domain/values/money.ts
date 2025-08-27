export class MoneyValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MoneyValidationError";
  }
}

export default class Money {
  constructor(public readonly amount: number, public readonly currency: string) {
    if (amount < 0) {
      throw new MoneyValidationError("Amount cannot be negative");
    }
    if (!currency.match(/^[A-Z]{3}$/)) {
      throw new MoneyValidationError("Currency must be a 3-letter ISO code");
    }
  }
}