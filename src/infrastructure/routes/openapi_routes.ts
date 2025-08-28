import RegisterCarSaleUseCase from "@application/use_cases/register_car_sale.js";
import HTTPServerAdapter from "@infrastructure/adapters/http_server.js";
import CarSaleController from "@infrastructure/controllers/car_sale_controller.js";
import compositionRoot from "@/composition_root";
import CustomerController from "@infrastructure/controllers/customer_controller.js";
import RegisterCustomerUseCase from "@application/use_cases/register_customer.js";
import RegisterSalesPersonUseCase from "@application/use_cases/register_sales_person.js";
import SalesPersonController from "@infrastructure/controllers/sales_person_controller.js";
import RegisterCarUseCase from "@application/use_cases/register_car.js";
import CarController from "@infrastructure/controllers/car_controller.js";
import ListAllCarSalesUseCase from "@application/use_cases/list_all_car_sales.js";
import ListAllCarsUseCase from "@application/use_cases/list_all_cars.js";
import ListAllCustomersUseCase from "@application/use_cases/list_all_customers.js";
import ListAllSalesPersonsUseCase from "@application/use_cases/list_all_sales_persons.js";

// OpenAPI routes
import { registerCustomerRoute, listCustomersRoute } from "@infrastructure/openapi_routes/customer_routes.js";
import { registerCarRoute, listCarsRoute } from "@infrastructure/openapi_routes/car_routes.js";
import { registerSalesPersonRoute, listSalesPersonsRoute } from "@infrastructure/openapi_routes/sales_person_routes.js";
import { registerCarSaleRoute, listCarSalesRoute } from "@infrastructure/openapi_routes/car_sale_routes.js";

export default class OpenAPIRoutes {
  constructor(private server: HTTPServerAdapter) { }

  setup() {
    const app = this.server.getApp();

    // Customer routes
    const registerCustomerUseCase = new RegisterCustomerUseCase(compositionRoot.customerService);
    const listAllCustomersUseCase = new ListAllCustomersUseCase(compositionRoot.customerService);
    const customerController = new CustomerController(registerCustomerUseCase, listAllCustomersUseCase);

    app.openapi(registerCustomerRoute, async (c) => {
      const body = c.req.valid('json');
      const req = {
        method: 'POST',
        path: '/api/customers',
        headers: {},
        query: {},
        params: {},
        body,
      };
      
      const response = await customerController.registerCustomer(req);
      if (response.status === 200) {
        return c.json(response.body, 200);
      } else {
        return c.json(response.body, 500);
      }
    });

    app.openapi(listCustomersRoute, async (c) => {
      const req = {
        method: 'GET',
        path: '/api/customers',
        headers: {},
        query: {},
        params: {},
      };
      
      const response = await customerController.listAllCustomers(req);
      if (response.status === 200) {
        return c.json(response.body, 200);
      } else {
        return c.json(response.body, 500);
      }
    });

    // Car routes
    const registerCarUseCase = new RegisterCarUseCase(compositionRoot.carService);
    const listAllCarsUseCase = new ListAllCarsUseCase(compositionRoot.carService);
    const carController = new CarController(registerCarUseCase, listAllCarsUseCase);

    app.openapi(registerCarRoute, async (c) => {
      const body = c.req.valid('json');
      const req = {
        method: 'POST',
        path: '/api/cars',
        headers: {},
        query: {},
        params: {},
        body,
      };
      
      const response = await carController.registerCar(req);
      if (response.status === 200) {
        return c.json(response.body, 200);
      } else {
        return c.json(response.body, 500);
      }
    });

    app.openapi(listCarsRoute, async (c) => {
      const req = {
        method: 'GET',
        path: '/api/cars',
        headers: {},
        query: {},
        params: {},
      };
      
      const response = await carController.listAllCars(req);
      if (response.status === 200) {
        return c.json(response.body, 200);
      } else {
        return c.json(response.body, 500);
      }
    });

    // Sales Person routes
    const registerSalesPersonUseCase = new RegisterSalesPersonUseCase(compositionRoot.salesPersonService);
    const listAllSalesPersonsUseCase = new ListAllSalesPersonsUseCase(compositionRoot.salesPersonService);
    const salesPersonController = new SalesPersonController(registerSalesPersonUseCase, listAllSalesPersonsUseCase);

    app.openapi(registerSalesPersonRoute, async (c) => {
      const body = c.req.valid('json');
      const req = {
        method: 'POST',
        path: '/api/sales-persons',
        headers: {},
        query: {},
        params: {},
        body,
      };
      
      const response = await salesPersonController.registerSalesPerson(req);
      if (response.status === 200) {
        return c.json(response.body, 200);
      } else {
        return c.json(response.body, 500);
      }
    });

    app.openapi(listSalesPersonsRoute, async (c) => {
      const req = {
        method: 'GET',
        path: '/api/sales-persons',
        headers: {},
        query: {},
        params: {},
      };
      
      const response = await salesPersonController.listAllSalesPersons(req);
      if (response.status === 200) {
        return c.json(response.body, 200);
      } else {
        return c.json(response.body, 500);
      }
    });

    // Car Sale routes
    const registerCarSaleUseCase = new RegisterCarSaleUseCase(
      compositionRoot.unitOfWork,
      compositionRoot.carSaleServiceFactory,
    );
    const listAllCarSalesUseCase = new ListAllCarSalesUseCase(
      compositionRoot.unitOfWork,
      compositionRoot.carSaleServiceFactory,
    );
    const carSaleController = new CarSaleController(registerCarSaleUseCase, listAllCarSalesUseCase);

    app.openapi(registerCarSaleRoute, async (c) => {
      const body = c.req.valid('json');
      const req = {
        method: 'POST',
        path: '/api/car-sales',
        headers: {},
        query: {},
        params: {},
        body,
      };
      
      const response = await carSaleController.registerCarSale(req);
      if (response.status === 200) {
        return c.json(response.body, 200);
      } else {
        return c.json(response.body, 500);
      }
    });

    app.openapi(listCarSalesRoute, async (c) => {
      const req = {
        method: 'GET',
        path: '/api/car-sales',
        headers: {},
        query: {},
        params: {},
      };
      
      const response = await carSaleController.listAllCarSale(req);
      if (response.status === 200) {
        return c.json(response.body, 200);
      } else {
        return c.json(response.body, 500);
      }
    });

    this.server.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
      console.log("OpenAPI documentation available at http://localhost:3000/doc");
      console.log("Swagger UI available at http://localhost:3000/ui");
    });
  }
}
