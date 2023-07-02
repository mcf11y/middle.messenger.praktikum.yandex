import { IChat } from "services/api/interface";
import { METHOD } from "services/http/transport";

import BaseAPI from "./base";

const PATH = "/api/v2/chats";

export interface IChatsRequestData {
  offset?: number;
  limit?: number;
  title?: string;
}

export interface IChatsResponseData extends IChat {}
[];

export interface IDeleteChatResponseData {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
  };
}

export interface IGetChatUsersRequestData {
  chatId?: number;
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
}

class ChatsAPI extends BaseAPI {
  constructor() {
    super(PATH);
  }

  public getChats = async (data: IChatsRequestData) =>
    this.httpFetch<IChatsRequestData, IChatsResponseData>("", METHOD.GET, data);

  public createChat = async (title: string) =>
    this.httpFetch<{ title: string }>("", METHOD.POST, { title });

  public deleteChat = async (chatId: number) =>
    this.httpFetch<{ chatId: number }, IDeleteChatResponseDat>(
      `/${chatId}`,
      METHOD.DELETE
    );

  public getChatUsers = async (chatId: number) =>
    this.httpFetch<unknown, IChat>(`/${chatId}/users`, METHOD.GET);
}

export default ChatsAPI;
