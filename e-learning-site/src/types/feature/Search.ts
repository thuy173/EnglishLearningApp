export default interface SearchRequest {
  keyword: string;
  page: number;
  size: number;
}

export interface SearchResponse {
  courses: CourseSearchDto[];
  vocabularies: VocabSearchDto[];
}

export interface CourseSearchDto {
  id: number;
  name: string;
  description: string;
  highlightedName: string;
  highlightedDesc: string;
}

export interface VocabSearchDto {
  id: number;
  word: string;
  meaning: string;
  highlightedWord: string;
  highlightedMeaning: string;
}
