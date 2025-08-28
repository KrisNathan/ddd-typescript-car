import type ICustomerRepository from "@/domain/repositories/customer_repository";
import Customer from "@/domain/entities/customer";
import UUID from "@/domain/values/uuid";
import type { DatabaseOrTransaction } from "../database/types";
import { customers } from "../database/schema";
import PeopleName from "@/domain/values/people_name";
import Email from "@/domain/values/email";
import { eq } from "drizzle-orm";

export default class CustomerRepository implements ICustomerRepository {
  constructor(private readonly db: DatabaseOrTransaction) { }

  async addCustomer(customer: Customer): Promise<UUID> {
    const result = await this.db.insert(customers).values({
      id: customer.id.toString(),
      name: customer.name.toString(),
      email: customer.email.toString(),
      loyaltyPoints: customer.loyaltyPoints,
    }).returning({ id: customers.id });

    return new UUID(result[0].id);
  }

  async getAllCustomers(): Promise<Customer[]> {
    const rows = await this.db.select().from(customers);
    return rows.map(row => new Customer({
      id: new UUID(row.id),
      name: new PeopleName(row.name),
      email: new Email(row.email),
      loyaltyPoints: row.loyaltyPoints || 0,
    }));
  }

  async getCustomerById(id: UUID): Promise<Customer | null> {
    const row = await this.db.select().from(customers).where(eq(customers.id, id.toString())).limit(1);
    if (!row) {
      return null;
    }
    const result = row[0];
    return new Customer({
      id: new UUID(result.id),
      name: new PeopleName(result.name),
      email: new Email(result.email),
      loyaltyPoints: result.loyaltyPoints || 0,
    });
  }

  async updateCustomer(customer: Customer): Promise<void> {
    await this.db.update(customers).set({
      name: customer.name.toString(),
      email: customer.email.toString(),
      loyaltyPoints: customer.loyaltyPoints,
    }).where(eq(customers.id, customer.id.toString()));
  }
}
