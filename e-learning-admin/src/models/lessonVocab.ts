import { VocabRes } from "./vocabulary";

export interface LessonVocabReq {
    lessonId: number;
    vocabIds: Array<number>;
}

export interface LessonVocabRes {
    lessonName: string;
    vocabularies: Array<VocabRes>;
}