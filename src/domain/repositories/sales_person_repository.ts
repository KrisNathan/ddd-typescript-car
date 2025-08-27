import type SalesPerson from "../entities/sales_person";
import type { UnitOfWorkScope } from "../ports/unit_of_work";
import type UUID from "../values/uuid";

export default interface ISalesPersonRepository {
  addSalesPerson(salesPerson: SalesPerson, tx?: UnitOfWorkScope): Promise<UUID>;
  getAllSalesPersons(tx?: UnitOfWorkScope): Promise<SalesPerson[]>;
  getSalesPersonById(id: UUID, tx?: UnitOfWorkScope): Promise<SalesPerson | null>;
  updateSalesPerson(salesPerson: SalesPerson, tx?: UnitOfWorkScope): Promise<void>;
}