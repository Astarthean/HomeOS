import { validate as validateUuid } from 'uuid';

export class UserId {
  constructor(private readonly value: string) {
    if (!validateUuid(value)) {
      throw new Error(`Invalid UserId: ${value}`);
    }
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }
}
