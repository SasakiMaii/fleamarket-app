/*
  Warnings:

  - A unique constraint covering the columns `[cartId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Made the column `user_id` on table `Cart` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `cartId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_user_id_fkey";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "orderId" INTEGER,
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "cartId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_cartId_key" ON "Order"("cartId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("cartId") ON DELETE SET NULL ON UPDATE CASCADE;
