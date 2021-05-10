const notifications = [
  {
    id: '1',
    thumbnail:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/sofm-profile_image-b7ccc57d6cd5bea9-150x150.png',
    content: 'Sofm đang Stream !!',
  },
  {
    id: '2',
    thumbnail:
      'https://image.thanhnien.vn/980/uploaded/badiep/2018_03_12/14720536_1797565987159824_7956249866022643798_n_njek.jpg',
    content: 'Truc Tiep Game đang Stream !!',
  },
  {
    id: '3',
    thumbnail:
      'https://image.thanhnien.vn/980/uploaded/badiep/2018_03_12/14720536_1797565987159824_7956249866022643798_n_njek.jpg',
    content: 'Truc Tiep Game đang Stream !!',
  },
  {
    id: '4',
    thumbnail:
      'https://image.thanhnien.vn/980/uploaded/badiep/2018_03_12/14720536_1797565987159824_7956249866022643798_n_njek.jpg',
    content: 'Truc Tiep Game đang Stream !!',
  },
  {
    id: '5',
    thumbnail:
      'https://image.thanhnien.vn/980/uploaded/badiep/2018_03_12/14720536_1797565987159824_7956249866022643798_n_njek.jpg',
    content: 'Truc Tiep Game đang Stream !!',
  },
  {
    id: '6',
    thumbnail:
      'https://image.thanhnien.vn/980/uploaded/badiep/2018_03_12/14720536_1797565987159824_7956249866022643798_n_njek.jpg',
    content: 'Truc Tiep Game đang Stream !!',
  },
  {
    id: '7',
    thumbnail:
      'https://image.thanhnien.vn/980/uploaded/badiep/2018_03_12/14720536_1797565987159824_7956249866022643798_n_njek.jpg',
    content: 'Truc Tiep Game đang Stream !!',
  },
  {
    id: '8',
    thumbnail:
      'https://image.thanhnien.vn/980/uploaded/badiep/2018_03_12/14720536_1797565987159824_7956249866022643798_n_njek.jpg',
    content: 'Truc Tiep Game đang Stream !!',
  },
]
export const getNotificationsApi = () => {
  return new Promise((resolve, reject) => {
    resolve({
      notifications: notifications,
    })
  })
}
