import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Items } from "../types/type";
import { NavLink } from "react-router-dom";

const Top = () => {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8000/items");
      const data = await res.json();
      console.log(data);
      setItems(data);
    })();
  }, []);

  return (
    <>
      <Box mt={10} mb={5} textAlign="center">
        出品商品一覧
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        alignItems="center"
      >
        {items.map((item: Items) => {
          return (
            <Box mb={5} key={item.id} width="250px" mx={2}>
              <div key={item.id}>
              <NavLink to={`productdetail/${item.id}`} >
                <Card sx={{ minWidth: 250, maxWidth: 250, display: "flex" }}>
                  <CardMedia
                    sx={{ height: 250, width: 250, flex: "1" }}
                    image={item.image}
                  />
                  <CardContent sx={{ flex: "1" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      ¥{item.price?.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
                </NavLink>
              </div>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default Top;
