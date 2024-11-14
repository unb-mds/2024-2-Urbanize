/*
  Warnings:

  - You are about to alter the column `valorInvestimentoPrevisto` on the `FonteDeRecurso` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE "FonteDeRecurso" ALTER COLUMN "valorInvestimentoPrevisto" SET DATA TYPE DECIMAL(15,2);
