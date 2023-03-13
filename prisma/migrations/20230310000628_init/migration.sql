-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "cart_date" TIMESTAMP(3),
    "category" TEXT NOT NULL,
    "image" TEXT,
    "product_id" INTEGER,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);
