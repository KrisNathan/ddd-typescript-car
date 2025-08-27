import Car from "@domain/entities/car";
import type ICarRepository from "@domain/repositories/car_repository";
import type UUID from "@domain/values/uuid";

export default class CarService {
  constructor(private readonly carRepository: ICarRepository) { }

  async listAllCars(): Promise<Car[]> {
    const cars = await this.carRepository.getCars();
    return cars;
  }

  async registerCar(make: string, model: string, year: number): Promise<UUID> {
    const newCar = Car.new({ make, model, year });
    return await this.carRepository.addCar(newCar);
  }
}