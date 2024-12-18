export interface UserUpdate {
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface Token {
  token: string;
  restUser: Omit<UserResponse, "password">;
}
