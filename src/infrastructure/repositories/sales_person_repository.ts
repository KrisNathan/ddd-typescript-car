import type { DatabaseOrTransaction } from '../database/types';
import type ISalesPersonRepository from '@/domain/repositories/sales_person_repository';
import SalesPerson from '@/domain/entities/sales_person';
import { salesPersons } from '../database/schema';
import UUID from '@/domain/values/uuid';
import PeopleName from '@/domain/values/people_name';
import { eq } from 'drizzle-orm';

export default class SalesPersonRepository implements ISalesPersonRepository {
  constructor(private readonly db: DatabaseOrTransaction) { }

  async addSalesPerson(salesPerson: SalesPerson): Promise<UUID> {
    const result = await this.db.insert(salesPersons).values({
      id: salesPerson.id.toString(),
      name: salesPerson.name.toString(),
      carsSoldCount: salesPerson.carsSoldCount,
    }).returning({ id: salesPersons.id });

    return new UUID(result[0].id);
  }

  async getAllSalesPersons(): Promise<SalesPerson[]> {
    const rows = await this.db.select().from(salesPersons);
    return rows.map(row => new SalesPerson({
      id: new UUID(row.id),
      name: new PeopleName(row.name),
      carsSoldCount: row.carsSoldCount ?? 0,
    }));
  }

  async getSalesPersonById(id: UUID ): Promise<SalesPerson | null> {
    const row = await this.db.select().from(salesPersons).where(eq(salesPersons.id, id.toString())).limit(1);
    if (row.length === 0) {
      return null;
    }
    const result = row[0];
    return new SalesPerson({
      id: new UUID(result.id),
      name: new PeopleName(result.name),
      carsSoldCount: result.carsSoldCount ?? 0,
    });
  }

  async updateSalesPerson(salesPerson: SalesPerson, ): Promise<void> {
    await this.db.update(salesPersons).set({
      name: salesPerson.name.toString(),
      carsSoldCount: salesPerson.carsSoldCount,
    }).where(eq(salesPersons.id, salesPerson.id.toString()));
  }
}