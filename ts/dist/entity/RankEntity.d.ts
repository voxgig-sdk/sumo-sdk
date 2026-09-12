import { SumoEntityBase } from '../SumoEntityBase';
import type { SumoSDK } from '../SumoSDK';
import type { Control } from '../types';
import type { Rank, RankListMatch } from '../SumoTypes';
declare class RankEntity extends SumoEntityBase<Rank> {
    constructor(client: SumoSDK, entopts: any);
    make(this: RankEntity): RankEntity;
    list(this: any, reqmatch?: RankListMatch, ctrl?: Control): Promise<RankEntity[]>;
}
export { RankEntity };
