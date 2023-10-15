export class Observer<T> {
	constructor(
    next: (value: T) => void | Promise<void>,
    error: (value: unknown) => void | Promise<void>,
    complete: () => void | Promise<void>
  );

	setUnsubscribe(unsubscribe: () => void | Promise<void>): void;

	next(value: T): void;
	error(err: unknown): void;
	complete(): void;

	unsubscribe(): void;
}
