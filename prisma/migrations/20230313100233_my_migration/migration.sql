/*
  Warnings:

  - You are about to drop the column `orderId` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_orderId_fkey";

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "orderId";

-- DropTable
DROP TABLE "Order";
