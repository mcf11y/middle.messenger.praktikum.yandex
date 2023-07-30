import Block from "services/block";
import { Connect } from "services/store";
// import { Connect } from "services/store";
import { MessageData } from "types/chat";

import ChatMessage from "components/ChatMessage";

import template from "./Content.hbs";

type Props = {
  messages?: MessageData[];
};

class MessageContent extends Block<Props> {
  private renderMessages(messages: MessageData[]) {
    return messages?.map(
      ({ contentType, content, time, my }) =>
        new ChatMessage({
          message: contentType === "text" ? (content as string) : "",
          time: time?.toString(),
          my,
        })
    );
  }

  protected render(): DocumentFragment {
    if (this.props.messages && this.props.messages.length > 0) {
      this.children.messagesList = this.renderMessages(this.props.messages);
    }

    return this.compile(template, this.props);
  }
}

function mapStateToProps(state: any) {
  const activeChatId = state.activeChat?.id;
  let messages: MessageData[] | undefined;

  if (activeChatId && state.chatMessages?.[activeChatId]) {
    messages = Object.values(state.chatMessages?.[activeChatId]);
  }

  return { messages };
}

// eslint-disable-next-line import/prefer-default-export
export const Content =
  // @ts-ignore
  Connect(MessageContent, mapStateToProps);
