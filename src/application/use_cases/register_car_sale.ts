import type { IUnitOfWork } from "@application/unit_of_work";
import CarSaleService from "@domain/services/car_sale_service";
import Money from "@domain/values/money";
import UUID from "@domain/values/uuid";
import type ICarSaleServiceFactory from "@application/factories/car_sale_service_factory";

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
    private readonly carSaleServiceFactory: ICarSaleServiceFactory,
  ) { }
  async execute({ customerId, salesPersonId, carId, negotiatedPriceAmount, negotiatedPriceCurrency }: RegisterCarSaleUseCaseParams): Promise<UUID> {
    return await this.unitOfWork.withTransaction(async ({ repositoryProvider }) => {
      // Business logic to purchase a car
      const carSaleService: CarSaleService = this.carSaleServiceFactory.create(repositoryProvider);
      return await carSaleService.purchaseCar({
        salesPersonId: new UUID(salesPersonId),
        customerId: new UUID(customerId),
        carId: new UUID(carId),
        negotiatedPrice: new Money(negotiatedPriceAmount, negotiatedPriceCurrency),
      });
    });
  }
}