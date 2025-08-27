import type Customer from "@domain/entities/customer";

export interface CustomerDTO {
  id: string;
  name: string;
  email: string;
  loyaltyPoints: number;
}

export function customerToDTO(customer: Customer): CustomerDTO {
  return {
    id: customer.id.toString(),
    name: customer.name.toString(),
    email: customer.email.toString(),
    loyaltyPoints: customer.loyaltyPoints,
  };
}