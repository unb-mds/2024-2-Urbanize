/*
  Warnings:

  - You are about to alter the column `codigo` on the `Executor` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `codigo` on the `Repassador` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `codigo` on the `Tomador` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Executor" ALTER COLUMN "codigo" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Repassador" ALTER COLUMN "codigo" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Tomador" ALTER COLUMN "codigo" SET DATA TYPE INTEGER;
