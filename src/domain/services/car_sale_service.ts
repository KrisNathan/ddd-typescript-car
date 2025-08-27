import CarSale from "@domain/aggregate/car_sale";
import type UUID from "@domain/values/uuid";
import type Money from "@domain/values/money";
import type { IUnitOfWork } from "@domain/ports/unit_of_work";
import type ICarSaleRepository from "../repositories/car_sale_repository";
import type ICarRepository from "../repositories/car_repository";
import type ICustomerRepository from "../repositories/customer_repository";
import type ISalesPersonRepository from "../repositories/sales_person_repository";

export interface PurchaseCarParams {
  salesPersonId: UUID;
  customerId: UUID;
  carId: UUID;
  negotiatedPrice: Money;
};

export default class CarSaleService {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly salesPersonRepository: ISalesPersonRepository,
    private readonly customerRepository: ICustomerRepository,
    private readonly carRepository: ICarRepository,
    private readonly carSaleRepository: ICarSaleRepository
  ) { }

  async purchaseCar({ salesPersonId, customerId, carId, negotiatedPrice }: PurchaseCarParams): Promise<UUID> {
    return await this.unitOfWork.withTransaction(async (tx) => {
      // Validate entities exist
      const salesPerson = await this.salesPersonRepository.getSalesPersonById(salesPersonId, tx);
      if (!salesPerson) {
        throw new Error("Salesperson not found");
      }

      const customer = await this.customerRepository.getCustomerById(customerId, tx);
      if (!customer) {
        throw new Error("Customer not found");
      }

      const car = await this.carRepository.getCarById(carId, tx);
      if (!car) {
        throw new Error("Car not found");
      }

      // Business rules
      salesPerson.incrementCarsSoldCount();
      await this.salesPersonRepository.updateSalesPerson(salesPerson, tx);

      customer.addLoyaltyPoints(Math.round(negotiatedPrice.amount / 1000));
      await this.customerRepository.updateCustomer(customer, tx);

      const carSale = CarSale.new(salesPersonId, customerId, carId, negotiatedPrice);
      return await this.carSaleRepository.recordSale(carSale, tx);
    });
  }

  async listAllSales(): Promise<CarSale[]> {
    return this.carSaleRepository.getAllSales();
  }
}