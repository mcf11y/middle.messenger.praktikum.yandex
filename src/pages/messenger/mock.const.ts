import { ChatData, ChatDetailsData } from "types/chat";

export const CHAT_LIST = [
  {
    uid: "1",
    id: 1,
    chatName: "Андрей",
    lastMessage: {
      contentType: "text",
      content: "Изображение",
    },
    time: "10:39",
    missedMesssageCount: 2,
  },
  {
    uid: "2",
    id: 2,
    chatName: "Киноклуб",
    lastMessage: {
      contentType: "text",
      content: "Вы: стикер",
    },
    time: "12:00",
  },
  {
    uid: "3",
    id: 3,
    chatName: "Илья",
    lastMessage: {
      contentType: "text",
      content:
        "Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!",
    },
    time: "15:12",
    missedMesssageCount: 4,
  },
  {
    uid: "4",
    id: 4,
    chatName: "Андрей",
    lastMessage: {
      contentType: "text",
      content:
        "Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!",
    },
    time: "15:12",
    missedMesssageCount: 4,
  },
  {
    uid: "5",
    id: 5,
    chatName: "Андрей",
    lastMessage: {
      contentType: "text",
      content:
        "Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!",
    },
    time: "15:12",
    missedMesssageCount: 4,
  },
  {
    uid: "6",
    id: 6,
    chatName: "Андрей",
    lastMessage: {
      contentType: "text",
      content:
        "Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!",
    },
    time: "15:12",
    missedMesssageCount: 4,
  },
  {
    uid: "7",
    id: 7,
    chatName: "Андрей",
    lastMessage: {
      contentType: "text",
      content:
        "Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!",
    },
    time: "15:12",
    missedMesssageCount: 4,
  },
  {
    uid: "8",
    id: 8,
    chatName: "Андрей",
    time: "10:39",
    missedMesssageCount: 2,
  },
] as ChatData[];

export const CURRENT_CHAT = {
  uid: "3",
  id: 3,
  chatName: "Илья",
  messages: [
    {
      contentType: "text",
      content:
        "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря",
      time: "11:56",
      my: false,
    },
    {
      contentType: "text",
      content: "Круто",
      time: "11:56",
      my: true,
    },
  ],
  draftMessage: {
    contentType: "text",
    content: "начал что-то писать",
    time: "13:56",
  },
} as ChatDetailsData;
