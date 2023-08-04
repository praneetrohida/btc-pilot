/*
  Warnings:

  - You are about to drop the column `didWin` on the `Prediction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PredictionResult" AS ENUM ('WIN', 'LOSS', 'DRAW');

-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "didWin",
ADD COLUMN     "result" "PredictionResult";
