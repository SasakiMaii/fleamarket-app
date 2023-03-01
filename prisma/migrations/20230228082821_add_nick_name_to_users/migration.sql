/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefecture` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "bilding" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "nick_name" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" INTEGER NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL,
ADD COLUMN     "prefecture" TEXT NOT NULL,
ADD COLUMN     "profile" TEXT,
ADD COLUMN     "street" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
