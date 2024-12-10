import { ProjetosService } from "@/use-cases/ProjetosService";
import { Handler } from "express";
import { GetProjetosRequestSchema } from "./schemas/ProjetosRequestSchema";

export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  index: Handler = async (req, res, next) => {
    try {
      const query = GetProjetosRequestSchema.parse(req.query)
      const { page = "1", pageSize = "10"} = query

      const result = await this.projetosService.getAllProjetosPaginated({
        ...query,
        page: +page,
        pageSize: +pageSize,
      })

      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  show: Handler = async (req, res, next) => {
    try {
      const projeto = await this.projetosService.getProjetoById(req.params.id)

      res.json(projeto)
    } catch (error) {
      next(error)
    }
  }
}