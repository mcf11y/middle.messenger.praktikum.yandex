export type MessageContentType = "text" | "image" | "file" | "video";
export type MessageContent = string | File | HTMLImageElement;

export interface Message_data {
  contentType: MessageContentType;
  content: MessageContent;
  time: string | Date;
  my: boolean;
}

export interface Chat_data {
  id: number | string;
  chatName: string;
  lastMessage?: Message_data;
  time: string | Date;
  missedMesssageCount?: number;
  avatarImage?: string | HTMLImageElement;
}

export interface Chat_details_data {
  id: number;
  chatName: string;
  messages: Message_data[];
  myDraftMessage?: Omit<Message_data, "my" | "time">;
}
