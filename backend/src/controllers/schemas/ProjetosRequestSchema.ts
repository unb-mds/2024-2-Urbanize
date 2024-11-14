import z from "zod";

export const GetProjetosRequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  nome: z.string().optional(),
  situacao: z.string().optional(),
  sortBy: z.enum(['nome', 'situacao', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
})
