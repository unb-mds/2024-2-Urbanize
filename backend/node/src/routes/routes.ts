import { projetosController } from "@/container/container";
import { Router } from "express";

const router = Router()

/**
 * @swagger
 * /api/projeto-investimento:
 *   get:
 *     tags: [Projeto De Investimento]         
 *     summary: Consulta Projetos de Investimento
 *     description: Retorna uma Lista Paginada com os dados de identificação da Obra com base nos filtros utilizados. Filtros não obrigatórios.
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         required: false
 *         description: Nome do Projeto
 *       - in: query
 *         name: natureza
 *         schema:
 *           type: string
 *         required: false
 *         description: Natureza do Projeto (Obras, Outros, ...)
 *       - in: query
 *         name: situacao
 *         schema:
 *           type: string
 *         required: false
 *         description: Situação do Projeto (Em Execução, Paralisada, Cancelada, Cadastrada, Concluída ou Inacabada)
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *         required: false
 *         description: Pagina Atual
 *       - in: query
 *         name: tamanhoDaPagina
 *         schema:
 *           type: integer
 *         required: false
 *         description: Tamanho da Pagina
 *     responses:
 *       200:
 *         description: Dados de Projetos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projetos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idUnico:
 *                         type: string
 *                         example: "string"
 *                       nome:
 *                         type: string
 *                         example: "string"
 *                       cep:
 *                         type: string
 *                         example: "string"
 *                       endereco:
 *                         type: string
 *                         example: "string"
 *                       descricao:
 *                         type: string
 *                         example: "string"
 *                       funcaoSocial:
 *                         type: string
 *                         example: "string"
 *                       metaGlobal:
 *                         type: string
 *                         example: "string"
 *                       dataInicialPrevista:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-10"
 *                       dataFinalPrevista:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-10"
 *                       dataInicialEfetiva:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-10"
 *                       dataFinalEfetiva:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-10"
 *                       dataCadastro:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-10"
 *                       especie:
 *                         type: string
 *                         example: "string"
 *                       natureza:
 *                         type: string
 *                         example: "string"
 *                       situacao:
 *                         type: string
 *                         example: "string"
 *                       uf:
 *                         type: string
 *                         example: "string"
 *                       populacaoBeneficiada:
 *                         type: string
 *                         example: "string"
 *                       tomadores:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             nome:
 *                               type: string
 *                               example: "string"
 *                             codigo:
 *                               type: integer
 *                               example: 0
 *                       executores:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             nome:
 *                               type: string
 *                               example: "string"
 *                             codigo:
 *                               type: integer
 *                               example: 0
 *                       repassadores:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             nome:
 *                               type: string
 *                               example: "string"
 *                             codigo:
 *                               type: integer
 *                               example: 0
 *                       eixos:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 0
 *                             descricao:
 *                               type: string
 *                               example: "string"
 *                       tipos:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 0
 *                             descricao:
 *                               type: string
 *                               example: "string"
 *                             idEixo:
 *                               type: integer
 *                               example: 0
 *                       geometrias:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             geometria:
 *                               type: string
 *                               example: "string"
 *                             dataCriacao:
 *                               type: string
 *                               format: date
 *                               example: "2025-01-10"
 *                             origem:
 *                               type: string
 *                               example: "string"
 *                             latitude:
 *                               type: decimal
 *                               example: "-15.7900001172741"
 *                             longitude:
 *                               type: decimal
 *                               example: "-47.8751611549854"
 *                       fontesDeRecurso:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             origem:
 *                               type: string
 *                               example: "string"
 *                             valorInvestimentoPrevisto:
 *                               type: number
 *                               example: 0
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: 1
 *                       example: true
 *                     pageSize:
 *                       type: number
 *                       example: 10
 */

router.get('/api/projeto-investimento', projetosController.index)

/**
 * @swagger
 * /api/projeto-investimento/{id}:
 *   get:
 *     tags: [Projeto De Investimento]   
 *     summary: Consulta um Único Projeto
 *     description: Retorna um projeto com seu respectivo id. Filtros não obrigatórios.
 *     parameters:
 *       - in: query
 *         name: idUnico
 *         schema:
 *           type: string
 *         required: false
 *         description: Identificador do Projeto
 *     responses:
 *       200:
 *         description: Dados de Projetos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projeto:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idUnico:
 *                         type: string
 *                         example: "string"
 *                       nome:
 *                         type: string
 *                         example: "string"
 *                       cep:
 *                         type: string
 *                         example: "string"
 *                       endereco:
 *                         type: string
 *                         example: "string"
 *                       descricao:
 *                         type: string
 *                         example: "string"
 *                       funcaoSocial:
 *                         type: string
 *                         example: "string"
 *                       metaGlobal:
 *                         type: string
 *                         example: "string"
 *                       dataInicialPrevista:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-10"
 *                       dataFinalPrevista:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-10"
 *                       dataInicialEfetiva:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-10"
 *                       dataFinalEfetiva:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-10"
 *                       dataCadastro:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-10"
 *                       especie:
 *                         type: string
 *                         example: "string"
 *                       natureza:
 *                         type: string
 *                         example: "string"
 *                       situacao:
 *                         type: string
 *                         example: "string"
 *                       uf:
 *                         type: string
 *                         example: "string"
 *                       populacaoBeneficiada:
 *                         type: string
 *                         example: "string"
 *                       tomadores:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             nome:
 *                               type: string
 *                               example: "string"
 *                             codigo:
 *                               type: integer
 *                               example: 0
 *                       executores:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             nome:
 *                               type: string
 *                               example: "string"
 *                             codigo:
 *                               type: integer
 *                               example: 0
 *                       repassadores:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             nome:
 *                               type: string
 *                               example: "string"
 *                             codigo:
 *                               type: integer
 *                               example: 0
 *                       eixos:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 0
 *                             descricao:
 *                               type: string
 *                               example: "string"
 *                       tipos:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 0
 *                             descricao:
 *                               type: string
 *                               example: "string"
 *                             idEixo:
 *                               type: integer
 *                               example: 0
 *                       geometrias:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             geometria:
 *                               type: string
 *                               example: "string"
 *                             dataCriacao:
 *                               type: string
 *                               format: date
 *                               example: "2025-01-10"
 *                             origem:
 *                               type: string
 *                               example: "string"
 *                             latitude:
 *                               type: decimal
 *                               example: "-15.7900001172741"
 *                             longitude:
 *                               type: decimal
 *                               example: "-47.8751611549854"
 *                       fontesDeRecurso:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             origem:
 *                               type: string
 *                               example: "string"
 *                             valorInvestimentoPrevisto:
 *                               type: number
 *                               example: 0
 */
router.get('/api/projeto-investimento/:id', projetosController.show)

export { router }