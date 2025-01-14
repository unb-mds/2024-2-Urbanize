import { Projeto, Prisma } from "@prisma/client";
import { FindProjetosParams, ProjetosRepository, ProjetoWhereParams } from "../projetoRepository";
import { prisma } from "@/database";

export class PrismaProjetosRepository implements ProjetosRepository {
  async find (params: FindProjetosParams): Promise<Projeto[]> {
    let where: Prisma.ProjetoWhereInput = {
      situacao: {
        contains: params.where?.situacao?.like,
        equals: params.where?.situacao?.equals,
        mode: params.where?.situacao?.mode
      },
      nome: {
        contains: params.where?.nome?.like,
        equals: params.where?.nome?.equals,
        mode: params.where?.nome?.mode
      },
      natureza: {
        contains: params.where?.natureza?.like,
        equals: params.where?.natureza?.equals,
        mode: params.where?.natureza?.mode
      },
    }

    const projetos = await prisma.projeto.findMany({
      where,
      orderBy: { [params.sortBy ?? "nome"]: params.order},
      skip: params.offset,
      take: params.limit,
      include: {
        executores: true,
        repassadores: true,
        tomadores: true,
        eixos: true,
        tipos: true,
        geometrias: true,
        fontesDeRecurso: true
      }
    })

    return projetos || []
  }

  async findById (id: string): Promise<Projeto | null> {
    return prisma.projeto.findUnique({
      where: { id },
      include: {
        executores: true,
        repassadores: true,
        tomadores: true,
        eixos: true,
        tipos: true,
        geometrias: true,
        fontesDeRecurso: true
      }
    })
  }
}