export class CreateUserCommand {
  constructor(
    public readonly data: {
      name: string
      email: string
      password: string
      role: 'USER' | 'ADMIN' | 'SUPERADMIN'
    },
  ) {}
}
