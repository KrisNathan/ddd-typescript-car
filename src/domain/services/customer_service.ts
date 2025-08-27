import Customer from "@domain/entities/customer";
import type ICustomerRepository from "@domain/repositories/customer_repository";
import type UUID from "@domain/values/uuid";

export default class CustomerService {
  constructor(private readonly customerRepository: ICustomerRepository) { }

  async registerCustomer(name: string, email: string): Promise<UUID> {
    const newCustomer = Customer.new({ name, email });
    return await this.customerRepository.addCustomer(newCustomer);
  }

  listAllCustomers = async (): Promise<Customer[]> => {
    return this.customerRepository.getAllCustomers();
  }
}