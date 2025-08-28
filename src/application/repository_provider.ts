import type ICarRepository from "@domain/repositories/car_repository";
import type ICarSaleRepository from "@domain/repositories/car_sale_repository";
import type ICustomerRepository from "@domain/repositories/customer_repository";
import type ISalesPersonRepository from "@domain/repositories/sales_person_repository";

export default interface IRepositoryProivder {
  customerRepository: ICustomerRepository;
  salesPersonRepository: ISalesPersonRepository;
  carRepository: ICarRepository;
  carSaleRepository: ICarSaleRepository;
}