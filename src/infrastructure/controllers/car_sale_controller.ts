import type RegisterCarSaleUseCase from "@/application/use_cases/register_car_sale";
import type ListAllCarSaleUseCase from "@application/use_cases/list_all_car_sales";
import type { HTTPRequest, HTTPResponse } from "@infrastructure/adapters/http_server";

// NOTE: use arrow functions to auto-bind `this` in methods

export default class CarSaleController {
  constructor(
    private readonly registerCarSaleUseCase: RegisterCarSaleUseCase,
    private readonly listAllCarSaleUseCase: ListAllCarSaleUseCase,
  ) { }

  registerCarSale = async (req: HTTPRequest): Promise<HTTPResponse> => {
    try {
      const { carId, customerId, salesPersonId, price } = req.body as { 
        carId: string; 
        customerId: string; 
        salesPersonId: string; 
        price: number; 
      };

      const carSaleId = await this.registerCarSaleUseCase.execute({
        carId,
        customerId,
        salesPersonId,
        negotiatedPriceAmount: price,
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
        status: 200, body: { carSales: sales },
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