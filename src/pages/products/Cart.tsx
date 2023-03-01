import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { padding } from '@mui/system';

const TAX_RATE = 0.1;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function Cart() {
  return (
    <Box>
    <Box  sx={{borderBottom:1}}>購入内容の確認</Box>
    <TableContainer component={Paper} sx={{marginTop:5}}>
      <Table sx={{minWidth:650}} aria-label="spanning table">
        <TableHead >
          <TableRow >
            <TableCell sx={{ fontWeight:"bold"}}>カートに入っている商品</TableCell>
            <TableCell align="right"  sx={{ fontWeight:"bold"}}>金額</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
{/* //map */}
            <TableRow >
              <TableCell>{'商品をここに入れる'}</TableCell>
              <TableCell align="right">{"金額入力"}</TableCell>
            </TableRow>

          <TableRow>
            <TableCell colSpan={2}>合計</TableCell>
            <TableCell align="right">合計金額(税込)</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}