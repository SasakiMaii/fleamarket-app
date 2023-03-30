import {
  Button,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Items, Users, Likes, CartType, CommentType } from "../../types/type";
import Box from "@mui/material/Box";
import Comment from "../../components/feature/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { secretKey } from "../users/Login";
import CryptoJS from "crypto-js";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Card from "@mui/material/Card";
import SellerInformation from "../../components/user/SellerInformation";

const ProductDetail = () => {
  const [detailItems, setDetailItems] = useState<Items[]>([]);
  const [like, setLike] = useState(false);
  const [userCookieData, setUserCookieData] = useState<any>([]);
  const [likeItems, setLikeItems] = useState<Likes[]>([]);
  const [cartItems, setCartItems] = useState<CartType[]>([]);
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState<CommentType[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  //cookieのuserIDを復号して取得
  useEffect(() => {
    const cookieData = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("data="));
    const encryptedData = cookieData ? cookieData.split("=")[1] : "";
    const decrypts = (data: string | CryptoJS.lib.CipherParams) => {
      const bytes = CryptoJS.AES.decrypt(String(data), secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    };
    if (document.cookie
      .split("; ")
      .find((cookie) =>
        cookie.startsWith(`data=`)
      )) {
      const decording = decrypts(encryptedData);
      const Cookiedata = JSON.parse(decording);
      setUserCookieData(Cookiedata);
    }
  }, []);

  //カート情報取得
  useEffect(()=>{
(async()=>{
  try {
    const response = await fetch(`http://localhost:8000/cart`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setCartItems(data);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})()
  },[userCookieData])
    //お気に入りアイテム取得
  useEffect(()=>{
(async()=>{
  try {
    const response = await fetch(`http://localhost:8000/likes`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setLikeItems(data);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})()
  },[])
    //詳細商品取得
  useEffect(()=>{
(async()=>{
  try {
    const response = await fetch(`http://localhost:8000/items/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setDetailItems([data]);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})()
  },[userCookieData])
    //コメント
  useEffect(()=>{
(async()=>{
  try {
    const response = await fetch(`http://localhost:8000/comment`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setCommentData(data);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})()
  },[userCookieData])
  //ログインしているユーザーがお気に入りしている商品
  const likeData = likeItems.filter((like) => {
    return (
      like.product_id === detailItems[0]?.id &&
      like.user_id === Number(userCookieData)
    );
  });
  const likeItemsID = likeItems.filter((like) => {
    return like.user_id === Number(userCookieData);
  });
  //「like_product」が存在していたらアイコン変える
  useEffect(() => {
    if (
      document.cookie.indexOf(
        `like_product${detailItems[0]?.id}${userCookieData}`
      ) !== -1 &&
      likeItemsID.length >= 1
    ) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [detailItems]);
  //お気に入りテーブルのIDを表示
  const likeId = likeData.map((item) => {
    return item.id;
  });
  //「like_product」cookie登録
  const setLikeCookie = (id: number | undefined, maxAge: number) => {
    document.cookie = `like_product${detailItems[0].id}${userCookieData}=${id};path=/; max-age=${maxAge}; secure`;
  };
  //「like_product」cookie消去
  const deleteLikeCookie = (id: number[] | undefined) => {
    document.cookie = `like_product${detailItems[0].id}${userCookieData}=${id};path=/; max-age=0; secure`;
  };
  //「like_product」のバリューを取得
  const cookie = document.cookie
    .split("; ")
    .find((cookie) =>
      cookie.startsWith(`like_product${detailItems[0]?.id}${userCookieData}=`)
    );
  const cookieValue = cookie ? cookie.split("=")[1] : null;

  //ハートをクリックしたとき
  const now = new Date();
  const onLikeFlag = async () => {
    if (
      like === false &&
      document.cookie.indexOf(
        `like_product${detailItems[0].id}${userCookieData}`
      ) === -1
    ) {
      setLike(true);
      const res = await fetch("http://localhost:8000/likes", {
        method: "POST",
        body: JSON.stringify({
          name: detailItems[0].name,
          price: Number(detailItems[0].price),
          image: detailItems[0].image || "",
          like_date: now,
          user_id: Number(userCookieData),
          category: "",
          product_id: detailItems[0].id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setLikeCookie(data.id, 100000);
      window.location.reload();
    } else {
      setLike(false);
      const res: any = await fetch(
        `http://localhost:8000/likes/${cookieValue}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).catch((err) => {
        console.log(err, "エラー");
      });
      deleteLikeCookie(likeId);
      const data = await res.json();
    }
  };
  // 一致していれば売り切れ表示する
  const cartId: any = cartItems.filter((item) => {
    return (
      detailItems.length > 0 &&
      detailItems &&
      item.product_id === detailItems[0].id
    );
  });

  //カートに入れるボタン
  const setCartClick = async () => {
    if (cartId.length >= 1) {
      alert("こちらの商品は販売終了しました。");
    } else {
      navigate("/cart");
      const res = await fetch(`http://localhost:8000/cart`, {
        method: "POST",
        body: JSON.stringify({
          name: detailItems[0].name,
          price: Number(detailItems[0].price),
          image: detailItems[0].image || "",
          like_date: now,
          user_id: Number(userCookieData),
          category: "",
          product_id: detailItems[0].id,
          state: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const res2: any = await fetch(
        `http://localhost:8000/orderitems/${Number(detailItems[0].id)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: userCookieData,
          }),
        }
      ).catch((err) => {
        console.log(err, "エラー2");
      });
      const result2 = await res2.json();
      window.location.reload();
    }
  };

  //この商品へのコメント
  const commentItem: any =
    commentData.length >= 1 &&
    commentData.filter((comment) => {
      return comment.product_id === Number(id);
    });

  const comments =
    commentItem.length >= 1 &&
    commentItem.map(
      (comments: { createdAt: string; comment: string; name: string }) => {
        const date = new Date(comments.createdAt);
        const formattedDate = date.toLocaleString("ja-JP", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const commentText = comments.comment;
        const name = comments.name;
        return { createdAt: formattedDate, comment: commentText, name: name };
      }
    );

  //ユーザ情報取得
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/userdata/${userCookieData}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers([data]);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    })();
  }, [userCookieData]);

  const nickName = users.map((user) => {
    return user.nick_name;
  });

  const onCommentSending = async () => {
    if (comment) {
      const res = await fetch(`http://localhost:8000/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: comment,
          createdAt: now,
          name: nickName[0],
          user_id: Number(userCookieData),
          product_id: Number(detailItems[0].id),
        }),
      });
      const data = await res.json();
      setCommentData([...commentData, data]);
      setComment("");
    }
  };

  return (
    <Box mt={8} sx={{ textAlign: "center", maxWidth: 900, overflow: "hidden",backgroundImage: "url(../public/beig.jpeg)",p:10 }}>
      {cartId.length >= 1 && (
        <Box
          sx={{
            backgroundColor: "#dc143c",
            color: "white",
            py: 2,
            fontFamily: "Helvetica",
            fontSize: 30,
            fontWeight: "bold",
            width: "250px",
            borderRadius: 3,
            p: 2,
            m: "auto",
          }}
        >
          <LocalMallIcon sx={{ mr: 2 }} />
          SOLD OUT
          <LocalMallIcon sx={{ ml: 2 }} />
        </Box>
      )}
      {detailItems.map((item: Items) => (
        <Box
          key={item.id}
          sx={{
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia
              sx={{
                height: 500,
                width: 450,
                backgroundSize: "93%",
              }}
              image={item.image}
            />
          </Box>
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
            <Box
              sx={{
                textAlign: "right",fontWeight: "bold",color: "#000",overflow: "hidden",
              }}
            >
              <Button sx={{ color: "#000" }} onClick={onLikeFlag}>
                お気に入りに登録
                {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </Button>
            </Box>
            <ListItem>
              <ListItemText
                primary={`¥${item.price?.toLocaleString()}`}
                primaryTypographyProps={{
                  variant: "h4",
                  component: "p",
                  color: "primary.main",
                }}
                sx={{ textAlign: "center" }}
              />
              <Typography variant="body2" color="textSecondary">
                (税込)
              </Typography>
            </ListItem>
          </List>
          <Card sx={{ MaxWidth: 700, m: "auto", px: 5, pb: 5 }}>
            <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
              商品の説明
            </Divider>
            <Typography sx={{ MaxWidth: 600, m: "auto", mt: 5 }}>
              {item.description}
            </Typography>
            <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
              カテゴリー
            </Divider>
            <Typography sx={{ maxWidth: 500, m: "auto", mt: 5 }}>
              {item.category}
            </Typography>
            <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
              商品の状態
            </Divider>
            <Typography sx={{ maxWidth: 500, m: "auto", mt: 5 }}>
              {item.product_state}
            </Typography>
            <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
              ブランド
            </Divider>
            <Typography sx={{ maxWidth: 500, m: "auto", mt: 5 }}>
              {item.product_brand}
            </Typography>
            <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
              発送までの日数
            </Divider>
            <Typography sx={{ maxWidth: 500, m: "auto", mt: 5 }}>
              {item.product_days}
            </Typography>
          </Card>
          <Button
            variant="contained"
            onClick={setCartClick}
            disableElevation
            sx={{ marginTop: 10 }}
          >
            カートに入れる
          </Button>
        </Box>
      ))}
      {commentData && cartId.length === 0 ? (
        <>
          <Box sx={{ textAlign: "left", mt: 5 }}>
            コメント({comments.length ? comments.length : 0})
          </Box>
          {comments.length >= 1 &&
            comments.map((data: CommentType, index: number) => {
              return (
                <Box key={index}>
                  <Card
                    sx={{
                      backgroundColor: "#e7e7eb",
                      p: 1,
                      mb: 1,
                      textAlign: "left",
                    }}
                  >
                    <Box>
                      <Box>
                        <span>{index + 1}.&ensp;</span>
                        <span>{data.createdAt.toLocaleString()}</span>{" "}
                        &ensp;&ensp;
                        <span>{data.name}</span>
                      </Box>
                      <Box sx={{ backgroundColor: "#fff", p: 2 }}>
                        {data.comment}
                      </Box>
                    </Box>
                  </Card>
                </Box>
              );
            })}
          <Comment
            comment={comment}
            setComment={setComment}
            onCommmentSending={onCommentSending}
          />
        </>
      ) : (
        <></>
      )}
      <SellerInformation
        detailItems={detailItems}
        setDetailItems={setDetailItems}
      />
    </Box>
  );
};

export default ProductDetail;
