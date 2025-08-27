import type ICarRepository from "@/domain/repositories/car_repository";
import Car from "@domain/entities/car";
import type { Database, DatabaseOrTransaction } from "../database/types";
import { cars } from "../database/schema";
import UUID from "@/domain/values/uuid";
import { eq } from "drizzle-orm";

export default class CarRepository implements ICarRepository {
  constructor(private readonly db: Database) { }

  async addCar(car: Car, tx?: DatabaseOrTransaction): Promise<UUID> {
    const dbConnection = tx ?? this.db;
    const result = await dbConnection.insert(cars).values({
      id: car.id.toString(),
      make: car.make,
      model: car.model,
      year: car.year,
    }).returning({ id: cars.id });

    return new UUID(result[0].id);
  }

  async getCars(tx?: DatabaseOrTransaction): Promise<Car[]> {
    const dbConnection = tx ?? this.db;
    const rows = await dbConnection.select().from(cars);
    return rows.map(row => new Car({
      id: new UUID(row.id),
      make: row.make,
      model: row.model,
      year: row.year,
    }));
  }

  async getCarById(id: UUID, tx?: DatabaseOrTransaction): Promise<Car | null> {
    const dbConnection = tx ?? this.db;
    const row = await dbConnection.select().from(cars).where(eq(cars.id, id.toString())).limit(1);
    if (row.length === 0) {
      return null;
    }
    const result = row[0];
    return new Car({
      id: new UUID(result.id),
      make: result.make,
      model: result.model,
      year: result.year,
    });
  }
}