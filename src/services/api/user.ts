import { METHOD } from "services/http/transport";

import BaseAPI from "./base";
import { IUser, IUserData } from "./interface";

const PATH = "/api/v2/user";

export interface IUpdateProfileRequestData extends IUserData {}

export interface IUpdateProfileResponseData extends IUser {}

export interface IUpdateAvatarResponseData extends IUser {}
export interface IUpdatePasswordRequestData {
  oldPassword: string;
  newPassword: string;
}

export interface IUserRequestData {
  id: number;
}

export interface IUserResponseData extends IUser {}

export interface IUserSearchRequestData {
  login: string;
}

export interface IUserSearchResponseData extends Array<IUser> {}

class UserAPI extends BaseAPI {
  constructor() {
    super(PATH);
  }

  public updateProfile = async (data: IUpdateProfileRequestData) =>
    this.httpFetch<typeof data, IUpdateProfileResponseData>(
      "profile",
      METHOD.PUT,
      data
    );

  public updateAvatar = async (file: File) => {
    const data = new FormData();
    data.append("avatar", file);

    return this.httpFetch<typeof data, IUpdateAvatarResponseData>(
      "/profile/avatar",
      METHOD.PUT,
      data
    );
  };

  public changePassword = async (data: IUpdatePasswordRequestData) =>
    this.httpFetch<typeof data>("/password", METHOD.PUT, data);

  public getUserById = async (userId: number) =>
    this.httpFetch<IUserRequestData>("/", METHOD.GET, { id: userId });

  public findUserByLogin = async (login: string) => {
    const response = await this.httpFetch<
      IUserSearchRequestData,
      IUserSearchResponseData
    >("/search", METHOD.GET, { login });

    const user = response.data.find((value) => value.login === login);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  };
}

export default UserAPI;
