import type Car from "@domain/entities/car";
import type UUID from "@domain/values/uuid";

export default interface ICarRepository {
  addCar(car: Car): Promise<UUID>;
  getCars(): Promise<Car[]>;
  getCarById(id: UUID): Promise<Car | null>;
}