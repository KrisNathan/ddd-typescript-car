import type CarSale from "@domain/aggregate/car_sale";
import type CarSaleService from "@domain/services/car_sale_service";

export default class ListAllCarSalesUseCase {
  constructor(private readonly carSaleService: CarSaleService) {}

  async execute(): Promise<CarSale[]> {
    const sales = await this.carSaleService.listAllSales();
    return sales;
  }
}