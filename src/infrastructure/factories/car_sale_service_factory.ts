import CarSaleService from "@domain/services/car_sale_service";
import type IRepositoryProivder from "@application/repository_provider";
import type ICarSaleServiceFactory from "@application/factories/car_sale_service_factory";

export default class DefaultCarSaleServiceFactory implements ICarSaleServiceFactory {
  create(provider: IRepositoryProivder): CarSaleService {
    return new CarSaleService(
      provider.salesPersonRepository,
      provider.customerRepository,
      provider.carRepository,
      provider.carSaleRepository,
    );
  }
}
