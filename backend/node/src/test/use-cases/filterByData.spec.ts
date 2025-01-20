/* eslint-disable @typescript-eslint/no-explicit-any */
import { genericData } from '@/repositories/In-memory/data/projectsMemoryData'
import { InMemoryProjectRepository } from '@/repositories/In-memory/in-memory-project-repository'
import { ProjetosService } from '@/use-cases/ProjetosService'
import { beforeEach, describe, expect, it } from 'vitest'

let projectRepository: InMemoryProjectRepository
let projetosService: ProjetosService

describe('Projects services', () => {
  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository()
    projectRepository.items = genericData as any
    projetosService = new ProjetosService(projectRepository)
  })

  it('Should return the correct project for the given parameters', async () => {
    const params = {
      natureza: 'Obra',
      situacao: 'Cadastrada',
      nome: 'REFORMA DE GINÁSIO',
      page: 1,
      pageSize: 10,
    }

    const result = await projetosService.getAllProjetosPaginated(params)

    expect(result.projetos).toHaveLength(1)
    expect(result.projetos[0].nome).toBe('REFORMA DE GINÁSIO')
    expect(result.projetos[0].situacao).toBe('Cadastrada')
    expect(result.projetos[0].natureza).toContain('Obra')
    expect(result.meta.page).toBe(1)
    expect(result.meta.pageSize).toBe(10)
  })

  it('Should return the correct project for one parameters', async () => {
    const params = {
      nome: 'Sistema de Tratamento de esgoto das edificações',
      page: 1,
      pageSize: 1,
    }

    const result = await projetosService.getAllProjetosPaginated(params)

    expect(result.projetos).toHaveLength(1)
    expect(result.projetos[0].nome).toBe(
      'Sistema de Tratamento de esgoto das edificações',
    )
    expect(result.meta.page).toBe(1)
    expect(result.meta.pageSize).toBe(1)
  })

  it('Should return an empty list when no project matches the parameters', async () => {
    const params = {
      natureza: 'Serviço',
      situacao: 'Finalizada',
      nome: 'PROJETO INEXISTENTE',
      page: 1,
      pageSize: 10,
    }

    const result = await projetosService.getAllProjetosPaginated(params)

    expect(result.projetos).toHaveLength(0)
    expect(result.meta.page).toBe(1)
    expect(result.meta.pageSize).toBe(10)
  })

  it('Should paginate the quantity of projects correctly', async () => {
    const params = {
      page: 1,
      pageSize: 10, // Limitar para 1 projeto por página
    }

    const result = await projetosService.getAllProjetosPaginated(params)

    expect(result.projetos).toHaveLength(10)
    expect(result.meta.page).toBe(1)
    expect(result.meta.pageSize).toBe(10)
  })

  it('Should return the correct projects for a different page', async () => {
    const params = {
      page: 2,
      pageSize: 10, // Segunda página com 1 projeto por página
    }

    const result = await projetosService.getAllProjetosPaginated(params)

    expect(result.projetos).toHaveLength(10) // Supondo que exista um projeto correspondente
    expect(result.meta.page).toBe(2)
    expect(result.meta.pageSize).toBe(10)
  })
})
