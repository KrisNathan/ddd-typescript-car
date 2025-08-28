import type UUID from "@domain/values/uuid";
import type CarSale from "../aggregate/car_sale";

export default interface ICarSaleRepository {
  recordSale(carSale: CarSale): Promise<UUID>;
  getAllSales(): Promise<CarSale[]>;
}