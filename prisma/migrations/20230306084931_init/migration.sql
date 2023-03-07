-- CreateTable
CREATE TABLE "Likes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "like_date" TIMESTAMP(3),
    "category" TEXT NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);
