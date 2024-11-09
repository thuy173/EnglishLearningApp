export default interface VocabDto {
  lessonName: string;
  vocabularies: VocabDetailDto[];
}

export interface VocabDetailDto {
  id: number;
  word: string;
  ipa: string;
  image: string;
  meaning: string;
  synonym: string;
  definition: string;
  example: string;
  collocation: string;
  status: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface VocabShortDto {
  id: number;
  word: string;
  image: string;
}