export interface IGetToken {
  displayName: string
  email: string
  expiresIn: string
  idToken: string
  kind: string
  localId: string
  refreshToken: string
  registered: boolean
}

export interface IGetRefreshToken {
  access_token: string
  expires_in: string
  id_token: string
  project_id: string
  refresh_token: string
  token_type: string
  user_id: string
}

interface IProviderUserInfo {
  email: string
  federatedId: string
  providerId: string
  rawId: string
}

export interface IGetAdminUserResponse {
  createdAt: string
  disabled: boolean
  email: string
  emailVerified: boolean
  lastLoginAt: string
  lastRefreshAt: string
  localId: string
  passwordHash: string
  passwordUpdatedAt: number
  providerUserInfo: IProviderUserInfo[]
  validSince: string
}

export interface IGetAdminResponse {
  kind: string
  users: IGetAdminUserResponse[]
}