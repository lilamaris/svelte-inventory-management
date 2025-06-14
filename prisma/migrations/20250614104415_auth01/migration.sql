/*
  Warnings:

  - A unique constraint covering the columns `[providerId,type]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Account_userId_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_type_key" ON "Account"("providerId", "type");
