import { Avatar, Box, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { secretKey } from "../users/Login";
import CryptoJS from "crypto-js";
import { Review, Users } from "../../types/type";
import { Link, useParams } from "react-router-dom";

const EvaluationList = () => {
  const [userCookieData, setUserCookeData] = useState<any>([]);
  const [dates, setDates] = useState<Review[]>([]);
  const [review, setReview] = useState<Review[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const { id } = useParams();

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
        setUsers(data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    })();
  }, []);
  console.log(users, "user");

  //cookie復号
  const cookieData = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("data="));
  const encryptedData = cookieData ? cookieData.split("=")[1] : "";
  React.useEffect(() => {
    const decrypts = (data: string | CryptoJS.lib.CipherParams) => {
      const bytes = CryptoJS.AES.decrypt(String(data), secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    };
    if (document.cookie) {
      const decording = decrypts(encryptedData);
      const Cookiedata = JSON.parse(decording);
      setUserCookeData(Cookiedata);
    }
  }, []);

  //レビューの表示
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/itemreview/${id}`);
      const data = await res.json();
      console.log(data);
      // const newReview =data.reviews.map(
      //   (review: { createdAt: string | number | Date }) => {
      //     return {
      //       ...review,
      //       createdAt: new Date(review.createdAt),
      //     };
      //   }
      // );
      // const newDates = newReview.map(
      //   (review: { createdAt: { toLocaleString: () => any } }) =>
      //     review.createdAt.toLocaleString()
      // );
      setReview(data);
      // setDates(newDates);
    };
    fetchData();
  }, [userCookieData]);
  console.log(review, "re");

  // console.log(users[0]?.nick_name, "re");

  // const reviewDatas =review.map((review: { createdAt: any, comment: any,rating:number }) => {
  //   const date = new Date(review.createdAt);
  //   const formattedDate = date.toLocaleString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  //   const commentText = review.comment;
  //   const rating=review.rating;
  //   return {createdAt:formattedDate,comment: commentText,rating:rating};
  // });
  // console.log(reviewDatas)

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ my: 8, fontSize: "25px", fontWeight: "bold" }}>評価一覧</Box>
      {review.length >= 1 ? (
        review.map((data: any) => (
          <Box key={data.id}>
            {data.reviews.map((review: any) => {
              return (
                <Box
                  key={review.id}
                  sx={{ mb: 2, textAlign: "left", width: 500 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                    <Avatar
                      sx={{
                        width: "50px",
                        height: "50px",
                        backgroundSize: "200px",
                        mr: 2,
                      }}
                      alt="profile_image"
                    />
                    <Box mr={3}>{data.name}購入者</Box>
                    <Box mr={3}>&#9733;{review.rating}</Box>
                    <Box>{review.createdAt.toLocaleString()}</Box>
                  </Box>
                  <Box
                    sx={{ p: 2, backgroundColor: "#e6eae6", borderRadius: 5 }}
                  >
                    {review.comment}
                  </Box>
                </Box>
              );
            })}
          </Box>
        ))
      ) : (
        <>
          <Box>評価はありません。</Box>
          <Link to={"/"}>戻る</Link>
        </>
      )}
    </Box>
  );
};

export default EvaluationList;
