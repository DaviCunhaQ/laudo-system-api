export class CreateVehicleCommand {
  constructor(
    public readonly data: {
      id: string
      occurrenceId: string
      plate: string | null
      model: string | null
      color: string | null
    }[],
  ) {}
}
