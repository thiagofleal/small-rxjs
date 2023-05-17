# small-rxjs
Small implementation of rxjs (Reactive Extension for JavaScript).

### Implementations

- Subscription
- Observable
- Subject
  - BehaviorSubject
  - ReplaySubject
  - AsyncSubject
- operators
  - map
  - filter
  - first
  - of
  - from
  - interval
  - fromEvents
  - fromEvent
  - fromEventSource
  - timeout
  - keepAlive
  - retry

### Add small-rxjs

* #### Using UGDM (https://github.com/thiagofleal/ugdm)
```sh
ugdm add small-rxjs --link https://github.com/thiagofleal/small-rxjs -v master
```
* #### Using GIT
```sh
git clone https://github.com/thiagofleal/small-rxjs
```

### Using small-rxjs

*small-rxjs* classes must be imported in a **module** script (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

##### Examples:
```js
import { Observable } from "../vendor/small-rxjs/rx.js";

const obs$ = new Observable(observer => {
  observer.next(10);
});

obs$.subscribe(console.log);
```
```js
import { of, filter, map } from "../vendor/small-rxjs/rx.js";

of(1, 2, 3, 4)
  .pipe(filter(e => e % 2), map(e => e * 2))
  .subscribe(console.log);
```
