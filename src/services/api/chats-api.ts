import { IChat, IUser } from "services/api/interface";
import { METHOD } from "services/http/transport";

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

  public getChats = async (data: IChatsRequestData) =>
    this.httpFetch<IChatsRequestData, IChatsResponseData>("", METHOD.GET, data).then(
      (response) =>
        response.data.map((chat) => ({
          id: chat.id,
          name: chat.title,
          avatar: chat.avatar,
          unread: chat.unread_count,
          lastMessage: chat.last_message.content,
          lastMessageTime: chat.last_message.time,
        }))
    );

  public createChat = async (title: string) =>
    this.httpFetch<{ title: string }>("", METHOD.POST, { title });

  public deleteChat = async (chatId: number) =>
    this.httpFetch<{ chatId: number }, IDeleteChatResponseData>(
      `/${chatId}`,
      METHOD.DELETE
    );

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
    this.httpFetch<{ chatId: number }, Array<{ token: string }>>(
      `/${chatId}/token`,
      METHOD.POST
    );
}

export default ChatsAPI;
