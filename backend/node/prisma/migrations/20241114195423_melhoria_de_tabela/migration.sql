/*
  Warnings:

  - The primary key for the `Eixo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Eixo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Geometria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cepAreaExecutora` on the `Geometria` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoAreaExecutora` on the `Geometria` table. All the data in the column will be lost.
  - You are about to drop the column `nomeAreaExecutora` on the `Geometria` table. All the data in the column will be lost.
  - You are about to drop the column `paisAreaExecutora` on the `Geometria` table. All the data in the column will be lost.
  - The `id` column on the `Geometria` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `eixo_id` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `executor_id` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `geometria_id` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `repassador_id` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_id` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `tomador_id` on the `Projeto` table. All the data in the column will be lost.
  - The primary key for the `Tipo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `eixo_id` on the `Tipo` table. All the data in the column will be lost.
  - The `id` column on the `Tipo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `FonteDeRecurso` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projetoId` to the `Eixo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projetoId` to the `Executor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projetoId` to the `Geometria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `especie` to the `Projeto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `populacaoBeneficiada` to the `Projeto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Projeto` table without a default value. This is not possible if the table is not empty.
  - Made the column `natureza` on table `Projeto` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `projetoId` to the `Repassador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEixo` to the `Tipo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projetoId` to the `Tipo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projetoId` to the `Tomador` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FonteDeRecurso" DROP CONSTRAINT "FonteDeRecurso_projeto_id_fkey";

-- DropForeignKey
ALTER TABLE "Projeto" DROP CONSTRAINT "Projeto_eixo_id_fkey";

-- DropForeignKey
ALTER TABLE "Projeto" DROP CONSTRAINT "Projeto_executor_id_fkey";

-- DropForeignKey
ALTER TABLE "Projeto" DROP CONSTRAINT "Projeto_geometria_id_fkey";

-- DropForeignKey
ALTER TABLE "Projeto" DROP CONSTRAINT "Projeto_repassador_id_fkey";

-- DropForeignKey
ALTER TABLE "Projeto" DROP CONSTRAINT "Projeto_tipo_id_fkey";

-- DropForeignKey
ALTER TABLE "Projeto" DROP CONSTRAINT "Projeto_tomador_id_fkey";

-- DropForeignKey
ALTER TABLE "Tipo" DROP CONSTRAINT "Tipo_eixo_id_fkey";

-- AlterTable
ALTER TABLE "Eixo" DROP CONSTRAINT "Eixo_pkey",
ADD COLUMN     "projetoId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Eixo_pkey" PRIMARY KEY ("id");

-- AlterTable
CREATE SEQUENCE executor_id_seq;
ALTER TABLE "Executor" ADD COLUMN     "projetoId" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('executor_id_seq');
ALTER SEQUENCE executor_id_seq OWNED BY "Executor"."id";

-- AlterTable
ALTER TABLE "Geometria" DROP CONSTRAINT "Geometria_pkey",
DROP COLUMN "cepAreaExecutora",
DROP COLUMN "enderecoAreaExecutora",
DROP COLUMN "nomeAreaExecutora",
DROP COLUMN "paisAreaExecutora",
ADD COLUMN     "projetoId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Geometria_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Projeto" DROP COLUMN "eixo_id",
DROP COLUMN "executor_id",
DROP COLUMN "geometria_id",
DROP COLUMN "repassador_id",
DROP COLUMN "tipo_id",
DROP COLUMN "tomador_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "especie" TEXT NOT NULL,
ADD COLUMN     "funcaoSocial" TEXT,
ADD COLUMN     "metaGlobal" TEXT,
ADD COLUMN     "populacaoBeneficiada" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "descricao" DROP NOT NULL,
ALTER COLUMN "natureza" SET NOT NULL;

-- AlterTable
CREATE SEQUENCE repassador_id_seq;
ALTER TABLE "Repassador" ADD COLUMN     "projetoId" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('repassador_id_seq');
ALTER SEQUENCE repassador_id_seq OWNED BY "Repassador"."id";

-- AlterTable
ALTER TABLE "Tipo" DROP CONSTRAINT "Tipo_pkey",
DROP COLUMN "eixo_id",
ADD COLUMN     "idEixo" INTEGER NOT NULL,
ADD COLUMN     "projetoId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tipo_pkey" PRIMARY KEY ("id");

-- AlterTable
CREATE SEQUENCE tomador_id_seq;
ALTER TABLE "Tomador" ADD COLUMN     "projetoId" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('tomador_id_seq');
ALTER SEQUENCE tomador_id_seq OWNED BY "Tomador"."id";

-- DropTable
DROP TABLE "FonteDeRecurso";

-- AddForeignKey
ALTER TABLE "Tomador" ADD CONSTRAINT "Tomador_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Executor" ADD CONSTRAINT "Executor_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repassador" ADD CONSTRAINT "Repassador_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eixo" ADD CONSTRAINT "Eixo_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tipo" ADD CONSTRAINT "Tipo_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Geometria" ADD CONSTRAINT "Geometria_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
