-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "size_id" INTEGER,
    "shopping_date" TIMESTAMP(3),
    "shopping_price" INTEGER,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);
