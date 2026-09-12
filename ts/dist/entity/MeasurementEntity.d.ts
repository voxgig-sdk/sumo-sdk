import { SumoEntityBase } from '../SumoEntityBase';
import type { SumoSDK } from '../SumoSDK';
import type { Control } from '../types';
import type { Measurement, MeasurementListMatch } from '../SumoTypes';
declare class MeasurementEntity extends SumoEntityBase<Measurement> {
    constructor(client: SumoSDK, entopts: any);
    make(this: MeasurementEntity): MeasurementEntity;
    list(this: any, reqmatch?: MeasurementListMatch, ctrl?: Control): Promise<MeasurementEntity[]>;
}
export { MeasurementEntity };
