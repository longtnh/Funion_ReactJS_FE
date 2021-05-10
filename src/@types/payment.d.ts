interface Payment {
  userId: string
  balance: string
  donateHistory: DonateHistory[]
  paymentHistory: PaymentHistory[]
  createdDate: string
}
interface DonateHistory {
  id: string
  type: string
  amount: number
  createDate: string
  userId: string
  streamSessionId: string
}
interface PaymentHistory {
  id: string
  type: string
  amount: number
  createDate: string
  paymentMethod: string
}
