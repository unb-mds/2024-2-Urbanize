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
      uf: {
        contains: params.where?.uf?.like,
        equals: params.where?.uf?.equals,
        mode: params.where?.uf?.mode
      },
    }

    const projetos = await prisma.projeto.findMany({
      where,
      orderBy: { [params.sortBy ?? "uf"]: params.order},
      skip: params.offset,
      take: params.limit,
      include: {
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
        eixos: true,
        tipos: true,
        geometrias: true,
        fontesDeRecurso: true
      }
    })
  }
}