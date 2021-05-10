import { axiosT5 } from '@/axios/axiosTeam5'
import team5_screen1 from '@/assets/images/team5_screen1.jpg'
import team5_screen2 from '@/assets/images/team5_screen2.jpg'
import team5_screen3 from '@/assets/images/team5_screen3.jpg'
import team5_screen4 from '@/assets/images/team5_screen4.jpg'
import team5_screen5 from '@/assets/images/team5_screen5.jpg'
import team5_screen6 from '@/assets/images/team5_screen6.jpg'

const fakeStreams: StreamSession[] = [
  {
    id: '1',
    streamerIdentityGuid: '100',
    streamerName: 'Công tác sinh viên FUDN',
    streamerImageUrl:
      'https://scontent-xsp1-1.xx.fbcdn.net/v/t1.6435-9/177382474_828452067768605_483226722478740359_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=730e14&_nc_ohc=uuZLRrQhcH0AX8xV2nB&_nc_ht=scontent-xsp1-1.xx&oh=ea5cd531698512bdff0b3ae48c5b0151&oe=60AA9A19',
    title: 'Talk Show "Open the door to the world',
    announcement:
      'Các bạn sinh viên ĐH FPT Đà Nẵng có cơ hội tìm kiếm câu trả lời cho bài toán “Làm thế nào để trở thành công dân toàn cầu” cùng với anh Võ Ngọc Hiền - trưởng phòng Hợp Tác Quốc Tế.',
    viewCount: 2322,
    streamUrlSource: '',
    streamUrl480P: '',
    streamUrl720P: '',
    thumbnailImage: team5_screen1,
    // thumbnailImage:
    //   'https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/168505421_815757455704733_8338759473369746637_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=730e14&_nc_ohc=uoOpQu61evwAX_rYkCQ&_nc_ht=scontent-hkg4-2.xx&oh=f9a529e647cd05e00b03b5d78d2de9a9&oe=608E1BFD',
    language: {
      name: 'vie',
      id: '2',
    },
    category: { id: '123', name: 'Show' },
    tags: [
      {
        id: '1',
        name: 'TalkShow',
      },
      {
        id: '2',
        name: 'Serminar',
      },
    ],
    createdDate: new Date('2021-03-21T05:01:07.4432'),
    followers: '5,5M',
  },
  {
    id: '2',
    streamerIdentityGuid: '100',
    streamerName: 'NYS Club FUDN',
    streamerImageUrl:
      'https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/174771150_828452027768609_1512494845431732052_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=730e14&_nc_ohc=RVwL16uJywEAX_b9CPL&_nc_ht=scontent.fdad2-1.fna&oh=458cf8f8c4338d57d595accd38ed3fe9&oe=60AB648E',
    title: 'Chương trình "1591" ',
    announcement:
      'Đây là sự kiện khai xuân Tân Sửu 2021, với mong muốn mang đến món quà tinh thần nho nhỏ cho mọi người.',
    viewCount: 1023,
    streamUrlSource: '',
    streamUrl480P: '',
    streamUrl720P: '',
    thumbnailImage: team5_screen2,
    // thumbnailImage:
    //   'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/168679967_815757462371399_8358111377858551026_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=730e14&_nc_ohc=EI0U5wGd5GsAX-YI-FQ&_nc_ht=scontent-hkg4-1.xx&oh=c3639a82384815f4ab713491c69dfa79&oe=608D2BA7',
    language: {
      name: 'vie',
      id: '2',
    },
    category: { id: '123', name: 'Club Activate' },
    tags: [
      {
        id: '1',
        name: 'Music',
      },
      {
        id: '2',
        name: 'Dance',
      },
      {
        id: '4',
        name: 'Sing',
      },
      {
        id: '9',
        name: 'Club',
      },
    ],
    createdDate: new Date('2021-03-21T05:01:07.4432'),
    followers: '5,5M',
  },
  {
    id: '3',
    streamerIdentityGuid: '100',
    streamerName: 'CLB FU Dever',
    streamerImageUrl:
      'https://scontent.fdad1-1.fna.fbcdn.net/v/t1.6435-9/177741343_829735927640219_8064225653390551686_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=730e14&_nc_ohc=nU6q-k5sY6oAX9WRYkf&_nc_ht=scontent.fdad1-1.fna&oh=5e3b7f0c501b562e86703cc1463cb95d&oe=60ACFA3C',
    title: 'Chương trình họp mặt và hái lộc đầu xuân',
    announcement:
      'Những hoạt động đặc trưng của ngày Tết cổ truyền được thu nhỏ lại trong lòng các thành viên của CLB FU Dever.',
    viewCount: 3254,
    streamUrlSource: '',
    streamUrl480P: '',
    streamUrl720P: '',
    thumbnailImage: team5_screen3,
    // thumbnailImage:
    //   'https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/168068079_815757472371398_8363855807421158563_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=730e14&_nc_ohc=2NkVkTbV3YUAX8Qwanq&_nc_ht=scontent-hkg4-2.xx&oh=5b405b072f072ea73e9277dcc0e92842&oe=608ED547',
    language: {
      name: 'vie',
      id: '2',
    },
    category: { id: '123', name: 'Club Activate' },
    tags: [
      {
        id: '3',
        name: 'Club',
      },
    ],
    createdDate: new Date('2021-03-21T05:01:07.4432'),
    followers: '5,5M',
  },
  {
    id: '4',
    streamerIdentityGuid: '100',
    streamerName: 'CLB nhạc cụ dân tộc FUDN',
    streamerImageUrl:
      'https://scontent-xsp1-1.xx.fbcdn.net/v/t1.6435-9/177382474_828452067768605_483226722478740359_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=730e14&_nc_ohc=uuZLRrQhcH0AX8xV2nB&_nc_ht=scontent-xsp1-1.xx&oh=ea5cd531698512bdff0b3ae48c5b0151&oe=60AA9A19',
    title: 'Buổi biểu diễn nhạc cụ dân tộc',
    announcement:
      'Buổi biểu diễn nhạc cụ dân tộc mang chủ đề "Ngả nghiêng" của câu lạc bộ nhạc cụ dân tộc FUDN',
    viewCount: 1606,
    streamUrlSource: '',
    streamUrl480P: '',
    streamUrl720P: '',
    thumbnailImage: team5_screen4,
    // thumbnailImage:
    //   'https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/168554769_815757529038059_968881575742539570_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=730e14&_nc_ohc=zAVL3zO0VG4AX8OqcFe&_nc_ht=scontent-hkg4-2.xx&oh=5dbc93df7035c8e865603faebb8cfd9b&oe=608E4FE9',
    language: {
      id: '2',
      name: 'vie',
    },
    category: { id: '123', name: 'Club Activate' },
    tags: [
      {
        id: '1',
        name: 'Music',
      },
      {
        id: '2',
        name: 'Instruments',
      },
      {
        id: '3',
        name: 'Club',
      },
    ],
    createdDate: new Date('2021-03-21T05:01:07.4432'),
    followers: '5,5M',
  },
  {
    id: '5',
    streamerIdentityGuid: '100',
    streamerName: 'Công Tác Sinh Viên FUDN',
    streamerImageUrl:
      'https://scontent-xsp1-1.xx.fbcdn.net/v/t1.6435-9/177382474_828452067768605_483226722478740359_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=730e14&_nc_ohc=uuZLRrQhcH0AX8xV2nB&_nc_ht=scontent-xsp1-1.xx&oh=ea5cd531698512bdff0b3ae48c5b0151&oe=60AA9A19',
    title: 'Lễ tôn vinh kỳ FALL 2020',
    announcement:
      'Lần đầu tiên, chương trình lễ Tôn vinh sinh viên được tổ chức ngoài trời – Khuôn viên Thinker, FPT University Da Nang Campus',
    viewCount: 1232,
    streamUrlSource: '',
    streamUrl480P: '',
    streamUrl720P: '',
    thumbnailImage: team5_screen5,
    // thumbnailImage:
    //   'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/168702939_815757545704724_7261853114190307091_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=730e14&_nc_ohc=b9FqyVnYv5AAX_Cwveo&_nc_ht=scontent-hkg4-1.xx&oh=74ca5a39108964334db56b2b500be754&oe=608DAFB4',
    language: {
      name: 'vie',
      id: '2',
    },
    category: { id: '124', name: 'Achievement Awards' },
    tags: [
      {
        id: '5',
        name: 'Awards',
      },
    ],
    createdDate: new Date('2021-03-21T05:01:07.4432'),
    followers: '5,5M',
  },
  {
    id: '6',
    streamerIdentityGuid: '100',
    streamerName: 'FPTU Vovinam club',
    streamerImageUrl:
      'https://scontent.fdad1-1.fna.fbcdn.net/v/t1.6435-9/178412145_829735934306885_6376633309983334920_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=730e14&_nc_ohc=3-StLivW76QAX9QdW9D&_nc_ht=scontent.fdad1-1.fna&oh=4aa59d271cd07db617b586b8fcc21220&oe=60AB1715',
    title: 'Lễ thăng cấp sơ đẳng lần I 2021',
    announcement:
      '25 bạn sinh viên xuất sắc đến từ CLB Võ Vovinam Đại học FPT Đà Nẵng đã tham gia kỳ thi với 4 hạng mục: Khởi quyền, 5 chiến lược, 12 kỹ thuật khoá gỡ và lý thuyết võ đạo.',
    viewCount: 1232,
    streamUrlSource: '',
    streamUrl480P: '',
    streamUrl720P: '',
    thumbnailImage: team5_screen6,
    // thumbnailImage:
    //   'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/168244992_815757569038055_8610548265821026830_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=730e14&_nc_ohc=cm6srXdQJqsAX_acsxV&_nc_ht=scontent-hkg4-1.xx&oh=81b4c244ee414d3606870f84517cff12&oe=608E1731',
    language: {
      name: 'vie',
      id: '2',
    },
    category: { id: '123', name: 'Club Activate' },
    tags: [
      {
        id: '3',
        name: 'Club',
      },
      {
        id: '9',
        name: 'Vovinam',
      },
    ],
    createdDate: new Date('2021-03-21T05:01:07.4432'),
    followers: '5,5M',
  },
]

