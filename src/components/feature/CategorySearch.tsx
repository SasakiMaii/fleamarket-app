import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ItemCategorySelect from "../listing-form/ItemCategorySelect";
import { Items } from "../../types/type";

const CategorySearch = () => {
  const [itemCategory, setItemcategory] = useState("");
  const [items, setItems] = useState<Items[]>([]);

  //Item情報
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8000/items");
      const data = await res.json();
      setItems(data);
    })();
  }, []);

  console.log(items);

  return (
    <Box>
      <ItemCategorySelect
        itemCategory={itemCategory}
        setItemCategory={setItemcategory}
      />
    </Box>
  );
};

export default CategorySearch;
