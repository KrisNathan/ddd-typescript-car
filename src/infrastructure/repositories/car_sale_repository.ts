import { carSales } from "@infrastructure/database/schema";
import type ICarSaleRepository from "@domain/repositories/car_sale_repository";
import CarSale from "@domain/aggregate/car_sale";
import type { Database, DatabaseOrTransaction } from "@infrastructure/database/types";
import UUID from "@domain/values/uuid";
import Money from "@domain/values/money";

export default class CarSaleRepository implements ICarSaleRepository {
  constructor(private readonly db: Database) { }

  async recordSale(carSale: CarSale, tx?: DatabaseOrTransaction): Promise<UUID> {
    const dbConnection = tx || this.db;

    const result = await dbConnection.insert(carSales).values({
      id: carSale.id.toString(),
      carId: carSale.carId.toString(),
      customerId: carSale.customerId.toString(),
      salesPersonId: carSale.salesPersonId.toString(),
      transactionDate: carSale.transactionDate,
      negotiatedPrice: carSale.negotiatedPrice.amount.toString(),
      negotiatedPriceCurrency: carSale.negotiatedPrice.currency,
    }).returning({ id: carSales.id });

    return new UUID(result[0].id);
  }

  async getAllSales(tx?: DatabaseOrTransaction): Promise<CarSale[]> {
    const dbConnection = tx || this.db;
    const rows = await dbConnection.select().from(carSales);
    return rows.map(row => new CarSale({
      id: new UUID(row.id),
      carId: new UUID(row.carId),
      customerId: new UUID(row.customerId),
      salesPersonId: new UUID(row.salesPersonId),
      transactionDate: row.transactionDate || new Date(),
      negotiatedPrice: new Money(Number(row.negotiatedPrice), row.negotiatedPriceCurrency || "USD"), // disaster imminent.
    }));
  }
}