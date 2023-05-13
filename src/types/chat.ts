export type MessageContentType = "text" | "image" | "file" | "video";
export type MessageContent = string | File | HTMLImageElement;

export type MessageData = {
  contentType: MessageContentType;
  content: MessageContent;
  time: string | Date;
  my: boolean;
};

export type ChatData = {
  id: number | string;
  chatName: string;
  lastMessage?: MessageData;
  time: string | Date;
  missedMesssageCount?: number;
  avatarImage?: string | HTMLImageElement;
};

export type ChatDetailsData = {
  id: number;
  chatName: string;
  messages: MessageData[];
  myDraftMessage?: Omit<MessageData, "my" | "time">;
};
