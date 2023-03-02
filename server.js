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




