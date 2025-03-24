export class CreateDriverCommand {
  constructor(
    public readonly data: {
      occurrenceId: string
      vehicleId: string
      name: string | null
      contact: string | null
      isLicensed: boolean | null
    }[],
  ) {}
}
