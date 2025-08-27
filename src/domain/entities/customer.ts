import Email from "../values/email.js";
import PeopleName from "../values/people_name.js";
import UUID from "../values/uuid.js";

interface CustomerProps {
  id: UUID;
  name: PeopleName;
  email: Email;
  loyaltyPoints: number;
}

export default class Customer {
  public readonly name: PeopleName;
  public readonly email: Email;
  public readonly id: UUID;
  public loyaltyPoints: number;

  constructor({ name, email, id: customerId, loyaltyPoints }: CustomerProps) {
    this.name = name;
    this.email = email;
    this.id = customerId;
    this.loyaltyPoints = loyaltyPoints;
  }

  static new(data: { name: string; email: string; }) {
    return new Customer({
      id: UUID.generate(),
      name: new PeopleName(data.name),
      email: new Email(data.email),
      loyaltyPoints: 0
    });
  }
  addLoyaltyPoints(points: number): void {
    this.loyaltyPoints += points;
  }
}