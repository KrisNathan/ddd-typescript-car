import RegisterCarSaleUseCase from "@application/use_cases/register_car_sale";
import HTTPServerAdapter from "@infrastructure/adapters/http_server";
import CarSaleController from "@infrastructure/controllers/car_sale_controller";
import compositionRoot from "@/compositionRoot";
import CustomerController from "@infrastructure/controllers/customer_controller";
import RegisterCustomerUseCase from "@application/use_cases/register_customer";
import RegisterSalesPersonUseCase from "@application/use_cases/register_sales_person";
import SalesPersonController from "@infrastructure/controllers/sales_person_controller";
import RegisterCarUseCase from "@application/use_cases/register_car";
import CarController from "@infrastructure/controllers/car_controller";
import ListAllCarSalesUseCase from "@application/use_cases/list_all_car_sales";
import ListAllCarsUseCase from "@application/use_cases/list_all_cars";
import ListAllCustomersUseCase from "@application/use_cases/list_all_customers";
import ListAllSalesPersonsUseCase from "@application/use_cases/list_all_sales_persons";

export default class APIRoutes {
  constructor(private server: HTTPServerAdapter) { }

  setup() {
    const registerCarSaleUseCase = new RegisterCarSaleUseCase(compositionRoot.unitOfWork, compositionRoot.carSaleService);
    const listAllCarSalesUseCase = new ListAllCarSalesUseCase(compositionRoot.carSaleService);
    const carSaleController = new CarSaleController(registerCarSaleUseCase, listAllCarSalesUseCase);
    this.server.post("/api/car-sales", (req) => carSaleController.registerCarSale(req));
    this.server.get("/api/car-sales", (req) => carSaleController.listAllCarSale(req));

    const registerCustomerUseCase = new RegisterCustomerUseCase(compositionRoot.customerService);
    const listAllCustomersUseCase = new ListAllCustomersUseCase(compositionRoot.customerService);
    const customerController = new CustomerController(registerCustomerUseCase, listAllCustomersUseCase);
    this.server.post("/api/customers", (req) => customerController.registerCustomer(req));
    this.server.get("/api/customers", (req) => customerController.listAllCustomers(req));

    const registerSalesPersonUseCase = new RegisterSalesPersonUseCase(compositionRoot.salesPersonService);
    const listAllSalesPersonsUseCase = new ListAllSalesPersonsUseCase(compositionRoot.salesPersonService);
    const salesPersonController = new SalesPersonController(registerSalesPersonUseCase, listAllSalesPersonsUseCase);
    this.server.post("/api/sales-persons", (req) => salesPersonController.registerSalesPerson(req));
    this.server.get("/api/sales-persons", (req) => salesPersonController.listAllSalesPersons(req));

    const registerCarUseCase = new RegisterCarUseCase(compositionRoot.carService);
    const listAllCarsUseCase = new ListAllCarsUseCase(compositionRoot.carService);
    const carController = new CarController(registerCarUseCase, listAllCarsUseCase);
    this.server.post("/api/cars", (req) => carController.registerCar(req));
    this.server.get("/api/cars", (req) => carController.listAllCars(req));

    
    this.server.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  }
}