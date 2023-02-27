import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/material";
import { Address } from "../../types/type";

type AddressProps = {
  postalCodeData: Address;
};

const AddressInput = (props: AddressProps) => {
  const [prefectuer, setPrefectuer] = useState<string | number>("");
  const [street, setStreet] = useState<string | number>("");
  const [building, setBuilding] = useState<string | number>("");
  console.log(props.postalCodeData.address1, "あ");
  return (
    <div>
      <Box>
        <FormControl variant="standard" sx={{ m: 1, width: 1 / 2 }}>
          <InputLabel id="prefectuer">都道府県</InputLabel>
          <Select
            id="prefectuer"
            onChange={(e: SelectChangeEvent) => setPrefectuer(e.target.value)}
            label="都道府県"
            defaultValue="都道府県"
            value={props.postalCodeData.address1 || ""}
          >
            <MenuItem value="都道府県">都道府県を選択</MenuItem>
            <MenuItem value="北海道">北海道</MenuItem>
            <MenuItem value="青森県">青森県</MenuItem>
            <MenuItem value="岩手県">岩手県</MenuItem>
            <MenuItem value="宮城県">宮城県</MenuItem>
            <MenuItem value="秋田県">秋田県</MenuItem>
            <MenuItem value="山形県">山形県</MenuItem>
            <MenuItem value="福島県">福島県</MenuItem>
            <MenuItem value="茨城県">茨城県</MenuItem>
            <MenuItem value="栃木県">栃木県</MenuItem>
            <MenuItem value="群馬県">群馬県</MenuItem>
            <MenuItem value="埼玉県">埼玉県</MenuItem>
            <MenuItem value="千葉県">千葉県</MenuItem>
            <MenuItem value="東京都">東京都</MenuItem>
            <MenuItem value="神奈川県">神奈川県</MenuItem>
            <MenuItem value="新潟県">新潟県</MenuItem>
            <MenuItem value="富山県">富山県</MenuItem>
            <MenuItem value="石川県">石川県</MenuItem>
            <MenuItem value="福井県">福井県</MenuItem>
            <MenuItem value="山梨県">山梨県</MenuItem>
            <MenuItem value="長野県">長野県</MenuItem>
            <MenuItem value="岐阜県">岐阜県</MenuItem>
            <MenuItem value="静岡県">静岡県</MenuItem>
            <MenuItem value="愛知県">愛知県</MenuItem>
            <MenuItem value="三重県">三重県</MenuItem>
            <MenuItem value="滋賀県">滋賀県</MenuItem>
            <MenuItem value="京都府">京都府</MenuItem>
            <MenuItem value="大阪府">大阪府</MenuItem>
            <MenuItem value="兵庫県">兵庫県</MenuItem>
            <MenuItem value="奈良県">奈良県</MenuItem>
            <MenuItem value="和歌山県">和歌山県</MenuItem>
            <MenuItem value="鳥取県">鳥取県</MenuItem>
            <MenuItem value="島根県">島根県</MenuItem>
            <MenuItem value="岡山県">岡山県</MenuItem>
            <MenuItem value="広島県">広島県</MenuItem>
            <MenuItem value="山口県">山口県</MenuItem>
            <MenuItem value="徳島県">徳島県</MenuItem>
            <MenuItem value="香川県">香川県</MenuItem>
            <MenuItem value="愛媛県">愛媛県</MenuItem>
            <MenuItem value="高知県">高知県</MenuItem>
            <MenuItem value="福岡県">福岡県</MenuItem>
            <MenuItem value="佐賀県">佐賀県</MenuItem>
            <MenuItem value="長崎県">長崎県</MenuItem>
            <MenuItem value="熊本県">熊本県</MenuItem>
            <MenuItem value="大分県">大分県</MenuItem>
            <MenuItem value="宮崎県">宮崎県</MenuItem>
            <MenuItem value="鹿児島県">鹿児島県</MenuItem>
            <MenuItem value="沖縄県">沖縄県</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div>
        <label htmlFor="street"></label>
        <TextField
          type="text"
          id="street"
          label="市区都"
          value={props.postalCodeData.address2 || ""}
          fullWidth
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStreet(e.target.value)
          }
        />
        <label htmlFor="street2"></label>
        <TextField
          type="text"
          id="street2"
          label="町村番地"
          value={props.postalCodeData.address3 || ""}
          fullWidth
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStreet(e.target.value)
          }
        />
      </div>
      <div>
        <label htmlFor="building"></label>
        <TextField
          type="text"
          id="building"
          label="建物名"
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBuilding(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default AddressInput;
