import Chat from "containers/Messenger";
import Block from "services/block";
import ChatController from "services/controllers/chat-controller";
import { Connect } from "services/store";
import template from "./template.hbs";
import WSMessageController, {
  TokensMap,
  SocketsMap,
} from "services/controllers/ws-message-controller";

const formMediator = ChatController.formMediator;

type Props = {
  chatTokens?: TokensMap;
};

class Messenger extends Block<Props> {
  private sockets: SocketsMap;
  private wasInited: boolean;

  constructor() {
    super({});

    this.sockets = {};
    this.wasInited = false;
  }

  private _createChatSockets(tokens: TokensMap) {
    this.wasInited = true;

    Object.entries(tokens).forEach(async ([key, value]) => {
      if (!this.sockets[key]) {
        const wsController = new WSMessageController(key, value);
        await wsController.connect();
        wsController.getOldMessages(0);
        console.log("SOCKET", wsController);

        this.sockets[key] = wsController;
      }
    });
  }

  protected componentDidUpdate(oldProps: Props, nextProps: Props) {
    // todo oldProps приходят странные как nextProps
    const oldTokensIds = oldProps.chatTokens && Object.keys(oldProps.chatTokens);
    const nextTokensIds = nextProps.chatTokens && Object.keys(nextProps.chatTokens);

    if (!this.wasInited) {
      return true;
    }

    if (
      oldTokensIds?.length === nextTokensIds?.length &&
      nextTokensIds?.length === oldTokensIds?.length
    ) {
      return false;
    }

    // @ts-ignore
    if (nextTokensIds?.length && oldTokensIds?.length) {
      // @ts-ignore
      const length = Math.max(oldTokensIds.length, nextTokensIds.length);

      for (let i = 0; i < length; i++) {
        if (
          // @ts-ignore
          oldProps?.chatTokens?.[oldTokensIds[i]] !==
          nextProps?.chatTokens?.[nextTokensIds[i]]
        ) {
          return true;
        }
      }
    }

    return false;
  }

  protected render(): DocumentFragment {
    const chatTokens = this.props.chatTokens;

    // const chatSockets: SocketsMap = {};

    if (chatTokens) {
      this._createChatSockets(chatTokens);
    }

    this.children.messenger = new Chat({
      formMediator,
      chatSockets: this.sockets,
    });

    return this.compile(template, this.props);
  }
}

function mapStateToProps(state: any) {
  if (!state || !state.user || !state.chatTokens) return;

  return { chatTokens: state.chatTokens };
}

// eslint-disable-next-line import/prefer-default-export
export const MessengerPage =
  // @ts-ignore
  Connect(Messenger, mapStateToProps);
