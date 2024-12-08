import { VocabStatus } from "@/enums/vocabStatus";

export interface VocabReq {
    word: string;
    ipa: string;
    image: File | string;
    meaning: string;
    synonym: string;
    definition: string;
    example: string;
    collocation: string;
    status: VocabStatus;
    levelId: number;
}

export interface VocabRes {
    id: number;
    word: string;
    ipa: string;
    image: string;
    meaning: string;
    synonym: string;
    definition: string;
    example: string;
    collocation: string;
    status: VocabStatus;
    levelId: number;
}

export interface VocabAiReq {
    count: number;
    levelId: number;
    levelName: string;
    topic: string;
}
