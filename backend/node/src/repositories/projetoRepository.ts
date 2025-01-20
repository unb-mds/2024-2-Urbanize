import { Projeto } from '@prisma/client'

export interface ProjetoWhereParams {
  situacao?: {
    like: string
    equals?: string
    mode?: 'default' | 'insensitive'
  }
  nome?: {
    like: string
    equals?: string
    mode?: 'default' | 'insensitive'
  }
  natureza?: {
    like: string
    equals?: string
    mode?: 'default' | 'insensitive'
  }
}

export interface FindProjetosParams {
  where?: ProjetoWhereParams
  sortBy?: 'natureza' | 'situacao' | 'nome' | 'createdAt'
  order?: 'asc' | 'desc'
  limit?: number
  offset?: number
  include?: {
    eixos?: boolean
    tipos?: boolean
    executores?: boolean
    repassadores?: boolean
    tomadores?: boolean
    geometrias?: boolean
    fontesDeRecurso?: boolean
  }
}

export interface ProjetosRepository {
  find: (params: FindProjetosParams) => Promise<Projeto[]>
  findById: (id: string) => Promise<Projeto | null>
}
