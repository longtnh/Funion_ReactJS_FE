import { Box, Button, Image } from '@chakra-ui/react'
import React from 'react'
import { COLOR } from '@/constants/styles'
import momo from '@/assets/images/momo.png'
import paypal from '@/assets/images/Paypal.png'
import zaloPay from '@/assets/images/ZaloPay.png'
import airPay from '@/assets/images/AirPay.png'

const PaymentMethodBtn = ({ logo, isActive, handleClick }) => {
  let logoImg: {} | null | undefined
  switch (logo) {
    case 'momo':
      logoImg = <Image src={momo} boxSize={90} />
      break
    case 'paypal':
      logoImg = <Image src={paypal} boxSize={90} />
      break
    case 'zaloPay':
      logoImg = <Image src={zaloPay} boxSize={90} />
      break
    case 'airPay':
      logoImg = <Image src={airPay} boxSize={90} />
      break
    default:
      break
  }
  return (
    <Box w="full">
      <Button
        w={185}
        h={110}
        mr={30}
        mt={3}
        py={5}
        align="center"
        justify="center"
        borderRadius="10px"
        border={isActive && '2px'}
        borderColor={isActive && COLOR.PAYMENT_BLUE}
        onClick={() => handleClick(logo)}
      >
        {logoImg}
      </Button>
    </Box>
  )
}
export default PaymentMethodBtn
