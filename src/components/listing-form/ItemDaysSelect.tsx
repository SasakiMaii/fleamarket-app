import React, { Dispatch, SetStateAction } from 'react'
import { Box } from '@mui/system';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

type ItemDaysProps={
  itemDays:string;
  setItemDays:Dispatch<SetStateAction<string>>;
}

const ItemDaysSelect = (props:ItemDaysProps) => {
  const {itemDays,setItemDays}=props
  return (
    <Box>
      <InputLabel  id="days-label"  sx={{mt:2,fontWeight:"bold",mb: 2 }} >
          発送までの日数
        </InputLabel>
        <Select
          id="condition"
          onChange={(e: SelectChangeEvent) => setItemDays(e.target.value)}
          value={itemDays}
          sx={{ mb: 5,backgroundColor:"#fffffc" }}
          aria-labelledby="days-label"
        >
          <MenuItem value="1~2日で発送">1~2日で発送</MenuItem>
          <MenuItem value="2~3日で発送">2~3日で発送</MenuItem>
          <MenuItem value="4~7日で発送">4~7日で発送</MenuItem>
        </Select>
    </Box>
  )
}

export default ItemDaysSelect