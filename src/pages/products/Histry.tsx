import {
  Box,
  Button,
  CardMedia,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Likes } from "@prisma/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Orders } from "../../types/type";

const Histry = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [dates, setDates] = useState<Orders[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8000/orders");
      const data = await res.json();
      console.log(data.carts);
      const newOrders = data.map(
        (order: { orderedAt: string | number | Date }) => {
          return {
            ...order,
            orderedAt: new Date(order.orderedAt),
          };
        }
      );
      const newDates = newOrders.map(
        (order: { orderedAt: { toLocaleDateString: () => any } }) =>
          order.orderedAt.toLocaleDateString()
      );
      setOrders(newOrders);
      setDates(newDates);
    })();
  }, []);
  console.log(orders);

  // const cartsData=orders.carts.map((cart: any)=>{
  //   return{
  //     cart
  //   }
  // })
  // console.log(cartsData)

  const orderdeDate = orders.map((order: Orders) => {
    return order.orderedAt;
  });
  //  console.log(typeof orders.orderedAt[0])

  return (
    <Box>
      <Box my={10} sx={{ fontSize: "23px" }}>
        購入履歴
      </Box>
      {orders.length >= 1 ? (
        orders.map((order) => (
          <Box>
            {order.carts.map((cart) => (
              <List
                key={order.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#e7e7eb",
                  maxWidth: "80%",
                  margin: "auto",
                  mb: 5,
                }}
              >
                <Box sx={{ p: 2 }}>{order.orderedAt.toLocaleDateString()}</Box>
                <Box sx={{ width: 500 }}>
                  <Link href={`productdetail/${cart.product_id}`}>
                    <ListItem>
                      <ListItemText>{cart.name}</ListItemText>
                      <CardMedia
                        sx={{ height: 100, width: 100 }}
                        image={cart.image}
                      />
                    </ListItem>
                  </Link>
                </Box>

                <Button
                  sx={{ width: 200, fontWeight: "bold" }}
                  onClick={() => console.log(`write a review for ${order.id}`)}
                >
                  レビューを書く
                </Button>
              </List>
            ))}
          </Box>
        ))
      ) : (
        <Box>履歴はありません</Box>
      )}
    </Box>
  );
};

export default Histry;
