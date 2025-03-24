export class UpdateDriverCommand {
  constructor(
    public readonly id: string,
    public readonly data: {
      name?: string | null
      contact?: string | null
      isLicensed?: boolean | null
    },
  ) {}
}
