export class ListUsersQuery {
  constructor(
    public readonly page: number,
    public readonly perPage: number,
  ) {}
}
