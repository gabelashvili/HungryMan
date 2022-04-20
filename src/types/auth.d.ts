export interface UserAuthParams {
    email: string,
    password: string
}

export interface CompanySignUpParams {
    companyName: string,
    identificationCode: string,
    city: string,
    address: string
}

export interface IndividualUserSignUpParams extends Partial<CompanySignUpParams> {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
}
