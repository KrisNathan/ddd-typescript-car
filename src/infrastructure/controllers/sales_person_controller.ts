import type ListAllSalesPersonsUseCase from "@application/use_cases/list_all_sales_persons";
import type { HTTPRequest, HTTPResponse } from "../adapters/http_server";
import type RegisterSalesPersonUseCase from "@application/use_cases/register_sales_person";

export default class SalesPersonController {
  constructor(
    private readonly registerSalesPersonUseCase: RegisterSalesPersonUseCase,
    private readonly listAllSalesPersonUseCase: ListAllSalesPersonsUseCase,
  ) { }

  registerSalesPerson = async (req: HTTPRequest): Promise<HTTPResponse> => {
    try {
      const { name } = req.body as { name: string; email: string };
      
      const salesPersonId= await this.registerSalesPersonUseCase.execute(name);

      return {
        status: 200, body: {
          message: "Sales person created successfully",
          salesPersonId: salesPersonId.toString(),
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

  listAllSalesPersons = async (_req: HTTPRequest): Promise<HTTPResponse> => {
    try {
      const salesPersons = await this.listAllSalesPersonUseCase.execute();
      return {
        status: 200, body: { salesPersons },
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