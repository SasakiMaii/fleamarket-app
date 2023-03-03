import React, { Dispatch, SetStateAction } from 'react'
import { Box } from '@mui/system';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

type ItemConditionProps={
  itemCondition:string;
  setItemCondition:Dispatch<SetStateAction<string>>;
}

const ItemConditionSelect = (props:ItemConditionProps) => {
  const {itemCondition,setItemCondition}=props
  return (
    <Box>
       <InputLabel id="condition-label" sx={{ mb: 2 }}>
          商品の状態
        </InputLabel>
        <Select
          id="condition"
          onChange={(e: SelectChangeEvent) => setItemCondition(e.target.value)}
          value={itemCondition}
          sx={{ mb: 5 }}
          aria-labelledby="condition-label"
        >
          <MenuItem value="新品未使用">新品未使用</MenuItem>
          <MenuItem value="未使用に近い">未使用に近い</MenuItem>
          <MenuItem value="目立った傷や汚れはなし">
            目立った傷や汚れはなし
          </MenuItem>
          <MenuItem value="やや傷や汚れなし">やや傷や汚れなし</MenuItem>
          <MenuItem value="やや傷や汚れあり">やや傷や汚れあり</MenuItem>
          <MenuItem value="傷や汚れあり">傷や汚れあり</MenuItem>
          <MenuItem value="全体的に状態が悪い">全体的に状態が悪い</MenuItem>
        </Select>
    </Box>
  )
}

export default ItemConditionSelect