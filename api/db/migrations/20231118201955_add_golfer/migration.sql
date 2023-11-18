/*
  Warnings:

  - You are about to drop the `UserExample` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Male', 'Female');

-- DropTable
DROP TABLE "UserExample";

-- CreateTable
CREATE TABLE "Golfer" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "ghinNumber" INTEGER NOT NULL,
    "sex" "Sex" NOT NULL,
    "association" TEXT NOT NULL,

    CONSTRAINT "Golfer_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "Golfer_ghinNumber_key" ON "Golfer"("ghinNumber");
