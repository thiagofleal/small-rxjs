import { UnaryFunction } from "../observable";

export function map<T, R>(transform: (value: T, index?: number) => R): UnaryFunction<T, R>;
export function filter<T>(condition: (value: T, index?: number) => T): UnaryFunction<T, T>;
export function first<T>(): UnaryFunction<T, T>;
export function timeout<T>(time: number): UnaryFunction<T, T>;
export function keepAlive<T>(time: number): UnaryFunction<T, T>;
export function retry<T>(count: number): UnaryFunction<T, T>;
export function retry<T>(options: {
  count?:           number
  delay?:           number
  resetOnSuccess?:  boolean
}): UnaryFunction<T, T>;
export function onUnsubscribe<T>(callback?: () => void): UnaryFunction<T, T>;
