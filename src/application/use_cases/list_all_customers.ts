import type Customer from "@domain/entities/customer";
import type CustomerService from "@domain/services/customer_service";

export default class ListAllCustomersUseCase {
  constructor(private readonly customerService: CustomerService) {}

  async execute(): Promise<Customer[]> {
    return await this.customerService.listAllCustomers();
  }
}