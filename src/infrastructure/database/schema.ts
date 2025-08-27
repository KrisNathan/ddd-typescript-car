import { pgTable, uuid, varchar, integer, timestamp, decimal } from 'drizzle-orm/pg-core';

// Customer table schema
export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 512 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  loyaltyPoints: integer('loyalty_points').default(0),
});

// Sales persons table schema
export const salesPersons = pgTable('sales_persons', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 512 }).notNull(),
  carsSoldCount: integer('cars_sold_count').default(0),
});

// Cars table schema
export const cars = pgTable('cars', {
  id: uuid('id').primaryKey().defaultRandom(),
  make: varchar('make', { length: 50 }).notNull(),
  model: varchar('model', { length: 50 }).notNull(),
  year: integer('year').notNull(),
});

// Car sales table schema
export const carSales = pgTable('car_sales', {
  id: uuid('id').primaryKey().defaultRandom(),
  carId: uuid('car_id').notNull().references(() => cars.id, { onDelete: 'restrict' }),
  customerId: uuid('customer_id').notNull().references(() => customers.id, { onDelete: 'restrict' }),
  salesPersonId: uuid('sales_person_id').notNull().references(() => salesPersons.id, { onDelete: 'restrict' }),
  transactionDate: timestamp('transaction_date').defaultNow(),
  negotiatedPrice: decimal('negotiated_price', { precision: 10, scale: 2 }).notNull(),
  negotiatedPriceCurrency: varchar('negotiated_price_currency', { length: 3 }).notNull().default('USD'),
});
