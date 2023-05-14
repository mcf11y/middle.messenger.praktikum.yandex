export type MediatorType = string;

export class Mediator {
  private channels: Map<MediatorType, Array<Record<any, () => void>>>;

  constructor() {
    this.channels = new Map();
  }

  subscribe(channel: MediatorType, context: any, cb: () => void) {
    if (!this.channels.has(channel)) {
      this.channels.set(channel, []);
    }
    this.channels.get(channel)!.push({ context, cb });
  }

  unsubscribe(channel: MediatorType, context: any) {
    if (!this.channels.has(channel)) {
      return false;
    }
    const subscribers = this.channels.get(channel)!;
    const index = subscribers.findIndex((item) => item.context === context);
    if (index >= 0) {
      subscribers.splice(index, 1);
      return true;
    }
    return false;
  }

  publish(channel: MediatorType, ...args: any) {
    if (!this.channels.has(channel)) {
      return false;
    }
    const subscribers = this.channels.get(channel)!;
    subscribers.forEach((item) => {
      item.cb.apply(item.context, args);
    });
    return true;
  }
}
