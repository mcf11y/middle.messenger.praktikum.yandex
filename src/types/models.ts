export interface IUserData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUser extends IUserData {
  id: number;
  display_name: Nullable<string>;
  avatar: Nullable<string>;
}

export interface IAvatar {
  avatar: File;
}
