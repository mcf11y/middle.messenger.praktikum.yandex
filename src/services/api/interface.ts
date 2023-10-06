export interface IUserData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IProfileUserData extends Omit<IUserData, "password"> {
  display_name: string;
}

export interface IUser extends IUserData {
  id: number;
  display_name: Nullable<string>;
  avatar: Nullable<string>;
}

export interface IProfileUser extends IProfileUserData {
  id: number;
  avatar: Nullable<string>;
}

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: {
    user?: {
      first_name?: string;
      second_name?: string;
      avatar?: string;
      email?: string;
      login?: string;
      phone?: string;
    };
    time?: string;
    content?: string;
  };
}
