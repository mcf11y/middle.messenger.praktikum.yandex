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

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: IUserData;
    time: string;
    content: string;
  };
}
