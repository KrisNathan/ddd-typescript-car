import type ListAllCarsUseCase from "@application/use_cases/list_all_cars";
import type RegisterCarUseCase from "@application/use_cases/register_car";
import type { HTTPRequest, HTTPResponse } from "@infrastructure/adapters/http_server";
import z from "zod";

const RegisterCarSchema = z.object({
  make: z.string().min(1).max(512),
  model: z.string().min(1).max(512),
  year: z.number().min(1886).max(new Date().getFullYear() + 1), // Cars were invented around 1886
});

export default class CarController {
  constructor(private readonly registerCarUseCase: RegisterCarUseCase, private readonly listAllCarsUseCase: ListAllCarsUseCase) { }

  registerCar = async (req: HTTPRequest): Promise<HTTPResponse> => {
    try {
      const parseResult = RegisterCarSchema.safeParse(req.body);
      if (!parseResult.success) {
        return {
          status: 400, body: {
            message: "Invalid request body",
            errors: parseResult.error.message,
          },
        }
      }

      const { make, model, year } = parseResult.data;
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
