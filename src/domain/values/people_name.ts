export default class PeopleName {
  constructor(public readonly value: string) {
    if (this.value.length === 0 || this.value.length > 512) {
      throw new Error("Name must be between 1 and 512 characters");
    }
  }
  toString(): string {
    return this.value;
  }
}