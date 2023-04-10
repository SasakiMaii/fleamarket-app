import { Box, Link } from "@mui/material";

const PaymentCompletion = () => {
  return (
    <>
      <Box m={5} sx={{fontSize:"30px",fontWeight:"bold"}}>ご購入ありがとうございました🎉</Box>
      <Box m={5}>商品到着までしばらくお待ちください。</Box>
      <Link href="/">TOPへ戻る</Link>
    </>
  );
};

export default PaymentCompletion;
