/*
  Warnings:

  - You are about to drop the column `name` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "name";
