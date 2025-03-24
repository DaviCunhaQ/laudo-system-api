export class UpdateVehicleCommand {
  constructor(
    public readonly id: string,
    public readonly data: {
      plate?: string | null
      model?: string | null
      color?: string | null
    },
  ) {}
}
