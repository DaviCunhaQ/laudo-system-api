type Status = 'ABERTO' | 'EM_PROGRESSO' | 'ENCERRADO'

type TrafficImpact =
  | 'BLOQUEIO_PARCIAL'
  | 'BLOQUEIO_TOTAL'
  | 'BLOQUEIO_PARCIAL'
  | 'CONGESTIONAMENTO_INTENSO'
  | 'CONGESTIONAMENTO_LEVE'
  | 'CONGESTIONAMENTO_MODERADO'
  | 'DESVIO_NECESSARIO'
  | 'SEM_IMPACTO'
  | 'TRANSITO_LENTO'

export class CreateOccurrenceCommand {
  constructor(
    public readonly data: {
      id: string
      category: string
      subcategory: string | null
      description: string
      comments: string
      details: string
      accompaniment: string
      status: Status
      materialDamage: string
      trafficImpact: TrafficImpact
      registeredAt: string
    },
  ) {}
}
