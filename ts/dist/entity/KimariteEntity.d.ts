import { SumoEntityBase } from '../SumoEntityBase';
import type { SumoSDK } from '../SumoSDK';
import type { Control } from '../types';
import type { Kimarite, KimariteLoadMatch, KimariteListMatch } from '../SumoTypes';
declare class KimariteEntity extends SumoEntityBase<Kimarite> {
    constructor(client: SumoSDK, entopts: any);
    make(this: KimariteEntity): KimariteEntity;
    load(this: any, reqmatch?: KimariteLoadMatch, ctrl?: Control): Promise<KimariteEntity>;
    list(this: any, reqmatch?: KimariteListMatch, ctrl?: Control): Promise<KimariteEntity[]>;
}
export { KimariteEntity };
