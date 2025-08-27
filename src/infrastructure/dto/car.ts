import type Car from "@domain/entities/car";

export interface CarDTO {
  id: string;
  make: string;
  model: string;
  year: number;
};

export function carToDTO(car: Car): CarDTO {
  return {
    id: car.id.toString(),
    make: car.make,
    model: car.model,
    year: car.year,
  };
}