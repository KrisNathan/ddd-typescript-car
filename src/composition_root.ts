import db from "@/infrastructure/database";
import CarSaleService from "@domain/services/car_sale_service";
import CarService from "@domain/services/car_service";
import CustomerService from "@domain/services/customer_service";
import { PostgresUnitOfWork } from "@infrastructure/database/unit_of_work";
import CarRepository from "@infrastructure/repositories/car_repository";
import CarSaleRepository from "@infrastructure/repositories/car_sale_repository";
import CustomerRepository from "@infrastructure/repositories/customer_repository";
import SalesPersonRepository from "@infrastructure/repositories/sales_person_repository";
import SalesPersonService from "@domain/services/sales_person_service";
import DefaultCarSaleServiceFactory from "@infrastructure/factories/car_sale_service_factory";

const carRepository = new CarRepository(db);
const customerRepository = new CustomerRepository(db);
const salesPersonRepository = new SalesPersonRepository(db);
const carSaleRepository = new CarSaleRepository(db);

const unitOfWork = new PostgresUnitOfWork(db);

const carSaleServiceFactory = new DefaultCarSaleServiceFactory();
const carService = new CarService(carRepository);
const customerService = new CustomerService(customerRepository);
const salesPersonService = new SalesPersonService(salesPersonRepository);


const compositionRoot = {
  carRepository,
  customerRepository,
  salesPersonRepository,
  carSaleRepository,

  unitOfWork,
  
  carSaleServiceFactory,
  carService,
  customerService,
  salesPersonService,
};

export default compositionRoot;