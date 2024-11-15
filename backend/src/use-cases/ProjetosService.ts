import { HttpError } from "@/error/HttpError";
import { ProjetosRepository, ProjetoWhereParams } from "@/repositories/projetoRepository";

interface GetProjetosWithPaginationParams {
	page?: number
	pageSize?: number
	situacao?: string
  uf?: string
	sortBy?: "situacao" | "uf" | "createdAt"
	order?: "asc" | "desc"
}

export class ProjetosService {
  constructor(private readonly projetosRepository: ProjetosRepository) {}

  async getAllProjetosPaginated(params: GetProjetosWithPaginationParams) {
    const { situacao, uf, page = 1, pageSize = 10, sortBy, order } = params

    const limit = pageSize
    const offset = (page - 1) * limit

    const where: ProjetoWhereParams = {}

    if (situacao) where.situacao = { like: situacao, mode: 'insensitive' }
    if (uf) where.uf = { like: uf, mode: 'insensitive' }
  
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

  async getProjetoById(id: string) {
    const projeto = await this.projetosRepository.findById(id)

    if (!projeto) {
      throw new HttpError(404, 'Projeto não encontrado!')
    }

    return projeto
  }
}