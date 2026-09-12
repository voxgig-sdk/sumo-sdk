import { SumoEntityBase } from '../SumoEntityBase';
import type { SumoSDK } from '../SumoSDK';
import type { Control } from '../types';
import type { Rikishi, RikishiLoadMatch, RikishiListMatch } from '../SumoTypes';
declare class RikishiEntity extends SumoEntityBase<Rikishi> {
    constructor(client: SumoSDK, entopts: any);
    make(this: RikishiEntity): RikishiEntity;
    load(this: any, reqmatch?: RikishiLoadMatch, ctrl?: Control): Promise<RikishiEntity>;
    list(this: any, reqmatch?: RikishiListMatch, ctrl?: Control): Promise<RikishiEntity[]>;
}
export { RikishiEntity };
