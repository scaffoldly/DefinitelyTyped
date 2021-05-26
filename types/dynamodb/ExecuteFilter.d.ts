import { Model } from 'dynamodb';
import { Readable } from 'stream';

import { Callback } from './Callback';

export interface Page<T> {
    Items: Model<T>[];
    Count: number;
    ScannedCount?: number;
    LastEvaluatedKey?: any;
    ConsumedCapacity?: {
        CapacityUnits: number;
        TableName: string;
    };
}

export interface PromisedReadable<T> extends Readable {
    promise(): Promise<[Page<T>]>;
}

export interface ExecuteFilter<T> {
    (callback: Callback): void;
    (): PromisedReadable<T>;
}
