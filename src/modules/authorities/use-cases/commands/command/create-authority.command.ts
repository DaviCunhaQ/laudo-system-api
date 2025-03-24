export class CreateAuthorityCommand {
  constructor(
    public readonly data: {
      occurrenceId: string
      name: string | null
      serviceTime: string | null
      providences: string | null
    }[],
  ) {}
}
