/*
  Warnings:

  - You are about to drop the column `email` on the `Author` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `photo` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Author` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Author_email_key";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "email",
ADD COLUMN     "photo" BYTEA NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");
