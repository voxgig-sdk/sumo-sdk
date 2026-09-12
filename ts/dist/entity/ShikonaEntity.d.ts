import { SumoEntityBase } from '../SumoEntityBase';
import type { SumoSDK } from '../SumoSDK';
import type { Control } from '../types';
import type { Shikona, ShikonaListMatch } from '../SumoTypes';
declare class ShikonaEntity extends SumoEntityBase<Shikona> {
    constructor(client: SumoSDK, entopts: any);
    make(this: ShikonaEntity): ShikonaEntity;
    list(this: any, reqmatch?: ShikonaListMatch, ctrl?: Control): Promise<ShikonaEntity[]>;
}
export { ShikonaEntity };
