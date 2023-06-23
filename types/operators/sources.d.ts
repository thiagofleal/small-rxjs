import { Observable } from "../observable";

export function of<T>(...src: T[]): Observable<T>;
export function from<T>(src: T[] | Promise<T>): Observable<T>;
export function interval(interv: number): Observable<number>;

export function fromEventTarget<T = any>(
  emitter: EventTarget, events: string | string[]
): Observable<T>;

export function fromEventSource<T = any>(
  url: string, events: string | string[]
): Observable<T>;
