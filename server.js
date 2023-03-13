import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";

const sessionId = uuidv4();
const app = express();
const PORT = process.env.PORT || 8000;
const prisma = new PrismaClient();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {},
  })
);

app.listen(PORT, () => {
  console.log("サーバーが起動中・・・");
});

async function authenticateUser(email, password) {
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    return null; // 認証失敗
  }
  return user; // 認証成功
}

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// ログイン処理
app.post("/login", async (req, res) => {
  // ユーザー認証処理
  const user = await authenticateUser(req.body.email, req.body.password);
  if (user) {
    // ユーザーが認証された場合は、セッションにユーザー情報を保存する
    console.log(`Session ID: ${req.sessionID}`);
    res.json({ message: "ログイン成功" });
    req.session.userId = user.id;
  } else {
    res.json({ message: "ログイン失敗" });
  }
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
  const { name, price, image, like_date, category, user_id, product_id } =
    req.body;
  const item = await prisma.likes.create({
    data: {
      name,
      price,
      image,
      like_date,
      category,
      user_id,
      product_id,
    },
  });
  return res.json(item);
});

app.delete("/likes/:id", async (req, res) => {
  const id = req.params.id;
  const likes = await prisma.likes.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json(likes);
});

//cart
app.get("/cart", async (req, res) => {
  const cart = await prisma.cart.findMany();
  return res.json(cart);
});

app.get("/cart/:user_id", async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const cart = await prisma.cart.findMany({
    where: {
      user_id: user_id,
    },
    orderBy: {
      cart_date: "asc", // カートに追加された日時の昇順でソートする
    },
  });
  const cartByUser = {};

  cart.forEach((item) => {
    if (!cartByUser[item.user_id]) {
      cartByUser[item.user_id] = []; // user_idが未登録の場合は空の配列を作成する
    }
    cartByUser[item.user_id].push(item); // カート情報を配列に追加する
  });
  return res.json(cartByUser);
});

app.post("/cart", async (req, res) => {
  const { name, price, image, cart_date, category, user_id, product_id } =
    req.body;
  const cartData = await prisma.cart.create({
    data: {
      name,
      price,
      image,
      cart_date,
      category,
      user_id,
      product_id,
    },
  });
  return res.json(cartData);
});

app.delete("/cart/:id", async (req, res) => {
  const id = req.params.id;
  const cart = await prisma.cart.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json(cart);
});


