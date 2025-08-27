import type Money from "../values/money";
import UUID from "../values/uuid";

export interface CarSaleProps {
  id: UUID;
  salesPersonId: UUID;
  customerId: UUID;
  carId: UUID;
  transactionDate: Date;
  negotiatedPrice: Money;
}

export default class CarSale {
  public id: UUID;
  public salesPersonId: UUID;
  public customerId: UUID;
  public carId: UUID;
  public transactionDate: Date;
  public negotiatedPrice: Money;
  constructor({ id, salesPersonId, customerId, carId, transactionDate, negotiatedPrice }: CarSaleProps
  ) {
    this.id = id;
    this.salesPersonId = salesPersonId;
    this.customerId = customerId;
    this.carId = carId;
    this.transactionDate = transactionDate;
    this.negotiatedPrice = negotiatedPrice;
  }

  static new(
    salesPersonId: UUID,
    customerId: UUID,
    carId: UUID,
    negotiatedPrice: Money,
  ): CarSale {
    return new CarSale({
      id: UUID.generate(),
      salesPersonId,
      customerId,
      carId,
      transactionDate: new Date(),
      negotiatedPrice,
    });
  }
}