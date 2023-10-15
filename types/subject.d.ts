import { Observable, ValueOrPromise } from "./observable";
import { Observer } from "./observer";

declare class BaseSubject<T> extends Observable<T> {
	constructor(func?: (subject: Observer<T>) => ValueOrPromise<void | (() => void)>);

	next(value: T): void;
	error(err: unknown): void;
	complete(): void;
}

export class Subject<T> extends BaseSubject<T> {
	constructor();
}

export class BehaviorSubject<T> extends BaseSubject<T> {
	constructor(initial: T);
}

export class ReplaySubject<T> extends BaseSubject<T> {
	constructor(length: number);
}

export class AsyncSubject<T> extends BaseSubject<T> {
	constructor();
}
