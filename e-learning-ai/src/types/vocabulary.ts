export interface VocabularyReq {
    count: number;
    levelName: string;
    levelId: number;
    topic: string;
}

export interface VocabularyRes {
    word: string;
    ipa: string;
    meaning: string;
    synonym: string;
    definition: string;
    example: string;
    collocation: string;
    levelId: number;
}
