-- CreateTable
CREATE TABLE "Projeto" (
    "id" SERIAL NOT NULL,
    "idUnico" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cep" TEXT,
    "endereco" TEXT,
    "descricao" TEXT NOT NULL,
    "funcaoSocial" TEXT,
    "metaGlobal" TEXT,
    "dataInicialPrevista" TIMESTAMP(3),
    "dataFinalPrevista" TIMESTAMP(3),
    "dataInicialEfetiva" TIMESTAMP(3),
    "dataFinalEfetiva" TIMESTAMP(3),
    "dataCadastro" TIMESTAMP(3),
    "especie" TEXT,
    "natureza" TEXT,
    "naturezaOutras" TEXT,
    "situacao" TEXT,
    "descPlanoNacionalPoliticaVinculado" TEXT,
    "uf" TEXT NOT NULL,
    "qdtEmpregosGerados" INTEGER,
    "descPopulacaoBeneficiada" TEXT,
    "populacaoBeneficiada" INTEGER,
    "observacoesPertinentes" TEXT,
    "isModeladaPorBim" BOOLEAN,
    "dataSituacao" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Projeto_idUnico_key" ON "Projeto"("idUnico");
