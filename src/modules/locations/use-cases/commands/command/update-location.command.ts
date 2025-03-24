export class UpdateLocationCommand {
  constructor(
    public readonly id: string,
    public readonly data: {
      street?: string
      number?: string | null
      neighborhood?: string | null
      city?: string
      state?: string
      geolocation?: string
      reference?: string | null
    },
  ) {}
}
