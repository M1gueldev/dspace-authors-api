/*
  Warnings:

  - Added the required column `about` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoType` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "photoType" VARCHAR(25) NOT NULL;
