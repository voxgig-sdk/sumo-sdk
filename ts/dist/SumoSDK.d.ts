import { BashoEntity } from './entity/BashoEntity';
import { KimariteEntity } from './entity/KimariteEntity';
import { MeasurementEntity } from './entity/MeasurementEntity';
import { RankEntity } from './entity/RankEntity';
import { RikishiEntity } from './entity/RikishiEntity';
import { ShikonaEntity } from './entity/ShikonaEntity';
export type * from './SumoTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { SumoEntityBase } from './SumoEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class SumoSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Basho(entopts?: Record<string, any>): BashoEntity;
    Kimarite(entopts?: Record<string, any>): KimariteEntity;
    Measurement(entopts?: Record<string, any>): MeasurementEntity;
    Rank(entopts?: Record<string, any>): RankEntity;
    Rikishi(entopts?: Record<string, any>): RikishiEntity;
    Shikona(entopts?: Record<string, any>): ShikonaEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): SumoSDK;
    tester(testopts?: any, sdkopts?: any): SumoSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof SumoSDK;
export { stdutil, config, BaseFeature, SumoEntityBase, SumoSDK, SDK, };
