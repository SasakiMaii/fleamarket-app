import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import BrandInput from "../../components/listing-form/BrandInput";
import DetailMessageText from "../../components/listing-form/DetailMessageText";
import ItemCategorySelect from "../../components/listing-form/ItemCategorySelect";
import ItemConditionSelect from "../../components/listing-form/ItemConditionSelect";
import ItemDaysSelect from "../../components/listing-form/ItemDaysSelect";
import ItemImageSelect from "../../components/listing-form/ItemImageSelect";
import ItemNameInput from "../../components/listing-form/ItemNameInput";
import PriceInput from "../../components/listing-form/PriceInput";
import { useNavigate } from "react-router-dom";
import { secretKey } from "../users/Login";
import CryptoJS from "crypto-js";

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
  const [userCookieData, setUserCookieData] = useState<any>([]);
  const navigate = useNavigate();
  const now = new Date();

  //cookie復号
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
    if (document.cookie) {
      const decording = decrypts(encryptedData);
      const Cookiedata = JSON.parse(decording);
      setUserCookieData(Cookiedata);
    }
  }, []);

  const handleImageChange = (event: any) => {
    const selectedFile = event.target.files[0];
    //ファイルの読み込みを可能にする
    const reader: any = new FileReader();
    //指定したファイルをURL形式で読み込む
    reader.readAsDataURL(selectedFile);
    //ファイルの読み込みが成功したか失敗したかを示すプロパティ。成功したらitemimageにセットする
    reader.onloadend = () => {
      setItemImage(reader.result);
    };
    setItemImageName([selectedFile]);
  };
  //画像削除
  const clearImage = () => {
    setItemImage("");
  };
//画像のバリデーション
const validateImage = () => {
  const imageSizeLimit = 5 * 100 * 140;
    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (itemImageName[0]?.size > imageSizeLimit) {
      setImageError("*画像のサイズが大きいです");
      return false;
    }
    if (!allowedImageTypes.includes(itemImageName[0]?.type)) {
      setImageError("*送信できるファイルの形式は、「.jpeg/.jpg/.png」です。");
      return false;
    }
    setImageError("");
    return true;
  };

  //名前のバリデーション
  const ValidateName = () => {
    if (!itemName) {
      setNameErr("*商品名を入力してください");
      return false;
    }
    if (itemName.length >= 12) {
      setNameErr("*タイトルは12文字未満で入力してください");
      return false;
    }
    setNameErr("");
    return true;
  };
  //説明らんのバリデーション
  const ValidateDetailMessage = () => {
    if (!detailMessage) {
      setDetailMessageErr("*商品の説明を入力してください");
      return false;
    }
    setDetailMessageErr("");
    return true;
  };
  //値段のバリデーション
  const ValidatePrice = () => {
    if (!price) {
      setPriceErr("*商品の金額を入力してください");
      return false;
    }
    setPriceErr("");
    return true;
  };

  console.log(itemName)
  //登録処理
  const submitRegister = async (e: any) => {
    e.preventDefault();
    let isNameValid = ValidateName();
    let isDetailMessageValid = ValidateDetailMessage();
    let isPriceVarlid = ValidatePrice();
    const isImageValid = validateImage();

    if (isDetailMessageValid && isNameValid && isPriceVarlid && isImageValid) {
      try {
        const response = await fetch("http://localhost:8000/items", {
          method: "POST",
          body: JSON.stringify({
            name:itemName,
            price: Number(price),
            image: itemImage || "",
            description: detailMessage,
            shopping_date: now,
            product_state: itemCondition,
            product_brand: brand || "",
            product_days: itemDays,
            category: itemCategory,
            user_id: Number(userCookieData),
            size_id: 1,
            shopping_price: 1,
            state: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        navigate("/");
      } catch (err) {
        console.log(err, "エラー");
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: "url(../public/beig.jpg)",
        maxWidth: 1500,
        px: 20,
        mt: 10,
        py: 3,
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          fontSize: 20,
          fontWeight: "bold",
          my: 6,
          backgroundColor: "#fffffc",
          py: 2,
          borderRadius: 3,
          mb: 8,
        }}
      >
        商品の出品
      </Box>
      <form onSubmit={submitRegister}>
      {imageError && <p style={{ color: "red", fontSize: 13 }}>{imageError}</p>}
        <ItemImageSelect
          itemImage={itemImage}
          setItemImage={setItemImage}
          handleImageChange={handleImageChange}
          itemImageName={itemImageName}
          setItemImageName={setItemImageName}
          text="商品の画像"
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
          sx={{
            mt: 5,
            backgroundColor: "#27B3B2",
            "&:hover": {
              backgroundColor: "#1D738E",
            },
          }}
          onClick={submitRegister}
        >
          出品する
        </Button>
      </form>
    </Box>
  );
};

export default ProductRegistration;
