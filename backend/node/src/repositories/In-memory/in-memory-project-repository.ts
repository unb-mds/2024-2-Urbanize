import { Projeto, FonteDeRecurso } from '@prisma/client'
import { FindProjetosParams, ProjetosRepository } from '../projetoRepository'

export class InMemoryProjectRepository implements ProjetosRepository {
  public items: (Projeto & { fontesDeRecurso: FonteDeRecurso[] })[] = []

  async find(params: FindProjetosParams) {
    const { where } = params
    return this.items.filter((item) => {
      const matchesSituacao =
        !where?.situacao ||
        item.situacao.toLowerCase() === where.situacao.like?.toLowerCase()

      const matchesNatureza =
        !where?.natureza ||
        item.natureza.toLowerCase() === where.natureza.like?.toLowerCase()

      const matchesNome =
        !where?.nome ||
        item.nome.toLowerCase() === where.nome.like?.toLowerCase()

      return matchesSituacao && matchesNatureza && matchesNome
    })
  }

  async findById(id: string) {
    console.log('Buscando projeto com ID:', id)
    const project = this.items.find((item) => item.id === id)

    if (!project) {
      console.log('Projeto não encontrado:', id)
      return null
    }

    return project
  }
}
