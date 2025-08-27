import SalesPerson from "@domain/entities/sales_person";
import type ISalesPersonRepository from "@domain/repositories/sales_person_repository";
import type UUID from "@domain/values/uuid";

export default class SalesPersonService {
  constructor(private readonly salesPersonRepository: ISalesPersonRepository) { }

  async registerSalesPerson(name: string): Promise<UUID> {
    const newSalesPerson = SalesPerson.new(name);
    return await this.salesPersonRepository.addSalesPerson(newSalesPerson);
  }

  async listAllSalesPersons(): Promise<SalesPerson[]> {
    return this.salesPersonRepository.getAllSalesPersons();
  }
}