import { Projeto, Prisma } from "@prisma/client";
import { FindProjetosParams, ProjetosRepository } from "../projetoRepository";
import { prisma } from "@/database";

export class PrismaProjetosRepository implements ProjetosRepository {
  async find (params: FindProjetosParams): Promise<Projeto[]> {
    let where: Prisma.ProjetoWhereInput = {
      nome: {
        contains: params.where?.nome?.like,
        equals: params.where?.nome?.equals,
        mode: params.where?.nome?.mode
      },
      situacao: params.where?.situacao,
    }

    const projetos = await prisma.projeto.findMany({
      where,
      orderBy: { [params.sortBy ?? "nome"]: params.order},
      skip: params.offset,
      take: params.limit,
      include: {
        eixos: params.include?.eixos,
        executores: params.include?.executores,
        repassadores: params.include?.repassadores,
        tomadores: params.include?.tomadores,
        tipos: params.include?.tipos,
        geometrias: params.include?.geometrias,
        fontesDeRecurso: params.include?.fontesDeRecurso
      }
    })

    return projetos || []
  }
}