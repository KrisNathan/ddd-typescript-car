import type SalesPersonService from "@domain/services/sales_person_service";
import type UUID from "@domain/values/uuid";

export default class RegisterSalesPersonUseCase {
  constructor(private readonly salesPersonService: SalesPersonService) { }
  
  async execute(name: string): Promise<UUID> {
    return await this.salesPersonService.registerSalesPerson(name);
  }
}