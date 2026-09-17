export interface Basho {
    endDate?: string;
    id?: string;
    kimarite?: string;
    matchNumber?: number;
    month?: number;
    rank?: string;
    rikishi1Id?: string;
    rikishi2Id?: string;
    rikishiId?: string;
    shikona?: string;
    side?: string;
    startDate?: string;
    venue?: string;
    winnerId?: string;
    year?: number;
}
export interface BashoLoadMatch {
    division?: string;
    id: string;
}
export interface BashoListMatch {
    basho_id: string;
    day: number;
    division: string;
}
export interface Kimarite {
    category?: string;
    description?: string;
    englishName?: string;
    frequency?: number;
    id?: string;
    name?: string;
}
export interface KimariteLoadMatch {
    id: string;
}
export interface KimariteListMatch {
    category?: string;
    description?: string;
    englishName?: string;
    frequency?: number;
    id?: string;
    name?: string;
}
export interface Measurement {
    height?: number;
    recordedDate?: string;
    rikishiId?: string;
    weight?: number;
}
export interface MeasurementListMatch {
    height?: number;
    recordedDate?: string;
    rikishiId?: string;
    weight?: number;
}
export interface Rank {
    division?: string;
    id?: string;
    level?: number;
    name?: string;
}
export interface RankListMatch {
    division?: string;
    id?: string;
    level?: number;
    name?: string;
}
export interface Rikishi {
    bashoId?: string;
    birthdate?: string;
    birthplace?: string;
    currentRank?: string;
    day?: number;
    debut?: string;
    division?: string;
    height?: number;
    heya?: string;
    id?: string;
    kimarite?: string;
    realName?: string;
    rikishi1Id?: string;
    rikishi2Id?: string;
    shikona?: string;
    weight?: number;
    winnerId?: string;
}
export interface RikishiLoadMatch {
    id: string;
    opponent_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface RikishiListMatch {
    bashoId?: string;
    birthdate?: string;
    birthplace?: string;
    currentRank?: string;
    day?: number;
    debut?: string;
    division?: string;
    height?: number;
    heya?: string;
    id?: string;
    kimarite?: string;
    realName?: string;
    rikishi1Id?: string;
    rikishi2Id?: string;
    shikona?: string;
    weight?: number;
    winnerId?: string;
    $action?: string;
    [action: string]: any;
}
export interface Shikona {
    endDate?: string;
    rikishiId?: string;
    shikona?: string;
    startDate?: string;
}
export interface ShikonaListMatch {
    endDate?: string;
    rikishiId?: string;
    shikona?: string;
    startDate?: string;
}
