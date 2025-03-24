export class LoginUserCommand {
  constructor(public readonly data: { email: string; password: string }) {}
}
