/*
  Warnings:

  - The primary key for the `AuthProvider` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AuthProvider` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `AuthProvider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuthProvider" DROP CONSTRAINT "AuthProvider_pkey",
DROP COLUMN "id",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD CONSTRAINT "AuthProvider_pkey" PRIMARY KEY ("accountId", "type");
