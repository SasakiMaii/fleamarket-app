/*
  Warnings:

  - Made the column `orderId` on table `Cart` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_orderId_fkey";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "orderId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("cartId") ON DELETE RESTRICT ON UPDATE CASCADE;
