/*
  Warnings:

  - Added the required column `product_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;
