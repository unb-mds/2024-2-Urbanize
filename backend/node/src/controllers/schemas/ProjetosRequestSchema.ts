import z from "zod";

export const GetProjetosRequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  natureza: z.string().optional(),
  situacao: z.string().optional(),
  nome: z.string().optional(),
  sortBy: z.enum(['situacao', 'nome', 'natureza', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
})
