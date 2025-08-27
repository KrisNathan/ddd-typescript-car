import type RegisterCarSaleUseCase from "@/application/use_cases/register_car_sale";
import type ListAllCarSaleUseCase from "@application/use_cases/list_all_car_sales";
import type { HTTPRequest, HTTPResponse } from "@infrastructure/adapters/http_server";
import z from "zod";

// NOTE: use arrow functions to auto-bind `this` in methods

const CarSaleSchema = z.object({
  carId: z.uuid(),
  customerId: z.uuid(),
  salesPersonId: z.uuid(),
  negotiatedPriceAmount: z.number().positive(),
});

export default class CarSaleController {
  constructor(
    private readonly registerCarSaleUseCase: RegisterCarSaleUseCase,
    private readonly listAllCarSaleUseCase: ListAllCarSaleUseCase,
  ) { }

  registerCarSale = async (req: HTTPRequest): Promise<HTTPResponse> => {
    try {
      const parseResult = CarSaleSchema.safeParse(req.body);
      if (!parseResult.success) {
        return {
          status: 400, body: {
            message: "Invalid request body",
            errors: parseResult.error.message,
          },
        }
      }

      // Call use case
      const carSaleId = await this.registerCarSaleUseCase.execute({
        carId: parseResult.data.carId,
        customerId: parseResult.data.customerId,
        salesPersonId: parseResult.data.salesPersonId,
        negotiatedPriceAmount: parseResult.data.negotiatedPriceAmount,
        negotiatedPriceCurrency: "USD", // Hardcoded for simplicity
      });

      return {
        status: 200, body: {
          message: "Car sale created successfully",
          carSaleId: carSaleId.toString(),
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

  listAllCarSale = async (req: HTTPRequest): Promise<HTTPResponse> => {
    try {
      const sales = await this.listAllCarSaleUseCase.execute();

      return {
        status: 200, body: { sales },
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