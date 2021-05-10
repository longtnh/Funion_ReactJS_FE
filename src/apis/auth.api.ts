import { authT5 } from './../axios/axiosTeam5'
import { ROLE } from '@/constants/roles'

export const loginApi = ({ email, password }: ReqLogin): Promise<ResLoginApi> => {
  const params = new URLSearchParams()
  params.append('client_id', 'js')
  params.append('client_secret', 'secret')
  params.append('grant_type', 'password')
  params.append('username', email)
  params.append('password', password)

  return authT5
    .post('/connect/token', params)
    .then(response => {
      response.data['role'] = ROLE.ADMIN
      return response.data
    })
    .catch(error => {
      throw error.response.data.error_description
    })
}

export const loginByGoogleApi = ({
  externalToken,
}: ReqExternalLogin): Promise<ResLoginApi> => {
  const params = new URLSearchParams()
  params.append('client_id', 'js')
  params.append('client_secret', 'secret')
  params.append('grant_type', 'external')
  params.append('provider', 'Google')
  params.append('external_token', externalToken)

  return authT5
    .post('/connect/token', params)
    .then(response => {
      response.data['role'] = ROLE.ADMIN
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const registerApi = payload => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      payload.email === 'a@b.c' && payload.password === '123'
        ? resolve({
            data: {
              access_token: '123',
            },
          })
        : reject(new Error('Invalid username or password!'))
    }, 1000)
  })
}
