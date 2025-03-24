export class ForgotUserPasswordCommand {
  constructor(public readonly data: { email: string }) {}
}
