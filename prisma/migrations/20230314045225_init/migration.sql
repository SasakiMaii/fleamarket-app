/*
  Warnings:

  - You are about to drop the column `orderId` on the `Cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_orderId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "orderId",
ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
