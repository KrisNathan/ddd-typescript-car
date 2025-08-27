import UUID from "../values/uuid";

interface CarProps {
  id: UUID;
  make: string;
  model: string;
  year: number;
}

export default class Car {
  // I'm sure theres a lot more attributes a car would have
  // This is just a simplification for this practice project
  public readonly id: UUID;
  public readonly make: string;
  public readonly model: string;
  public readonly year: number;
  constructor(props: CarProps) {
    this.id = props.id;
    this.make = props.make;
    this.model = props.model;
    this.year = props.year;
  }
  static new(data: { make: string, model: string, year: number }): Car {
    return new Car({
      id: UUID.generate(),
      make: data.make,
      model: data.model,
      year: data.year,
    });
  }
}