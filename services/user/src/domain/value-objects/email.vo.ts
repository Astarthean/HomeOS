export class Email {
  constructor(private readonly value: string) {
    if (!this.validateEmail(this.value)) {
      throw new Error('Invalid email');
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }
}
