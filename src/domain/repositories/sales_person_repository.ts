import type SalesPerson from "../entities/sales_person";
import type UUID from "../values/uuid";

export default interface ISalesPersonRepository {
  addSalesPerson(salesPerson: SalesPerson): Promise<UUID>;
  getAllSalesPersons(): Promise<SalesPerson[]>;
  getSalesPersonById(id: UUID): Promise<SalesPerson | null>;
  updateSalesPerson(salesPerson: SalesPerson): Promise<void>;
}