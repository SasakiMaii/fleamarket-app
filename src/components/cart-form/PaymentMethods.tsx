import { Box, Select } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

const options = [
  { value: 'クレジットカード', label: 'クレジットカード' },
  { value: 'コンビニ払い', label: 'コンビニ払い (手数料300円別途負担)' },
];

type PaymentMethodsProps={
  selectedOption:string;
  setSelectedOption:Dispatch<SetStateAction<string>>;
}

const PaymentMethods = (props:PaymentMethodsProps) => {
  const{selectedOption,setSelectedOption}=props

  return (
    <Box>
      <FormControl component="fieldset">
  <RadioGroup
    aria-label="options"
    name="options"
    value={selectedOption}
    onChange={(event) => setSelectedOption(event.target.value)}
  >
    {options.map((option) => (
      <FormControlLabel
        key={option.value}
        value={option.value}
        control={<Radio />}
        label={option.label}
      />
    ))}
  </RadioGroup>
</FormControl>
    </Box>
  )
}

export default PaymentMethods