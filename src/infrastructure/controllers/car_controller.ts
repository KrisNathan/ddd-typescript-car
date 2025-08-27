import type ListAllCarsUseCase from "@application/use_cases/list_all_cars";
import type RegisterCarUseCase from "@application/use_cases/register_car";
import type { HTTPRequest, HTTPResponse } from "@infrastructure/adapters/http_server";

export default class CarController {
  constructor(private readonly registerCarUseCase: RegisterCarUseCase, private readonly listAllCarsUseCase: ListAllCarsUseCase) { }

  registerCar = async (req: HTTPRequest): Promise<HTTPResponse> => {
    try {
      const { make, model, year } = req.body as { make: string; model: string; year: number };
      
      await this.registerCarUseCase.execute(make, model, year);

      return {
        status: 200, body: {
          message: "Car created successfully",
        },
      }
    } catch (error) {
      return {
        status: 500, body: {
          message: "Internal Server Error",
        },
      }
    }
  }

  listAllCars = async (req: HTTPRequest): Promise<HTTPResponse> => {
    try {
      const cars = await this.listAllCarsUseCase.execute();
      return {
        status: 200, body: { cars },
      }
    } catch (error) {
      return {
        status: 500, body: {
          message: "Internal Server Error",
        },
      }
    }
  }
}
