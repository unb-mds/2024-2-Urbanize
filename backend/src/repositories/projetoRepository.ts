import { Projeto } from "@prisma/client";

export interface ProjetoWhereParams {
  nome?: {
    like: string;
    equals?: string;
    mode?: "default" | "insensitive"
  }
  situacao?: string;
}

export interface FindProjetosParams {
  where?: ProjetoWhereParams
  sortBy?: "nome" | "situacao" | "createdAt"
  order?: "asc" | "desc"
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
}