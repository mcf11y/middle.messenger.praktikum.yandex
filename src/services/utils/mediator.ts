type SubscriberType = string;

type MediatorPayloadType = {
  subscriberName: SubscriberType;
  cb: Handler;
};

class Mediator {
  private channels: Map<string, Array<MediatorPayloadType>>;

  constructor() {
    this.channels = new Map();
  }

  public subscribe(channel: string, subscriberName: string, cb: Handler) {
    if (!this.channels.has(channel)) {
      this.channels.set(channel, []);
    }

    this.channels.get(channel)!.push({ subscriberName, cb });
  }

  public unsubscribe(channel: string, subscriberName: SubscriberType) {
    if (!this.channels.has(channel)) {
      return false;
    }

    const subscribers = this.channels.get(channel)!;
    const index = subscribers.findIndex(
      (subcriber) => subcriber.subscriberName === subscriberName
    );
    if (index >= 0) {
      subscribers.splice(index, 1);
      return true;
    }

    return false;
  }

  public notify({
    channel,
    recipient,
    args,
  }: {
    channel: string;
    recipient?: SubscriberType;
    args?: ArgumentTypes<Handler>;
  }): boolean {
    if (!this.channels.has(channel)) {
      return false;
    }

    const subscribers = this.channels.get(channel)!;
    if (recipient) {
      const index = subscribers.findIndex(
        (subcriber) => subcriber.subscriberName === recipient
      );
      if (index >= 0) {
        subscribers[index].cb.apply(args);
      }

      return true;
    }

    subscribers.forEach((subcriber) => {
      subcriber.cb.apply(args);
    });

    return true;
  }
}

export default Mediator;
