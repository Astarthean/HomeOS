import { v4 as uuidv4, validate as validateUuid } from 'uuid';

export class UserId {
  static generate(): UserId {
    return new UserId(uuidv4());
  }
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
