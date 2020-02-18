// @flow

export default class PubSub {
  listeners: Set<Function> = new Set();

  notified: boolean = false;

  sibscribe = (callback: Function) => {
    this.listeners.add(callback);
    return this.unsibscribe.bind(this, callback);
  };

  unsibscribe(callback: Function) {
    if (this.listeners.has(callback)) {
      this.listeners.delete(callback);
    }
  }

  notify = (...args: Array<any>) => {
    this.notified = true;
    this.listeners.forEach(callback => {
      callback(...args);
    });
  };
}
