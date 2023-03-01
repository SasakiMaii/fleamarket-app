import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"
const app = express();
const PORT = 8000;


const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("サーバーが起動中・・・");
});
app.get("/", (req, res) => res.send("Hello World!"));

// app.post("/",async(req,res)=>{

// })

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

app.get("items/:id", async (req, res) => {
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
