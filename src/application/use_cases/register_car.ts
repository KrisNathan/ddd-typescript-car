import type CarService from "@domain/services/car_service";

export default class RegisterCarUseCase {
  constructor(private readonly carService: CarService) { }

  async execute(make: string, model: string, year: number): Promise<void> {
    await this.carService.registerCar(make, model, year);
  }
}