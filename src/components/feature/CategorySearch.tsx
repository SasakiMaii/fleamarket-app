import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ItemCategorySelect from "../listing-form/ItemCategorySelect";
import { Items } from "../../types/type";
import { Button } from "@mui/material";

type CategorySerchProps = {
  itemCategory: string;
  setItemcategory: React.Dispatch<React.SetStateAction<string>>;
  items: Items[];
  setItems: React.Dispatch<React.SetStateAction<Items[]>>;
};

const CategorySearch = (props: CategorySerchProps) => {
  const { itemCategory, setItemcategory, items, setItems } = props;

  //Item情報
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8000/items");
      const data = await res.json();
      setItems(data);
    })();
  }, [itemCategory]);
  //選んだカテゴリーの商品を表示
  
  console.log(items,"items!!");
  console.log(itemCategory)
  
  const onItemSelect = () => {
    const filteredItems = items.filter((item) => item.category === itemCategory);
    setItems(filteredItems);
  };
  
  const onSelectReset=()=>{
    (async () => {
      const res = await fetch("http://localhost:8000/items");
      const data = await res.json();
      setItems(data);
    })();
    setItemcategory("")
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end">
      <ItemCategorySelect
        itemCategory={itemCategory}
        setItemCategory={setItemcategory}
      />
      <Box ml={2}>
        <Button
          sx={{
            backgroundColor: "#82ae46",
            p: 0,
            color: "#fff",
            fontWeight: "bold",
            mt: 1,
            "&:hover": {
              backgroundColor: "#669934",
            },
          }}
          onClick={onItemSelect}
        >
          検索
        </Button>
      </Box>
      <Box ml={2}>
        <Button
          sx={{
            backgroundColor: "#82ae46",
            p: 0,
            color: "#fff",
            fontWeight: "bold",
            mt: 1,
            mr: 2,
            "&:hover": {
              backgroundColor: "#669934",
            },
          }}
          onClick={onSelectReset}
        >
          リセット
        </Button>
      </Box>
    </Box>
  );
};

export default CategorySearch;
