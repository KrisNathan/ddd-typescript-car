import type CarSaleService from "@domain/services/car_sale_service";
import type IRepositoryProivder from "@application/repository_provider";

export default interface ICarSaleServiceFactory {
  create(provider: IRepositoryProivder): CarSaleService;
}
