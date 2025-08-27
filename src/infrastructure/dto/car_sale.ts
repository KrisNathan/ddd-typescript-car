import type CarSale from "@domain/aggregate/car_sale";

export interface CarSaleDTO {
  id: string;
  salesPersonId: string;
  customerId: string;
  carId: string;
  transactionDate: string; // ISO string
  negotiatedPrice: {
    amount: number;
    currency: string;
  };
}

export function carSaleToDTO(carSale: CarSale): CarSaleDTO {
  return {
    id: carSale.id.toString(),
    salesPersonId: carSale.salesPersonId.toString(),
    customerId: carSale.customerId.toString(),
    carId: carSale.carId.toString(),
    transactionDate: carSale.transactionDate.toISOString(),
    negotiatedPrice: {
      amount: carSale.negotiatedPrice.amount,
      currency: carSale.negotiatedPrice.currency,
    },
  };
}