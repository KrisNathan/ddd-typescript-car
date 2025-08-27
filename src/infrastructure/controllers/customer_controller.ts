import type RegisterCustomerUseCase from "@/application/use_cases/register_customer"
import type { HTTPRequest, HTTPResponse } from "../adapters/http_server"
import type ListAllCustomersUseCase from "@application/use_cases/list_all_customers";
import { customerToDTO } from "@infrastructure/dto/customer";

export default class CustomerController {
  constructor(
    private readonly registerCustomerUseCase: RegisterCustomerUseCase,
    private readonly listAllCustomersUseCase: ListAllCustomersUseCase,
  ) { }

  registerCustomer = async (req: HTTPRequest): Promise<HTTPResponse> => {
    try {
      const { name, email } = req.body as { name: string; email: string };
      
      const customerId = await this.registerCustomerUseCase.execute(name, email);

      return {
        status: 200, body: {
          message: "Customer created successfully",
          customerId: customerId.toString(),
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

  listAllCustomers = async (_req: HTTPRequest): Promise<HTTPResponse> => {
    try {
      const customers = (await this.listAllCustomersUseCase.execute()).map(customer => customerToDTO(customer));

      return {
        status: 200, body: { customers },
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