export type Address = {
  address1?: string;
  address2?: string;
  address3?: string;
  kana1?: string;
  kana2?: string;
  kana3?: string;
  prefcode?: string;
  zipcode?: string;
};

export type AddressResult={
  [key:string]:Address
}

export type Items = {
  id?: number;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
  user_id?: number;
  size_id?: number;
  shopping_date?: Date;
  shopping_price?: number;
  product_state?: string
  product_brand?: string
  product_days?: string
  category?: string
};