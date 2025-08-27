import type { IUnitOfWork, UnitOfWorkScope } from "@/domain/ports/unit_of_work";
import type { Database } from "./types";
import type ISalesPersonRepository from "@/domain/repositories/sales_person_repository";
import type ICarSaleRepository from "@/domain/repositories/car_sale_repository";
import type ICarRepository from "@/domain/repositories/car_repository";
import type ICustomerRepository from "@/domain/repositories/customer_repository";

export class PostgresUnitOfWork implements IUnitOfWork {
  constructor(private readonly db: Database) { }
  
  async withTransaction<T>(work: (tx: UnitOfWorkScope) => Promise<T>): Promise<T> {
    return await this.db.transaction(async (tx) => {
      return work(tx);
    });
  }
}