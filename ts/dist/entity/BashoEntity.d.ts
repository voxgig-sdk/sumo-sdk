import { SumoEntityBase } from '../SumoEntityBase';
import type { SumoSDK } from '../SumoSDK';
import type { Control } from '../types';
import type { Basho, BashoLoadMatch, BashoListMatch } from '../SumoTypes';
declare class BashoEntity extends SumoEntityBase<Basho> {
    constructor(client: SumoSDK, entopts: any);
    make(this: BashoEntity): BashoEntity;
    load(this: any, reqmatch?: BashoLoadMatch, ctrl?: Control): Promise<BashoEntity>;
    list(this: any, reqmatch?: BashoListMatch, ctrl?: Control): Promise<BashoEntity[]>;
}
export { BashoEntity };
