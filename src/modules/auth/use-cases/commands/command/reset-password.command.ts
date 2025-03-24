export class ResetUserPasswordCommand {
  constructor(public readonly data: { token: string; password: string }) {}
}
