import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const PORT = 8000;

const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("サーバーが起動中・・・");
});

app.get("/items", async (req, res) => {
  const item = await prisma.items.findMany({
    orderBy: [
      {
        shopping_date: "desc",
      },
    ],
    skip: 0,
    take: 10,
  });
  return res.json(item);
});

app.get("/items/:id", async (req, res) => {
  const id = req.params.id;
  const item = await prisma.items.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.json(item);
});

app.post("/items", async (req, res) => {
  const {
    name,
    price,
    image,
    description,
    shopping_date,
    product_state,
    product_brand,
    product_days,
    category,
    user_id,
    size_id,
    shopping_price,
  } = req.body;
  const item = await prisma.items.create({
    data: {
      name,
      price,
      image,
      description,
      shopping_date,
      product_state,
      product_brand,
      product_days,
      category,
      user_id,
      size_id,
      shopping_price,
    },
  });
  return res.json(item);
});

//users
app.get("/user", async (req, res) => {
  const user = await prisma.users.findMany();
  return res.json(user);
});

app.post("/user", async (req, res) => {
  const {
    nick_name,
    first_name,
    last_name,
    email,
    password,
    profile,
    image,
    phone,
    postal_code,
    prefecture,
    city,
    street,
    bilding,
  } = req.body;

  const register = await prisma.users.create({
    data: {
      nick_name,
      first_name,
      last_name,
      email,
      password,
      profile,
      image,
      phone,
      postal_code,
      prefecture,
      city,
      street,
      bilding,
    },
  });
  return res.json(register);
});

app.get("/image/:id", async (req, res) => {
  const id = req.params.id;
  const register = await prisma.users.findMany({
    where: {
      id: Number(id),
    },
    select: {
      image: true,
    },
  });
  return res.json(register);
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const register = await prisma.users.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.json(register);
});

app.put("/user/:id", async (req, res) => {
  const id = req.params.id;
  const {
    nick_name,
    first_name,
    last_name,
    email,
    password,
    profile,
    image,
    phone,
    postal_code,
    prefecture,
    city,
    street,
    bilding,
  } = req.body;
  const update = await prisma.users.update({
    where: {
      id: Number(id),
    },
    data: {
      nick_name,
      first_name,
      last_name,
      email,
      password,
      profile,
      image,
      phone,
      postal_code,
      prefecture,
      city,
      street,
      bilding,
    },
  });
  return res.json(update);
});

//likes
app.get("/likes", async (req, res) => {
  const likes = await prisma.likes.findMany();
  return res.json(likes);
});

app.post("/likes", async (req, res) => {
  const {
    name,
    price,
    image,
    description,
    like_date,
    category,
    user_id,
  } = req.body;
  const item = await prisma.likes.create({
    data: {
      name,
      price,
      image,
      description,
      like_date,
      category,
      user_id,
    },
  });
  return res.json(item);
});

