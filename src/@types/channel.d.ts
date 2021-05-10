interface Channel {
  userId: string
  name: string
  category: string
  imageUrl: string
  isLive: boolean
  viewer: number
}

interface FollowingUsers {
  key: string
  value: any
}

interface FollowingChannels {
  keyChannel: string
  valueChannel: any
}
