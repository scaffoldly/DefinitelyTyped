import { Readable } from 'stream';

import { Callback } from './Callback';

export interface PromisedReadable<T> extends Readable {
    promise(): Promise<T>;
}

export interface ExecuteFilter<T> {
    (callback: Callback): void;
    (): PromisedReadable<T>;
}
