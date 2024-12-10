/*
  Warnings:

  - The primary key for the `Projeto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `dataSituacao` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `descPlanoNacionalPoliticaVinculado` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `descPopulacaoBeneficiada` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `especie` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `funcaoSocial` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `idUnico` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `isModeladaPorBim` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `metaGlobal` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `naturezaOutras` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `observacoesPertinentes` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `populacaoBeneficiada` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `qdtEmpregosGerados` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Projeto` table. All the data in the column will be lost.
  - Made the column `dataInicialPrevista` on table `Projeto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dataFinalPrevista` on table `Projeto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dataCadastro` on table `Projeto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `situacao` on table `Projeto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Projeto_idUnico_key";

-- AlterTable
ALTER TABLE "Projeto" DROP CONSTRAINT "Projeto_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "dataSituacao",
DROP COLUMN "descPlanoNacionalPoliticaVinculado",
DROP COLUMN "descPopulacaoBeneficiada",
DROP COLUMN "especie",
DROP COLUMN "funcaoSocial",
DROP COLUMN "idUnico",
DROP COLUMN "isModeladaPorBim",
DROP COLUMN "metaGlobal",
DROP COLUMN "naturezaOutras",
DROP COLUMN "observacoesPertinentes",
DROP COLUMN "populacaoBeneficiada",
DROP COLUMN "qdtEmpregosGerados",
DROP COLUMN "updatedAt",
ADD COLUMN     "eixo_id" TEXT,
ADD COLUMN     "executor_id" INTEGER,
ADD COLUMN     "geometria_id" TEXT,
ADD COLUMN     "repassador_id" INTEGER,
ADD COLUMN     "tipo_id" TEXT,
ADD COLUMN     "tomador_id" INTEGER,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "dataInicialPrevista" SET NOT NULL,
ALTER COLUMN "dataFinalPrevista" SET NOT NULL,
ALTER COLUMN "dataCadastro" SET NOT NULL,
ALTER COLUMN "situacao" SET NOT NULL,
ADD CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Projeto_id_seq";

-- CreateTable
CREATE TABLE "Geometria" (
    "id" TEXT NOT NULL,
    "geometria" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL,
    "origem" TEXT NOT NULL,
    "nomeAreaExecutora" TEXT NOT NULL,
    "enderecoAreaExecutora" TEXT NOT NULL,
    "cepAreaExecutora" TEXT NOT NULL,
    "paisAreaExecutora" TEXT NOT NULL,

    CONSTRAINT "Geometria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eixo" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Eixo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipo" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "eixo_id" TEXT,

    CONSTRAINT "Tipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Executor" (
    "id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" INTEGER NOT NULL,

    CONSTRAINT "Executor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repassador" (
    "id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" INTEGER NOT NULL,

    CONSTRAINT "Repassador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tomador" (
    "id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" INTEGER NOT NULL,

    CONSTRAINT "Tomador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FonteDeRecurso" (
    "id" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "valorInvestimentoPrevisto" DOUBLE PRECISION NOT NULL,
    "projeto_id" TEXT NOT NULL,

    CONSTRAINT "FonteDeRecurso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_eixo_id_fkey" FOREIGN KEY ("eixo_id") REFERENCES "Eixo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "Tipo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_executor_id_fkey" FOREIGN KEY ("executor_id") REFERENCES "Executor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_repassador_id_fkey" FOREIGN KEY ("repassador_id") REFERENCES "Repassador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_tomador_id_fkey" FOREIGN KEY ("tomador_id") REFERENCES "Tomador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_geometria_id_fkey" FOREIGN KEY ("geometria_id") REFERENCES "Geometria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tipo" ADD CONSTRAINT "Tipo_eixo_id_fkey" FOREIGN KEY ("eixo_id") REFERENCES "Eixo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FonteDeRecurso" ADD CONSTRAINT "FonteDeRecurso_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
