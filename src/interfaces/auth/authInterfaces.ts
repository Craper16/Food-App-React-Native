export interface userDataModel {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  address: string;
}

export interface signUpDataModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}

export interface updateUserModel {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  address: string;
}

export interface ErrorResponse extends Error {
  response: {data: {message: string}};
}

export interface credentials {
  email: string;
  password: string;
}

export interface SigninData {
  access_token?: string;
  refresh_token?: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  address: string;
}

export interface SignupData extends SigninData {
  message: string;
}
