import { RootState } from "@/redux/store";

export const selectVocabulariesInLesson = (state: RootState) => state.vocab.lessonVocab;

export const selectVocabularies = (state: RootState) => state.vocab.vocabularies;

export const selectShortVocab = (state: RootState) => state.vocab.shortVocab;

export const selectOneVocab = (state: RootState) => state.vocab.vocabulary;
