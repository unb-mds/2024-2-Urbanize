/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Executor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigo]` on the table `Repassador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigo]` on the table `Tomador` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Executor" ALTER COLUMN "codigo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Repassador" ALTER COLUMN "codigo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Tomador" ALTER COLUMN "codigo" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Executor_codigo_key" ON "Executor"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Repassador_codigo_key" ON "Repassador"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Tomador_codigo_key" ON "Tomador"("codigo");
