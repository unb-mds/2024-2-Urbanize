import { ProjetosRepository, ProjetoWhereParams } from "@/repositories/projetoRepository";

interface GetProjetosWithPaginationParams {
	page?: number
	pageSize?: number
	nome?: string
	situacao?: string
	sortBy?: "nome" | "situacao" | "createdAt"
	order?: "asc" | "desc"
}

export class ProjetosService {
  constructor(private readonly projetosRepository: ProjetosRepository) {}

  async getAllProjetosPaginated(params: GetProjetosWithPaginationParams) {
    const { nome, situacao, page = 1, pageSize = 10, sortBy, order } = params

    const limit = pageSize
    const offset = (page - 1) * limit

    const where: ProjetoWhereParams = {}

    if (nome) where.nome = { like: nome, mode: 'insensitive' }
    if (situacao) where.situacao = situacao

    const projetos = await this.projetosRepository.find({
      where,
      sortBy,
      order,
      limit,
      offset,
    })

    return {
      projetos,
      meta: {
        page: Number(page),
        pageSize: limit,
      }
    }
  }
}