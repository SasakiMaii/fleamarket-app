import { Box, Card, CardMedia, Link } from '@mui/material';
import { Users } from '@prisma/client';
import React, { useState,useEffect } from 'react'

type SellerProps={
  detailItems:any,
  setDetailItems:any
}

const SellerInformation = (props:SellerProps) => {
  const {detailItems,setDetailItems}=props
  const [users, setUsers] = useState<Users[]>([]);

    //ユーザ情報取得
useEffect(()=>{
  (async()=>{
    try {
      const response = await fetch(`http://localhost:8000/user`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  })()
},[])
console.log(users)
    //出品したユーザー（itemsのuser_idとクッキーのidが一致）
    const seller = users.filter((user) => {
      return user.id === detailItems[0]?.user_id;
    });
    console.log(seller);
  return (
    <>
    <Box sx={{ m: 1 ,fontWeight:"bold",mt:10}}>出品者情報</Box>
      {seller.length >= 1 &&
        seller.map((user) => {
          return (
            <Card sx={{ p: 3, width: 400, textAlign: "center", m: "auto"  ,pt:2 }}>
              {user.image&&
              <CardMedia
              sx={{
                height: 110,
                width: "100%",
                flex: "1",
                py: 4,
                backgroundSize: 150,
                borderBottom: 1,
              }}
              image={user.image}
              />
            }
              <Box sx={{ pb: 1 }}>{user.nick_name} </Box>
              <Box sx={{ pb: 1 }}>{user.profile}</Box>
              <Link>レビューを見る</Link>
            </Card>
          );
        })}
    </>
  )
}

export default SellerInformation