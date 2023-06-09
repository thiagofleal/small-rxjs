import { Observable } from "../observable";

interface UnaryFunction<T, R> {
  (source: T): R
}

export function map<T, R>(transform: UnaryFunction<T, R>): Observable<R>
export function filter<T, R>(condition: UnaryFunction<T, R>): Observable<R>;
export function first<T>(): Observable<T>;
export function timeout<T>(time: number): Observable<T>;
export function keepAlive<T>(time: number): Observable<T>;
export function retry<T>(count: number): Observable<T>;
export function retry<T>(options: {
  count?:           number
  delay?:           number
  resetOnSuccess?:  boolean
}): Observable<T>;
export function onUnsubscribe<T>(callback?: () => void): Observable<T>