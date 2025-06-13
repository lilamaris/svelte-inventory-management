/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secretHash` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "expiresAt",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" INTEGER NOT NULL,
ADD COLUMN     "secretHash" BYTEA NOT NULL;
