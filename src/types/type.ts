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