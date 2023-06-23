import { Observable } from "../observable.js";
import { onUnsubscribe } from "./pipes.js";

export function of(...src) {
  return new Observable(observer => {
    src.forEach(e => {
      observer.next(e);
    });
    observer.complete();
  });
}

export function from(src) {
  return new Observable(observer => {
    if (Array.isArray(src)) {
      for (let key in src) {
        observer.next(src[key]);
      }
      observer.complete();
    }
    if (src instanceof Promise) {
      src.then(value => {
        observer.next(value);
        observer.complete();
      }).catch(err => observer.error(err));
    }
  });
}

export function interval(interv) {
  return new Observable(observer => {
    let i = 0;

    const id = setInterval(() => {
      observer.next(i++);
    }, interv);

    return () => clearInterval(id);
  });
}

export function fromEventTarget(emitter, events) {
  if (!Array.isArray(events)) {
    events = [events];
  }
  return new Observable(observer => {
    const handler = event => observer.next(event);

    events.forEach(eventName => {
      emitter.addEventListener(eventName, handler);
    });
    return () => {
      events.forEach(eventName => {
        emitter.removeEventListener(eventName, handler)
      });
    };
  });
}

export function fromEventSource(url, events) {  
  const source = new EventSource(url);
  return fromEventTarget(source, events)
    .pipe(onUnsubscribe(() => source.close()));
}
