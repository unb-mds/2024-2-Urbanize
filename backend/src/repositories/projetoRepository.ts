import { Projeto } from "@prisma/client";

export interface ProjetoWhereParams {
  situacao?: {
    like: string;
    equals?: string;
    mode?: "default" | "insensitive"
  }
  uf?: {
    like: string;
    equals?: string;
    mode?: "default" | "insensitive"
  }
}

export interface FindProjetosParams {
  where?: ProjetoWhereParams
  sortBy?: "situacao" | "uf" | "createdAt" 
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