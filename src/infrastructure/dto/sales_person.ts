import type SalesPerson from "@domain/entities/sales_person";

export interface SalesPersonDTO {
  id: string;
  name: string;
  carsSoldCount: number;
};

export function salesPersonToDTO(salesPerson: SalesPerson): SalesPersonDTO {
  return {
    id: salesPerson.id.toString(),
    name: salesPerson.name.toString(),
    carsSoldCount: salesPerson.carsSoldCount,
  };
}