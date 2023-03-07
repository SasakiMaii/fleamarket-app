import {
  Box,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import { Items, Likes } from "../../types/type";
import { useEffect } from "react";

const Favorite = () => {
  const [likes, setLikes] = useState<Likes[]>([]);
  // const location = useLocation();
  // const itemData = location.state;

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8000/likes");
      const data = await res.json();
      setLikes(data);
    })();
  }, []);

  console.log(likes)

  return (
    <>
      <Box my={10}>いいねした商品</Box>

        {likes.map((like: Likes) => {
          return (
            <>
            <List
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: 1,
                mb:5
              }}
            >
              <ListItem>
                <ListItem>
                  <ListItemText>{like.name}</ListItemText>
                  <CardMedia
                    sx={{ height: 100, width: 100, textAlign: "center" }}
                    image={like.image}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText>{like.price}円</ListItemText>
                </ListItem>
              </ListItem>
      </List>
            </>
          );
        })}
    </>
  );
};

export default Favorite;
