export class PasswordHash {
  constructor(private readonly value: string) {
    if (!value || value.length < 6) {
      throw new Error('Password hash is invalid or too short');
    }
  }

  public getValue(): string {
    return this.value;
  }
}
