import type { IUnitOfWork } from "@domain/ports/unit_of_work";
import type ICarRepository from "@domain/repositories/car_repository";
import type ICarSaleRepository from "@domain/repositories/car_sale_repository";
import type ICustomerRepository from "@domain/repositories/customer_repository";
import type ISalesPersonRepository from "@domain/repositories/sales_person_repository";
import CarSaleService from "@domain/services/car_sale_service";
import Money from "@domain/values/money";
import UUID from "@domain/values/uuid";

export interface RegisterCarSaleUseCaseParams {
  customerId: string;
  salesPersonId: string;
  carId: string;
  negotiatedPriceAmount: number;
  negotiatedPriceCurrency: string;
};

export default class RegisterCarSaleUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly carSaleService: CarSaleService,
  ) { }
  async execute({ customerId, salesPersonId, carId, negotiatedPriceAmount, negotiatedPriceCurrency }: RegisterCarSaleUseCaseParams): Promise<UUID> {
    // Business logic to purchase a car
    return await this.carSaleService.purchaseCar({
      salesPersonId: new UUID(salesPersonId),
      customerId: new UUID(customerId),
      carId: new UUID(carId),
      negotiatedPrice: new Money(negotiatedPriceAmount, negotiatedPriceCurrency),
    });
  }
}