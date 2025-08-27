// In a normal business, we can expect differing CustomerID, EmployeeID, ProductID, OrderID, etc.
// But for simplicity, we will use a single UUID class to represent all these IDs.
// (This is a simplification for this practice project.)

import { generateUUID, validateUUID } from "@/shared/uuid";

export class UUIDValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UUIDValidationError";
  }
}

export default class UUID {
  constructor(public readonly value: string) {
    if (!validateUUID(value)) {
      throw new UUIDValidationError("Invalid UUID format");
    }
  }
  static generate(): UUID {
    return new UUID(generateUUID());
  }
  toString(): string {
    return this.value;
  }
  equals(other: UUID): boolean {
    return this.value === other.value;
  }
}