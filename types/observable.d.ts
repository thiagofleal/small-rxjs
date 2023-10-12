import { Observer } from "./observer"
import { Subscription } from "./subscription"

export type ValueOrPromise<T> = T | Promise<T>;

export interface UnaryFunction<T, R> {
  (source: T): R
}

export class Observable<T> {
	constructor(func: (subject: Observer<T>) => ValueOrPromise<void | (() => void)>);

	subscribe(observer: ((value: T) => any) | {
    next?: (value: T) => any
    error?: (value: any) => any
    complete?: () => any
  }): Subscription;

	toPromise(): Promise<T>;

  pipe(): Observable<T>;
  pipe<R>(transform: UnaryFunction<T, R>): Observable<R>;
  pipe<R, S>(
    transform0: UnaryFunction<T, R>,
    transform1: UnaryFunction<R, S>
  ): Observable<S>;
  pipe<R, S, T>(
    transform0: UnaryFunction<T, R>,
    transform1: UnaryFunction<R, S>,
    transform2: UnaryFunction<S, T>
  ): Observable<T>;
  pipe<R, S, T, U>(
    transform0: UnaryFunction<T, R>,
    transform1: UnaryFunction<R, S>,
    transform2: UnaryFunction<S, T>,
    transform3: UnaryFunction<T, U>
  ): Observable<U>;
  pipe<R, S, T, U, V>(
    transform0: UnaryFunction<T, R>,
    transform1: UnaryFunction<R, S>,
    transform2: UnaryFunction<S, T>,
    transform3: UnaryFunction<T, U>,
    transform4: UnaryFunction<U, V>
  ): Observable<V>;
  pipe(...pipeline: UnaryFunction<any, any>[]): Observable<any>;
}
