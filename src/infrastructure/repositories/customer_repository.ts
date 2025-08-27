import type ICustomerRepository from "@/domain/repositories/customer_repository";
import Customer from "@/domain/entities/customer";
import UUID from "@/domain/values/uuid";
import type { Database, DatabaseOrTransaction } from "../database/types";
import { customers } from "../database/schema";
import PeopleName from "@/domain/values/people_name";
import Email from "@/domain/values/email";
import { eq } from "drizzle-orm";

export default class CustomerRepository implements ICustomerRepository {
  constructor(private readonly db: Database) { }

  async addCustomer(customer: Customer, tx?: DatabaseOrTransaction): Promise<UUID> {
    const dbConnection = tx ?? this.db;

    const result = await dbConnection.insert(customers).values({
      id: customer.id.toString(),
      name: customer.name.toString(),
      email: customer.email.toString(),
      loyaltyPoints: customer.loyaltyPoints,
    }).returning({ id: customers.id });

    return new UUID(result[0].id);
  }

  async getAllCustomers(tx?: DatabaseOrTransaction): Promise<Customer[]> {
    const dbConnection = tx ?? this.db;

    const rows = await dbConnection.select().from(customers);
    return rows.map(row => new Customer({
      id: new UUID(row.id),
      name: new PeopleName(row.name),
      email: new Email(row.email),
      loyaltyPoints: row.loyaltyPoints || 0,
    }));
  }

  async getCustomerById(id: UUID, tx?: DatabaseOrTransaction): Promise<Customer | null> {
    const dbConnection = tx ?? this.db;
    const row = await dbConnection.select().from(customers).where(eq(customers.id, id.toString())).limit(1);
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

  async updateCustomer(customer: Customer, tx?: DatabaseOrTransaction): Promise<void> {
    const dbConnection = tx ?? this.db;
    await dbConnection.update(customers).set({
      name: customer.name.toString(),
      email: customer.email.toString(),
      loyaltyPoints: customer.loyaltyPoints,
    }).where(eq(customers.id, customer.id.toString()));
  }
}
