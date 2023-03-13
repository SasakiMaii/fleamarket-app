import { Theme } from "@mui/material";
import React from "react";

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

export type AddressResult = {
  [key: string]: Address;
};

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
  product_state?: string;
  product_brand?: string;
  product_days?: string;
  category?: string;
};

export type Users = {
  id?: number;
  nick_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  profile?: string;
  image?: string;
  phone?: number;
  postal_code?: string;
  prefecture?: string | Address;
  city?: string | Address;
  street?: string | Address;
  bilding?: string;
};

export interface Session {
  isLoggedIn: boolean;
  user: Users | null;
}

export interface SessionContextValue {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export interface SessionContextType {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

export interface StylesProps {
  root: {
    width: string;
  };
  heading: {
    fontSize: string;
    fontWeight: Theme["typography"]["fontWeightRegular"];
  };
}

export type Likes = {
  id: number;
  name: string;
  price: number;
  user_id?: number;
  like_date: Date;
  product_id?:number;
  category?: string;
  image?: string;
};

export type CartType ={
  map: any;
  id: number;
  name: string;
  price: number;
  user_id?: number;
  cart_date: Date;
  product_id?:number;
  category?: string;
  image?: string;
}

// export type VaridateProps = {
//   nameError: string;
//   setNameError: Dispatch<SetStateAction<string>>;
//   emailError: string;
//   setEmailError: Dispatch<SetStateAction<string>>;
//   phoneError: string;
//   setPhoneError: Dispatch<SetStateAction<string>>;
//   profileError: string;
//   setProfileError: Dispatch<SetStateAction<string>>;
//   addressError: string;
//   setAddressError: Dispatch<SetStateAction<string>>;
//   postalCodeError: string;
//   setPostalCodeError: Dispatch<SetStateAction<string>>;
//   passwordError: string;
//   setPasswordError: Dispatch<SetStateAction<string>>;
//   email: string;
//   setEmail: Dispatch<SetStateAction<string>>;
//   password: string;
//   setPassword: Dispatch<SetStateAction<string>>;
//   postalCode: string;
//   setPostalCode: Dispatch<SetStateAction<string>>;
//   prefectuer: string;
//   setPrefectuer: Dispatch<SetStateAction<string>>;
//   city: string;
//   setCity: Dispatch<SetStateAction<string>>;
//   street: string;
//   setStreet: Dispatch<SetStateAction<string>>;
//   firstName: string;
//   setFirstName: Dispatch<SetStateAction<string>>;
//   lastName: string;
//   setLastName: Dispatch<SetStateAction<string>>;
//   phone: string;
//   setPhone: Dispatch<SetStateAction<string>>;
//   postalCodeData:any;
// };
