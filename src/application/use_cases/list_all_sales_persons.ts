import type SalesPerson from "@domain/entities/sales_person";
import type SalesPersonService from "@domain/services/sales_person_service";

export default class ListAllSalesPersonsUseCase {
  constructor(private readonly salesPersonService: SalesPersonService) { }
  
  async execute(): Promise<SalesPerson[]> {
    return await this.salesPersonService.listAllSalesPersons();
  } 
}