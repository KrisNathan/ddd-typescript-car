// src/domain/repositories/customer_repository.ts

import type Customer from "../entities/customer";
import type { UnitOfWorkScope } from "../ports/unit_of_work";
import type UUID from "../values/uuid";

export default interface ICustomerRepository {
  addCustomer(customer: Customer, tx?: UnitOfWorkScope): Promise<UUID>;
  getAllCustomers(tx?: UnitOfWorkScope): Promise<Customer[]>;
  getCustomerById(id: UUID, tx?: UnitOfWorkScope): Promise<Customer | null>;
  updateCustomer(customer: Customer, tx?: UnitOfWorkScope): Promise<void>;
}