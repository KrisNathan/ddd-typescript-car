import type CarService from "@domain/services/car_service";
import type UUID from "@domain/values/uuid";

export default class RegisterCarUseCase {
  constructor(private readonly carService: CarService) { }

  async execute(make: string, model: string, year: number): Promise<UUID> {
    return await this.carService.registerCar(make, model, year);
  }
}