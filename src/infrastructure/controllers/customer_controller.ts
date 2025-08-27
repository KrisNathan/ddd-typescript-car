import type RegisterCustomerUseCase from "@/application/use_cases/register_customer"
import type { HTTPRequest, HTTPResponse } from "../adapters/http_server"
import z from "zod";
import type ListAllCustomersUseCase from "@application/use_cases/list_all_customers";

const RegisterCustomerSchema = z.object({
  name: z.string().min(1).max(512),
  email: z.string().email(),
});

export default class CustomerController {
  constructor(
    private readonly registerCustomerUseCase: RegisterCustomerUseCase,
    private readonly listAllCustomersUseCase: ListAllCustomersUseCase,
  ) { }

  registerCustomer = async (req: HTTPRequest): Promise<HTTPResponse> => {
    try {
      const parseResult = RegisterCustomerSchema.safeParse(req.body);
      if (!parseResult.success) {
        return {
          status: 400, body: {
            message: "Invalid request body",
            errors: parseResult.error.message,
          },
        }
      }

      const { name, email } = parseResult.data;
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
      const customers = await this.listAllCustomersUseCase.execute();
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