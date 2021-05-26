import * as bunyan from 'bunyan';
import { DynamoDB } from './DynamoDB';

import { Callback } from './Callback';
import { Query } from './Query';
import { Scan, ParallelScan } from './Scan';
import { EventEmitter } from 'events';

export class Item<T> extends EventEmitter {
    constructor(attrs: T, table: any);
    get(name: string): any;
    set(params: any): this;
    save(callback: Callback): void;
    save(): Promise<T>;
    update(options: any, callback: Callback): void;
    update(options: any): Promise<Item<T>>;
    destroy(options: any, callback: Callback): void;
    destroy(options: any): Promise<Item<T>>;
    toJSON(): T;
}

export class Model<T> extends Item<T> implements Model<T> {
    constructor(attrs: T);
}

export interface Model<T> {
    new (attrs: T): Model<T>;
    attrs: Model<T>;
    table: any;
    get(hashKey: string, rangeKey: string, options: object, callback: Callback): void;
    get(data: object | string, options: object | string, callback: Callback): void;
    get(data: object | string, callback: Callback): void;
    get(hashKey: string, rangeKey: string, options: object): Promise<Model<T>>;
    get(hashKey: string, options?: object | string): Promise<Model<T>>;
    update(item: any, options: Model.OperationOptions, callback: Callback): void;
    update(item: any, callback: Callback): void;
    update(item: any, options?: Model.OperationOptions): Promise<Model<T>>;
    create(doc: any, params: Model.OperationOptions, callback: Callback): void;
    create(doc: any, callback: Callback): void;
    create(doc: any, params?: Model.OperationOptions): Promise<Model<T>>;
    destroy(hashKey: string, rangeKey: string, options: Model.OperationOptions, callback: Callback): void;
    destroy(hashKey: string, rangeKey: string, callback: Callback): void;
    destroy(data: { [key: string]: any } | string, options: Model.OperationOptions, callback: Callback): void;
    destroy(data: { [key: string]: any } | string, callback: Callback): void;
    destroy(hashKey: string, rangeKey: string, options: Model.OperationOptions): Promise<Model<T>>;
    destroy(hashKey: string, options?: Model.OperationOptions | string): Promise<Model<T>>;
    getItems(keys: ReadonlyArray<any>, options: any, callback: Callback): void;
    getItems(keys: ReadonlyArray<any>, callback: Callback): void;
    getItems(keys: ReadonlyArray<any>, options?: any): Promise<Model<T>[]>;
    query(hashKey: string): Query<T>;
    scan(): Scan<T>;
    parallelScan(totalSegments: number): ParallelScan<T>;
    batchGetItems(hashKey: string, rangeKey: string, options: any, callback?: Callback): Promise<any> | void;
    createTable(hashKey: string, rangeKey: string, options: any, callback?: Callback): Promise<any> | void;
    updateTable(hashKey: string, rangeKey: string, options: any, callback?: Callback): Promise<any> | void;
    describeTable(hashKey: string, rangeKey: string, options: any, callback?: Callback): Promise<any> | void;
    deleteTable(callback: Callback): void;
    deleteTable(): Promise<any>;
    tableName(hashKey: string, rangeKey: string, options: any, callback: Callback): void;
    tableName(hashKey: string, rangeKey: string, options: any): Promise<any>;
    itemFactory: Model<T>;
    log: bunyan;
    after: any;
    before: any;
    config(config: { dynamodb?: DynamoDB; tableName?: string }): any;
}

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

export namespace Model {
    interface OperationOptions {
        UpdateExpression?: any;
        ConditionExpression?: any;
        ExpressionAttributeValues?: any;
        ExpressionAttributeNames?: any;
        expected?: any;
        overwrite?: boolean;
        ReturnValues?: string | boolean;
    }
}
