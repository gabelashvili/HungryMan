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
      firstName: string,
      lastName: string,
      id: number,
      email: string,
      phone: string,
      address: string,
      city: string,
      companyName: null
      identificationCode: null
      phoneOrEmail: null
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
  address: string,
  city: string,
  companyName: null
  identificationCode: null
}

export interface AuthInitialState {
  user: AuthedUser | null
}
