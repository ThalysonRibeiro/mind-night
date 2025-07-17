/*
  Warnings:

  - You are about to drop the column `userId` on the `Dream` table. All the data in the column will be lost.
  - Added the required column `diariesId` to the `Dream` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dream" DROP CONSTRAINT "Dream_userId_fkey";

-- DropIndex
DROP INDEX "Dream_userId_idx";

-- AlterTable
ALTER TABLE "Dream" DROP COLUMN "userId",
ADD COLUMN     "diariesId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Diaries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diaries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Diaries_name_key" ON "Diaries"("name");

-- CreateIndex
CREATE INDEX "Diaries_createdAt_idx" ON "Diaries"("createdAt");

-- CreateIndex
CREATE INDEX "Diaries_userId_idx" ON "Diaries"("userId");

-- CreateIndex
CREATE INDEX "Dream_diariesId_idx" ON "Dream"("diariesId");

-- AddForeignKey
ALTER TABLE "Diaries" ADD CONSTRAINT "Diaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dream" ADD CONSTRAINT "Dream_diariesId_fkey" FOREIGN KEY ("diariesId") REFERENCES "Diaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
