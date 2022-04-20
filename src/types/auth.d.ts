export interface UserAuthParams {
    phoneOrEmail: string,
    password: string
}

export interface CompanySignUpParams {
    companyName: string,
    identificationCode: string,
    city: string,
    address: string
}

export interface UserSignUpParams extends Partial<CompanySignUpParams> {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
}

export interface UserSignInResponse {
    token: string,
    user: {
      id: number,
      email: string,
      firstName: string,
      lastName: string,
      password: string,
      phone: string,
      city: string,
      address: string,
      phoneOrEmail: string,
      createdAt: string,
    },
    admin: {
      id: number,
      username: string,
      password: string
    }
}

export interface AuthedUser {
  firstName: string,
  lastName: string,
  id: number,
  email: string,
  phone: string,
}

export interface AuthInitialState {
  user: AuthedUser | null
}
