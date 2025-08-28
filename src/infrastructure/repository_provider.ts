import type { DatabaseOrTransaction } from "./database/types";
import CarRepository from "./repositories/car_repository";
import CustomerRepository from "./repositories/customer_repository";
import SalesPersonRepository from "./repositories/sales_person_repository";
import CarSaleRepository from "./repositories/car_sale_repository";
import type IRepositoryProivder from "@application/repository_provider";

export default class RepositoryProvider implements IRepositoryProivder {
  constructor(private readonly databaseOrTransaction: DatabaseOrTransaction) { }

  get customerRepository() {
    return new CustomerRepository(this.databaseOrTransaction);
  }

  get salesPersonRepository() {
    return new SalesPersonRepository(this.databaseOrTransaction);
  }

  get carRepository() {
    return new CarRepository(this.databaseOrTransaction);
  }

  get carSaleRepository() {
    return new CarSaleRepository(this.databaseOrTransaction);
  }
}