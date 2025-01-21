import { ProjetosController } from '@/controllers/ProjetosController'
import { PrismaProjetosRepository } from '@/repositories/prisma/PrismaProjetosRepository'
import { ProjetosService } from '@/use-cases/ProjetosService'

// Repositories
export const projetosRepository = new PrismaProjetosRepository()

// Use-Cases
export const projetosService = new ProjetosService(projetosRepository)

// Controllers
export const projetosController = new ProjetosController(projetosService)
