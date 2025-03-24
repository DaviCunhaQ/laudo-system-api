export class UpdateAuthorityCommand {
  constructor(
    public readonly id: string,
    public readonly data: {
      name?: string | null
      serviceTime?: string | null
      providences?: string | null
    },
  ) {}
}
