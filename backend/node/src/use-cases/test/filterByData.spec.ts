import { InMemoryProjectRepository } from '@/repositories/In-memory/in-memory-project-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ProjetosService } from '../ProjetosService'
import { genericData } from '@/repositories/In-memory/data/projectsMemoryData'

let projectRepository: InMemoryProjectRepository
let projetosService: ProjetosService

describe('Projects services', () => {
  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    projectRepository.items = genericData as any
    projetosService = new ProjetosService(projectRepository)
  })

  it('Should be able to search the projects by their data', async () => {
    const params = {
      natureza: 'Outros',
      situacao: 'Cadastrada',
      uf: 'DF',
      page: 1,
      pageSize: 10,
    }

    const result = await projetosService.getAllProjetosPaginated(params)

    // Validações
    expect(result.projetos).toHaveLength(1) // Deve retornar apenas 1 projeto
    expect(result.projetos[0].nome).toContain('DL - 304/2024')
    expect(result.projetos[0].situacao).toBe('Cadastrada')
    expect(result.projetos[0].uf).toBe('DF')
    expect(result.meta.page).toBe(1)
    expect(result.meta.pageSize).toBe(10)
  })
})