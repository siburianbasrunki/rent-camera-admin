export type SignInCredentials = {
  email: string;
  level: number;
};

export type SignUpCredentials = {
  email: string;
  name: string;
};

export type VerifyOTPCredentials = {
  email: string;
  code: string;
  level: number;
};

export type VerifyOTPResponse = {
  id: string;
  email: string;
  level: number;
  token: string;
};
