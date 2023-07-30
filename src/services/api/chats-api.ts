import { IChat, IUser } from "services/api/interface";
import { METHOD } from "services/http-transport/http-transport";

import BaseAPI from "./api";

const PATH = "/api/v2/chats";

export interface IChatsRequestData {
  offset?: number;
  limit?: number;
  title?: string;
}

export interface IChatsResponseData extends Array<IChat> {}

export interface IDeleteChatResponseData {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
  };
}

export interface IGetChatUsersRequestData {
  chatId: number;
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
}

export interface IGetChatUsersResponseData extends Array<IUser> {
  role: string;
}

export interface IAddUsersRequestData {
  users: number[];
  chatId: number;
}

class ChatsAPI extends BaseAPI {
  constructor() {
    super(PATH);
  }

  public getChats = async (data?: IChatsRequestData) =>
    this.httpFetch<IChatsRequestData, IChatsResponseData>("", METHOD.GET, data);

  public createChat = async (title: string) =>
    this.httpFetch<{ title: string }>("", METHOD.POST, { title });

  public deleteChatById = async (chatId: number) =>
    this.httpFetch<{ chatId: number }, IDeleteChatResponseData>("", METHOD.DELETE, {
      chatId,
    });

  public getChatUsers = async (data: IGetChatUsersRequestData) =>
    this.httpFetch<typeof data, IGetChatUsersResponseData>(
      `/${data.chatId}/users`,
      METHOD.GET
    );

  public getNewMessagesCount = async (chatId: number) =>
    this.httpFetch<{ chatId: number }, { unread_count: number }>(
      `/new/${chatId}`,
      METHOD.GET
    );

  public addUsers = async (data: IAddUsersRequestData) =>
    this.httpFetch<typeof data>("/users", METHOD.PUT, data);

  public deteleUsers = async (data: IAddUsersRequestData) =>
    this.httpFetch<typeof data>("/users", METHOD.DELETE, data);

  public getChatToken = async (chatId: number) =>
    this.httpFetch<{ chatId: number }, { token: string }>(
      `/token/${chatId}`,
      METHOD.POST
    );

  // public updateAvatar = async (form: FormData) =>
  //   this.httpFetch("/avatar", METHOD.PUT, { data: form});

  public updateAvatar = async (form: FormData) => this.fetchFile("/avatar", form);

  // public getChatSentFiles = async (chatId: number) =>
  //   this.httpFetch<{ chatId: number }, Array<{ token: string }>>(
  //     `/${chatId}/token`,
  //     METHOD.POST
  //   );
}

export default new ChatsAPI();
