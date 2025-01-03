/*
  Warnings:

  - Changed the type of `codigo` on the `Executor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `codigo` on the `Repassador` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `codigo` on the `Tomador` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Executor_codigo_key";

-- DropIndex
DROP INDEX "Repassador_codigo_key";

-- DropIndex
DROP INDEX "Tomador_codigo_key";

-- AlterTable
ALTER TABLE "Executor" DROP COLUMN "codigo",
ADD COLUMN     "codigo" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Repassador" DROP COLUMN "codigo",
ADD COLUMN     "codigo" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Tomador" DROP COLUMN "codigo",
ADD COLUMN     "codigo" BIGINT NOT NULL;
