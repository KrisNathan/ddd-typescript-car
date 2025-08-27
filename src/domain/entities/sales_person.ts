import PeopleName from "../values/people_name";
import UUID from "../values/uuid";

interface SalesPersonProps {
  id: UUID;
  name: PeopleName;
  carsSoldCount: number;
}

export default class SalesPerson {
  public readonly id: UUID;
  public readonly name: PeopleName;
  public carsSoldCount: number;

  constructor(props: SalesPersonProps) {
    this.id = props.id;
    this.name = props.name;
    this.carsSoldCount = props.carsSoldCount;
  }

  static new(name: string) {
    return new SalesPerson({
      id: UUID.generate(),
      name: new PeopleName(name),
      carsSoldCount: 0
    });
  }

  incrementCarsSoldCount(): void {
    this.carsSoldCount += 1;
  }
}