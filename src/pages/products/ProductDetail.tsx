import {
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Items } from "../../types/type";
import Box from "@mui/material/Box";
import Comment from "../../components/feature/Comment";

const ProductDetail = () => {
  const [detailItems, setDetailItems] = useState<Items[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    getDetailItem(signal)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const getDetailItem = async (signal: AbortSignal) => {
    const response = await fetch(`http://localhost:8000/${id}`, { signal });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    setDetailItems([data]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Box mt={10} sx={{ textAlign: "center", maxWidth: 800 }}>
      {detailItems.map((item: Items) => (
        <Box
          key={item.id}
          sx={{
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          <CardMedia
            sx={{ height: 500, width: 500, textAlign: "center" }}
            image={item.image}
          />
          <List>
            <ListItem>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  variant: "h4",
                  component: "h2",
                  gutterBottom: true,
                }}
                sx={{
                  textAlign: "center",
                  borderBottom: 1,
                  fontWeight: "bold",
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`¥${item.price?.toLocaleString()}`}
                primaryTypographyProps={{
                  variant: "h5",
                  component: "p",
                  color: "primary.main",
                }}
                sx={{ textAlign: "center" }}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginLeft: 1 }}
              >
                (税込)
              </Typography>
            </ListItem>
          </List>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            商品の説明
          </Divider>
          <Typography sx={{ marginTop: 5 }}>{item.description}</Typography>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            カテゴリー
          </Divider>
          <Typography sx={{ marginTop: 5 }}>{item.category}</Typography>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            商品の状態
          </Divider>
          <Typography sx={{ marginTop: 5 }}>{item.product_state}</Typography>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>ブランド</Divider>
          <Typography sx={{ marginTop: 5 }}>{item.product_brand}</Typography>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            発送までの日数
          </Divider>
          <Typography sx={{ marginTop: 5 }}>{item.product_days}</Typography>
          <Divider sx={{ marginTop: 5 }}></Divider>
          <Button variant="contained" disableElevation sx={{ marginTop: 10 }}>
            カートに入れる
          </Button>
        </Box>
      ))}
      <Comment />
    </Box>
  );
};

export default ProductDetail;
