import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import BrandInput from "../../components/listing-form/BrandInput";
import DetailMessageText from "../../components/listing-form/DetailMessageText";
import ItemCategorySelect from "../../components/listing-form/ItemCategorySelect";
import ItemConditionSelect from "../../components/listing-form/ItemConditionSelect";
import ItemDaysSelect from "../../components/listing-form/ItemDaysSelect";
import ItemImageSelect from "../../components/listing-form/ItemImageSelect";
import ItemNameInput from "../../components/listing-form/ItemNameInput";
import PriceInput from "../../components/listing-form/PriceInput";
import { useNavigate } from 'react-router-dom';
import { secretKey } from "../users/Login";


const ProductRegistration = () => {
  const [itemName, setItemName] = useState("");
  const [detailMessage, setDetailMessage] = useState("");
  const [itemCondition, setItemCondition] = useState("新品未使用");
  const [itemCategory, setItemCategory] = useState("その他");
  const [brand, setBrand] = useState("その他");
  const [price, setPrice] = useState("");
  const [itemDays, setItemDays] = useState("1~2日で発送");
  const [itemImage, setItemImage] = useState("");
  const [itemImageName, setItemImageName] = useState<any>("");

  const [nameErr, setNameErr] = useState("");
  const [detailMessageErr, setDetailMessageErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [imageError, setImageError] = useState("");
  const navigate=useNavigate()



  const now = new Date();

  const handleImageChange=(event: any)=> {
    const selectedFile = event.target.files[0];
    const reader: any = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setItemImage(reader.result);
    };
    setItemImageName([selectedFile]);
  }

  const clearImage=()=>{
    setItemImage("")
  }

  const validateImage=()=>{
    const imageSizeLimit = 5 * 1024 * 1024; // 最大5MB
    const allowedImageTypes = ['image/png', 'image/jpeg','image/jpg'];
    if(itemImageName[0].size>imageSizeLimit){
      setImageError("*画像のサイズが大きいです")
      return false
    }
    if (!allowedImageTypes.includes(itemImageName[0].type)){
      setImageError("*送信できるファイルの形式は、「.jpeg/.jpg/.png」です。")
      return false
    }
    setImageError("")
    return true
  }

  const ValidateName = () => {
    if (!itemName) {
      setNameErr("*商品名を入力してください");
      return false;
    }
    setNameErr("");
    return true;
  };
  const ValidateDetailMessage = () => {
    if (!detailMessage) {
      setDetailMessageErr("*商品の説明を入力してください");
      return false;
    }
    setDetailMessageErr("");
    return true;
  };
  const ValidatePrice = () => {
    if (!price) {
      setPriceErr("*商品の金額を入力してください");
      return false;
    }
    setPriceErr("");
    return true;
  };


  const submitRegister = async (e: any) => {
    e.preventDefault();
    let isNameValid = ValidateName();
    let isDetailMessageValid = ValidateDetailMessage();
    let isPriceVarlid = ValidatePrice();
    const isImageValid=validateImage();

    if (isDetailMessageValid && isNameValid && isPriceVarlid&&isImageValid) {
      try {
        const response = await fetch("http://localhost:8000/items", {
          method: "POST",
          body: JSON.stringify({
            name: itemName,
            price: Number(price),
            image: itemImage||'',
            description: detailMessage,
            shopping_date: now,
            product_state: itemCondition,
            product_brand: brand||"",
            product_days: itemDays,
            category: itemCategory,
            user_id: 1,
            size_id: 1,
            shopping_price: 1,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        navigate('/')
      } catch (err) {
        console.log(err, "エラー");
      }
    }
  };

  return (
    <Box >
      <Box sx={{ fontSize: 20, fontWeight: "bold", my: 10 }}> 商品の出品</Box>
      <form onSubmit={submitRegister}>
        <ItemImageSelect
          itemImage={itemImage}
          setItemImage={setItemImage}
          handleImageChange={handleImageChange}
          itemImageName={itemImageName}
          setItemImageName={setItemImageName}
          text='商品の画像'
          clearImage={clearImage}
        />
        <ItemCategorySelect
          itemCategory={itemCategory}
          setItemCategory={setItemCategory}
        />
        {nameErr && <p style={{ color: "red", fontSize: 13 }}>{nameErr}</p>}
        <ItemNameInput itemName={itemName} setItemName={setItemName} />
        <BrandInput brand={brand} setBrand={setBrand} />
        {priceErr && <p style={{ color: "red", fontSize: 13 }}>{priceErr}</p>}
        <PriceInput price={price} setPrice={setPrice} />
        <ItemConditionSelect
          itemCondition={itemCondition}
          setItemCondition={setItemCondition}
        />
        <ItemDaysSelect itemDays={itemDays} setItemDays={setItemDays} />
        {detailMessageErr && (
          <p style={{ color: "red", fontSize: 13 }}>{detailMessageErr}</p>
        )}
        <DetailMessageText
          detailMessage={detailMessage}
          setDetailMessage={setDetailMessage}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          sx={{ mt: 5 }}
          onClick={submitRegister}
        >
          出品する
        </Button>
      </form>
    </Box>
  );
};

export default ProductRegistration;
