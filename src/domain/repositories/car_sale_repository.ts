import type UUID from "@domain/values/uuid";
import type CarSale from "../aggregate/car_sale";
import type { UnitOfWorkScope } from "../ports/unit_of_work";

export default interface ICarSaleRepository {
  recordSale(carSale: CarSale, tx?: UnitOfWorkScope): Promise<UUID>;
  getAllSales(tx?: UnitOfWorkScope): Promise<CarSale[]>;
}