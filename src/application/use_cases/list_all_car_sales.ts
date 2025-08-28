import type CarSale from "@domain/aggregate/car_sale";
import type CarSaleService from "@domain/services/car_sale_service";
import type ICarSaleServiceFactory from "@application/factories/car_sale_service_factory";
import type { IUnitOfWork } from "@application/unit_of_work";

export default class ListAllCarSalesUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly carSaleServiceFactory: ICarSaleServiceFactory,
  ) {}

  async execute(): Promise<CarSale[]> {
    return await this.unitOfWork.withTransaction(async ({ repositoryProvider }) => {
      const carSaleService: CarSaleService = this.carSaleServiceFactory.create(repositoryProvider);
      return carSaleService.listAllSales();
    });
  }
}