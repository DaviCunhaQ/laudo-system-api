export class CreateParticipantCommand {
  constructor(
    public readonly data: {
      occurrenceId: string
      name: string | null
      contact: string | null
      description: string | null
      status: 'FERIDO' | 'OBITO' | 'SEM_FERIMENTOS' | null
      participation: 'PASSAGEIRO' | 'PEDESTRE' | 'TESTEMUNHA' | null
    }[],
  ) {}
}
