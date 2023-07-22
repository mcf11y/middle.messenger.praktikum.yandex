export type MessageContentType = "text" | "image" | "file" | "video";
export type MessageContent = string | File | HTMLImageElement;

export type MessageData = {
  contentType: MessageContentType;
  content: MessageContent;
  time: string | Date;
  my: boolean;
};

export type ChatData = {
  id: string;
  name: string;
  avatar?: string;
  unreadCount: string;
  lastMesage?: {
    userName?: string;
    content?: string;
    time?: string;
  };
};

export type ChatDetailsData = {
  uid: string;
  id: number;
  chatName: string;
  messages: MessageData[];
  myDraftMessage?: Omit<MessageData, "my" | "time">;
};
