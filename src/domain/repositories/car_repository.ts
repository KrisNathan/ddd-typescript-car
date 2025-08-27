import type Car from "@domain/entities/car";
import type UUID from "@domain/values/uuid";
import type { UnitOfWorkScope } from "../ports/unit_of_work";

export default interface ICarRepository {
  addCar(car: Car, tx?: UnitOfWorkScope): Promise<UUID>;
  getCars(tx?: UnitOfWorkScope): Promise<Car[]>;
  getCarById(id: UUID, tx?: UnitOfWorkScope): Promise<Car | null>;
}