export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly data: {
      name?: string
      email?: string
      password?: string
      role?: 'USER' | 'ADMIN' | 'SUPERADMIN'
    },
  ) {}
}
