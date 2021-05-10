interface StreamSession {
  id: string
  streamerIdentityGuid: string
  streamerName: string
  streamerImageUrl: string
  title: string
  announcement: string
  viewCount: number
  streamUrlSource: string
  streamUrl480P: string
  streamUrl720P: string
  thumbnailImage: string
  followers?: string
  language: Language
  category: StreamSessionCategory
  tags: Tag[]
  createdDate: Date
}
interface Language {
  id: string
  name: string
}
interface StreamConfig {
  serverUrl: string
  streamKey: string
}
interface ReqStreamSession {
  title: string
  announcement: string
  languageName: string
  categoryGuid: string
  subEventId: string
  tags: Tag[]
}

interface Game {
  name: string
  image: string
}

interface StreamSessionSearchResult {
  id: string
  streamerIdentityGuid: string
  streamerName: string
  streamerImageUrl: string
  title: string
  viewCount: number
  thumbnailImage: string
  tags: Tag[]
  createdDate: Date
}
