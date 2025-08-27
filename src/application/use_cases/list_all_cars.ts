import type Car from "@domain/entities/car";
import type CarService from "@domain/services/car_service";

export default class ListAllCarsUseCase {
  constructor(private readonly carService: CarService) {}

  async execute(): Promise<Car[]> {
    const cars = await this.carService.listAllCars();
    return cars;
  }
}