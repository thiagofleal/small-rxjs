import { Observable } from "../observable.js";

export function map(transform) {
  return subscriber => {
    return new Observable(observer => {
      const subscription = subscriber.subscribe({
        next: value => observer.next(transform(value)),
        error: err => observer.error(err),
        complete: () => observer.complete()
      });
      return () => subscription.unsubscribe();
    });
  };
}

export function filter(condition) {
  return subscriber => {
    return new Observable(observer => {
      const subscription = subscriber.subscribe({
        next: value => {
          if (condition(value)) {
            observer.next(value);
          }
        },
        error: err => observer.error(err),
        complete: () => observer.complete()
      });
      return () => subscription.unsubscribe();
    });
  };
}

export function first() {
  return subscriber => {
    return new Observable(observer => {
      const subscription = subscriber.subscribe({
        next: value => {
          observer.next(value);
          observer.complete();
        },
        error: err => observer.error(err),
        complete: () => observer.complete()
      });
      return () => subscription.unsubscribe();
    });
  };
}

export function timeout(time) {
  return subscriber => {
    return new Observable(observer => {
      const _timeout = setTimeout(() => observer.error(new Error("Timeout error")), time);
      const subscription = subscriber.subscribe({
        next: value => observer.next(value),
        error: err => observer.error(err),
        complete: () => observer.complete()
      });
      return () => {
        clearTimeout(_timeout);
        subscription.unsubscribe();
      };
    });
  };
}

export function keepAlive(time) {
  return subscriber => {
    return new Observable(observer => {
      const timeout = setTimeout(() => observer.complete(), time);
      const subscription = subscriber.subscribe({
        next: value => observer.next(value),
        error: err => observer.error(err),
        complete: () => observer.complete()
      });
      return () => {
        clearTimeout(timeout);
        subscription.unsubscribe();
      };
    });
  };
}

export function retry(optionsOrCount) {
  const options = {
    count: 0,
    delay: 0,
    resetOnSuccess: false
  };

  if (typeof optionsOrCount === "object") {
    options.count = optionsOrCount.count || options.count;
    options.delay = optionsOrCount.delay || options.delay;
    options.resetOnSuccess = optionsOrCount.resetOnSuccess || options.resetOnSuccess;
  } else if (typeof optionsOrCount === "number") {
    options.count = optionsOrCount;
  }
  return subscriber => {
    return new Observable(observer => {
      let subscription = void 0;
      let count = 0;
      let timeout = void 0;

      const resubscribe = observe => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = void 0;
        }
        timeout = setTimeout(() => {
          if (subscription) subscription.unsubscribe();
          subscription = subscriber.subscribe(observe);
        }, options.delay);
      };

      const observe = {
        next: value => {
          if (options.resetOnSuccess) {
            count = 0;
          }
          observer.next(value);
        },
        error: err => {
          if (count++ < options.count) {
            resubscribe(observe);
          } else {
            observer.error(err);
          }
        },
        complete: () => observer.complete()
      };
      subscription = subscriber.subscribe(observe);
      return () => {
        clearTimeout(timeout);
        subscription.unsubscribe();
      };
    });
  };
}

export function onUnsubscribe(callback) {
  return subscriber => {
    return new Observable(observe => {
      const subscription = subscriber.subscribe({
        next: value => observe.next(value),
        error: err => observe.error(err),
        complete: () => observe.complete()
      });
      return () => {
        subscription.unsubscribe();
        callback ? callback() : void 0;
      }
    })
  }
}
