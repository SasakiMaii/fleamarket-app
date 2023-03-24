import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51MlMrOB3V27vlWJWjqJoBgQdgjk93ZRwHxWPKLZAFmyUB6hR3e0fAlPY5WUqHvYzkiVgyzfBEst7g0qLdbkSaIHA00fZiCTxDf"
);
const sessionId = uuidv4();
const app = express();
const PORT = process.env.PORT || 8000;
const prisma = new PrismaClient();

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));
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

//stripe

app.post("/create-payment-intent", async (req, res) => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "jpy",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));

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

app.get("/item/:user_id", async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const items = await prisma.items.findMany({
    where: {
      user_id: user_id,
    },
  });
  return res.json(items);
});
app.get("/userdata/:id", async (req, res) => {
  const id = Number(req.params.id);
  const items = await prisma.users.findUnique({
    where: {
      id:id,
    },
  });
  return res.json(items);
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
    state,
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
      state,
    },
  });
  return res.json(item);
});
//comment
app.get("/comment", async (req, res) => {
  const comment = await prisma.comment.findMany();
  return res.json(comment);
});

app.post("/comment", async (req, res) => {
  const { comment, product_id, user_id ,name} = req.body;
  const comments = await prisma.comment.create({
    data: {
      comment,
      product_id,
      user_id,
      name
    },
  });
  return res.json(comments);
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
  const {
    name,
    price,
    image,
    cart_date,
    category,
    user_id,
    product_id,
    orderId,
    state,
  } = req.body;
  const cartData = await prisma.cart.create({
    data: {
      name,
      price,
      image,
      cart_date,
      category,
      user_id,
      product_id,
      orderId,
      state,
    },
  });
  return res.json(cartData);
});

app.put("/cartstate/:user_id", async (req, res) => {
  const { state } = req.body;
  const user_id = req.params.user_id;
  const cartData = await prisma.cart.updateMany({
    where: {
      user_id: Number(user_id),
    },
    data: { state: state },
  });
  return res.json(cartData);
});
app.put("/itemstate/:order_id", async (req, res) => {
  const order_id = parseInt(req.params.order_id);
  try {
    const itemData = await prisma.items.updateMany({
      where: {
        order_id: {
          in: [order_id],
        },
      },
      data: {
        state: false, // stateフィールドをfalseに変更
      },
    });
    return res.json(itemData);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});
app.put("/orderitems/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const order_id = parseInt(req.body.order_id);

  try {
    const itemData = await prisma.items.updateMany({
      where: {
        id: Number(id),
      },
      data: {
        order_id: Number(order_id),
      },
    });
    return res.json(itemData);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
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

//order
app.post("/orders", async (req, res) => {
  const { price, user_id, carts, cartId } = req.body;
  const order = await prisma.order.create({
    data: {
      price,
      user_id,
      carts: {
        connect: carts && carts.map((cart) => ({ id: cart.id })),
      },
    },
    include: { carts: true },
  });
  return res.json(order);
});

app.get("/orders", async (req, res) => {
  const order = await prisma.order.findMany({
    include: {
      carts: true,
    },
  });
  return res.json(order);
});

//review
app.get("/review", async (req, res) => {
  const ratingReview = await prisma.review.findMany();
  return res.json(ratingReview);
});
app.get("/review/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const reviewData = await prisma.review.findMany({
    where: {
      user_id: Number(user_id),
    },
  });
  return res.json(reviewData);
});

app.post("/review", async (req, res) => {
  const { comment, user_id, product_id, rating, createdAt } = req.body;
  const ratingReview = await prisma.review.create({
    data: {
      comment,
      user_id,
      product_id,
      rating,
      createdAt,
    },
  });
  return res.json(ratingReview);
});
