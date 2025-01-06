import { Projeto } from "@prisma/client";
import { FindProjetosParams, ProjetosRepository } from "../projetoRepository";

export class InMemoryProjectRepository implements ProjetosRepository {
  public items: Projeto[] = [];

  async find(params: FindProjetosParams) {
    const { where } = params;
    return this.items.filter((item) => {
      return (
        (!where?.situacao || item.situacao.toLowerCase() === where.situacao.like.toLowerCase()) &&
        (!where?.natureza || item.natureza.toLowerCase() === where.natureza.like.toLowerCase()) &&
        (!where?.uf || item.uf.toLowerCase() === where.uf.like.toLowerCase())
      );
    });
  }

  async findById(id: string) {
    console.log('Buscando projeto com ID:', id) 
    const project = this.items.find((item) => item.id === id);

    if(!project) {
      console.log('Projeto não encontrado:', id) 
      return null;
    }

    return project;
  }

}