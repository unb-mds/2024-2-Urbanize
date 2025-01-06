import { beforeEach, describe, expect, it } from 'vitest'
import { ProjetosService } from '../ProjetosService'
import { InMemoryProjectRepository } from '@/repositories/In-memory/in-memory-project-repository'
import { HttpError } from '@/error/HttpError'

// Dados fictícios para simular os projetos
const mockProjetosData = [
  {
    id: '50379.53-54',
    nome: 'DL - 304/2024 - Projeto Exemplo',
    situacao: 'Ativo',
    natureza: 'Construção',
    uf: 'SP'
  },
  // Adicione mais projetos de exemplo conforme necessário
]

let projectRepository: InMemoryProjectRepository
let projetosService: ProjetosService

describe('ProjetosService - getProjetoById', () => {
  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    projectRepository.items = mockProjetosData as any
    projetosService = new ProjetosService(projectRepository)
  })

  it('Should be able to get project by ID', async () => {
    const projeto1 = '50379.53-54'

    const projeto = await projetosService.getProjetoById(projeto1)

    // Verifica se o projeto retornado tem o ID esperado
    expect(projeto.id).toBe(projeto1)
    expect(projeto.nome).toContain('DL - 304/2024')
  })

  it('Should throw 404 if the project is not found', async () => {
    const projetoId = 'INEXISTENTE-123'

    await expect(projetosService.getProjetoById(projetoId)).rejects.toThrowError(
      new HttpError(404, 'Projeto não encontrado!')
    )
    
  })
})
