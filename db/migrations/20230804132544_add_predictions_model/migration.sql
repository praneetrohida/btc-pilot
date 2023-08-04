-- CreateEnum
CREATE TYPE "PredictionDirection" AS ENUM ('UP', 'DOWN');

-- CreateTable
CREATE TABLE "Prediction" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "direction" "PredictionDirection" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
