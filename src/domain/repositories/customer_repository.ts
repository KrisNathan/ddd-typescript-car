// src/domain/repositories/customer_repository.ts

import type Customer from "../entities/customer";
import type UUID from "../values/uuid";

export default interface ICustomerRepository {
  addCustomer(customer: Customer): Promise<UUID>;
  getAllCustomers(): Promise<Customer[]>;
  getCustomerById(id: UUID): Promise<Customer | null>;
  updateCustomer(customer: Customer): Promise<void>;
}