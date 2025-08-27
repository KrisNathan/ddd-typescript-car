export class EmailInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailInvalidError";
  }
}

export default class Email {
  constructor(public readonly value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value))
      throw new EmailInvalidError("Invalid email format");
  }
  toString(): string {
    return this.value;
  }
}