import type CustomerService from "@domain/services/customer_service";
import type UUID from "@domain/values/uuid";

export default class RegisterCustomerUseCase {
  constructor(private readonly customerService: CustomerService) { }

  async execute(name: string, email: string): Promise<UUID> {
    return await this.customerService.registerCustomer(name, email);
  }
}