const adminStreamer = [
  {
    userId: '1',
    streamId: '2',
    title: 'Hello',
    status: 'Public',
    viewCount: '287473',
    createTime: '23/02/2021',
  },
  {
    userId: '2',
    streamId: '1',
    title: 'Test',
    status: 'Private',
    viewCount: '287373',
    createTime: '23/02/2031',
  },
  {
    userId: '5',
    streamId: '12',
    title: 'Game',
    status: 'Public',
    viewCount: '111111473',
    createTime: '23/02/2021',
  },
]

export const getAdminStreamerApi = () => {
  return new Promise(resolve => {
    resolve(adminStreamer)
  })
}

export const getStreamSessionsApi = (
  categoryGuid: string = '',
  pageIndex: number = 0,
  pageSize: number = 10,
): Promise<StreamSession[]> => {
  return axiosT5
    .get('/stream-api/api/v1/stream-session', {
      params: {
        pageIndex: pageIndex,
        pageSize: pageSize,
        categoryGuid: categoryGuid,
      },
    })
    .then(response => [...response.data.data, ...fakeStreams])
    .catch(error => {
      throw error
    })
}

export const getStreamByIdApi = (streamSessionId: string): Promise<StreamSession> => {
  return axiosT5
    .get(`/stream-api/api/v1/stream-session/${streamSessionId}`, {})
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

export const getStreamConfigApi = (): Promise<StreamConfig> => {
  return axiosT5
    .get(`/stream-api/api/v1/stream-session/stream-config`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const getStreamerMediaSourceApi = (): Promise<StreamSession> => {
  return axiosT5
    .get(`/stream-api/api/v1/stream-session/streamer-media-source`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const publishStreamSessionApi = (data: ReqStreamSession) => {
  return axiosT5
    .put('/stream-api/api/v1/stream-session/publish', data)
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

export const finishStreamSessionApi = () => {
  return axiosT5
    .put('stream-api/api/v1/stream-session/finish')
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

export const getAllSessionByUserIdSApi = (
  streamerGuid: string = '',
  pageIndex: number = 0,
  pageSize: number = 10,
): Promise<StreamSession[]> => {
  return axiosT5
    .get('/stream-api/api/v1/stream-session', {
      params: {
        pageIndex: pageIndex,
        pageSize: pageSize,
        streamerGuid: streamerGuid,
      },
    })
    .then(response => [...response.data.data])
    .catch(error => {
      throw error
    })
}

export const getStreamSessionsByCategoryApi = (
  categoryGuid: string = '',
  pageIndex: number = 0,
  pageSize: number = 10,
): Promise<StreamSession[]> => {
  return axiosT5
    .get('/stream-api/api/v1/stream-session', {
      params: {
        pageSize: pageSize,
        pageIndex: pageIndex,
        categoryGuid: categoryGuid,
      },
    })
    .then(response => [...response.data.data])
    .catch(error => {
      throw error
    })
}

export const searchStreamSession = (
  keyword: string,
): Promise<PaginatedResult<StreamSessionSearchResult[]>> => {
  return axiosT5
    .get('/stream-api/api/v1/stream-session/search', {
      params: {
        keyword: keyword,
        pageSize: 10,
        pageIndex: 0,
      },
    })
    .then(response => response.data.data)
    .catch(error => {
      throw error
    })
}

export const getRecommendStreamSessionsApi = (
  pageIndex: number = 0,
  pageSize: number = 10,
): Promise<StreamSession[]> => {
  return axiosT5
    .get('/stream-api/api/v1/stream-session/recommends', {
      params: {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

export const getFollowingStreamSessionsApi = (
  IdentityGuids: string[] = [],
): Promise<StreamSession[]> => {
  return axiosT5
    .get('/stream-api/api/v1/stream-session/stream-status', {
      params: {
        IdentityGuids: IdentityGuids.join(','),
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}
