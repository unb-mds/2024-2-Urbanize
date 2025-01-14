/*
  Warnings:

  - You are about to drop the column `codigo` on the `Executor` table. All the data in the column will be lost.
  - You are about to drop the column `codigo` on the `Repassador` table. All the data in the column will be lost.
  - You are about to drop the column `codigo` on the `Tomador` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Executor" DROP COLUMN "codigo";

-- AlterTable
ALTER TABLE "Repassador" DROP COLUMN "codigo";

-- AlterTable
ALTER TABLE "Tomador" DROP COLUMN "codigo";
