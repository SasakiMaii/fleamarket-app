import { Box, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'


const Favorite = () => {
  return (
    <>
    <Box mb={5}>いいねした商品</Box>
    <List sx={{display:"flex" ,justifyContent:"space-between",alignItems:"center" ,border:1}}>
      {/* mapで表示 */}
      <ListItem>
      <ListItem>
        <ListItemText primary="商品名" secondary="画像" sx={{width:200}}/>
      </ListItem>
      <ListItem>
        <ListItemText>リンク</ListItemText>
      </ListItem>
      </ListItem>
    </List>
    </>
  )
}

export default Favorite