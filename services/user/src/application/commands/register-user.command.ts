export class RegisterUserCommand {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly passwordPlain: string,
  ) {}
}
