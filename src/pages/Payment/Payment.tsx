import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Select,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentData } from '../Payment/payment.thunk'
import AmountLabel from '@/pages/Payment/components/AmountLabel/AmountLabel'
import PaymentMethodBtn from './components/PaymentMethodBtn/PaymentMethodBtn'
import TopUpPriceBtn from './components/TopUpPriceBtn/TopUpPriceBtn'
import { COLOR } from '@/constants/styles'
import { axiosT5 } from '@/axios/axiosTeam5'
import MenuLink from './components/MenuLink/MenuLink'

const Payment = () => {
  const dispatch = useDispatch()
  const isSideBarCollapsed = useSelector(
    (state: AppState) => state.app.isSideBarCollapsed,
  )
  const userPayment = useSelector((state: AppState) => state.payment.payments)
  const toast = useToast()
  const [logoPayment] = useState(['momo', 'paypal', 'zaloPay', 'airPay'])
  const [activePaymentMethod, setActivePaymentMethod] = useState('')
  const [amountList] = useState([10000, 20000, 50000, 100000, 200000, 500000])
  const [activeAmount, setActiveAmount] = useState(0)
  const [orderInfo] = useState('Thanh toan nap tien FUnion')

  useEffect(() => {
    dispatch(getPaymentData())
  }, [dispatch])

  const onSelectPaymentMethod = item => {
    activePaymentMethod === item
      ? setActivePaymentMethod('')
      : setActivePaymentMethod(item)
  }

  const onSelectAmount = item => {
    activeAmount === item ? setActiveAmount(0) : setActiveAmount(item)
  }

  const onClickTopUp = async () => {
    if (activePaymentMethod === '') {
      toast({
        description: 'Please choose a payment method!',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
    } else if (activeAmount === 0) {
      toast({
        description: 'Please Select Top-Up Amount!',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
    } else if (activePaymentMethod !== 'momo') {
      toast({
        description: 'This payment method is not yet supported!',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
    } else {
      var url = await axiosT5.post(
        `/payment-api/api/v1/Payment/momopayment?orderInfo=` +
          orderInfo +
          `&amount=` +
          activeAmount,
      )
      window.location.replace(url.data.forwardUrl)
    }
  }

  return (
    <Box py={3} px={{ base: 3, sm: 6, lg: 9 }}>
      {/* Menu payment */}
      <Flex
        w="full"
        py={1}
        justify="space-between"
        direction={{ base: 'column', md: 'row' }}
        display={{ base: 'block', md: 'flex' }}
        align="center"
      >
        <Box display={{ base: 'block', md: 'flex' }}>
          <MenuLink to="">Coin top up</MenuLink>
          <MenuLink to="">Withdrawal</MenuLink>
        </Box>
        <AmountLabel price={userPayment && userPayment.balance} />
      </Flex>
      <Divider />

      {/* Payment method */}
      <Box w="full" py={2}>
        <Flex
          w="full"
          align="center"
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
        >
          <Text fontSize="lg">Payment Method:</Text>
          <HStack>
            <Text minW={28} fontSize="lg">
              Current Area:
            </Text>
            <Select size="sm">
              <option value="option1">VietNam</option>
            </Select>
          </HStack>
        </Flex>

        <SimpleGrid
          columns={{ sm: 3, md: 4, lg: isSideBarCollapsed ? 7 : 6 }}
          spacing={2}
        >
          {logoPayment.map((item: any, index) => (
            <PaymentMethodBtn
              key={index}
              logo={item}
              handleClick={onSelectPaymentMethod}
              isActive={activePaymentMethod === item}
            />
          ))}
        </SimpleGrid>
      </Box>
      <Divider />

      {/* Select Amount */}
      <Box py={3}>
        <Text fontSize="lg">Select Top-Up Amount: (VND)</Text>
        <SimpleGrid
          mt={3}
          spacing={6}
          columns={{ sm: 3, md: 4, lg: isSideBarCollapsed ? 7 : 5 }}
        >
          {amountList.map((item: any, index) => (
            <TopUpPriceBtn
              key={index}
              amount={item}
              handleClick={onSelectAmount}
              isActive={activeAmount === item}
            />
          ))}
        </SimpleGrid>
      </Box>

      {/* Total Amount */}
      <Box>
        <Text fontSize="md">
          You may need to pay more than the amount shown due to factors such as the
          exchange rate and taxes.
        </Text>
        <HStack spacing={2}>
          <Text fontSize="md">Select Top-Up Amount:</Text>
          <AmountLabel price={activeAmount / 100} />
        </HStack>
        <Button
          mt={2}
          p={5}
          bg={COLOR.PAYMENT_YELLOW}
          color="black"
          _hover={{ bg: '#EDFB55' }}
          onClick={onClickTopUp}
        >
          <Text fontSize="md">Top-Up Now</Text>
        </Button>
      </Box>
    </Box>
  )
}

export default Payment
