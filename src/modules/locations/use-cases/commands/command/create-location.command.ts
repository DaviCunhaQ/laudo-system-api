export class CreateLocationCommand {
  constructor(
    public readonly data: {
      occurrenceId: string
      street: string
      number: string | null
      neighborhood: string | null
      city: string
      state: string
      geolocation: string
      reference: string | null
    },
  ) {}
}
