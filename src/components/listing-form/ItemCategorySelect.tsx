import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/system";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

type ItemCategoryProps = {
  itemCategory: string;
  setItemCategory: Dispatch<SetStateAction<string>>;
};

const ItemCategorySelect = (props: ItemCategoryProps) => {
  const { itemCategory, setItemCategory } = props;

  return (
    <Box>
      <InputLabel id="category-label" sx={{ mb: 2 }}>
        カテゴリー
      </InputLabel>
      <Select
        id="category"
        onChange={(e: SelectChangeEvent) => setItemCategory(e.target.value)}
        value={itemCategory}
        sx={{ mb: 5 }}
        aria-labelledby="condition-label"
      >
        <MenuItem value="その他">その他</MenuItem>
        <MenuItem value="本・CD">本・CD</MenuItem>
        <MenuItem value="レディース服">レディース服</MenuItem>
        <MenuItem value="メンズ服">メンズ服</MenuItem>
        <MenuItem value="ベビー・キッズ">ベビー・キッズ</MenuItem>
        <MenuItem value="インテリア">インテリア</MenuItem>
        <MenuItem value="コスメ・香水・美容">コスメ・香水・美容</MenuItem>
        <MenuItem value="アクセサリー">アクセサリー</MenuItem>
        <MenuItem value="家電・スマホ・カメラ">家電・スマホ・カメラ</MenuItem>
        <MenuItem value="スポーツ・レジャー">スポーツ・レジャー</MenuItem>
        <MenuItem value="ハンドメイド">ハンドメイド</MenuItem>
        <MenuItem value="チケット">チケット</MenuItem>
        <MenuItem value="車・バイク関連">車・バイク関連</MenuItem>
      </Select>
    </Box>
  );
};

export default ItemCategorySelect;
