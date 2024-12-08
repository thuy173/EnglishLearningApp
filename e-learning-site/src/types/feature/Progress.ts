export enum LessonStatus {
  NOT_STARTED = "Chưa bắt đầu",
  COMPLETED = "Hoàn thành",
  IN_PROGRESS = "Trong quá trình",
}
export default interface ProgressDto {
  courseId: number;
  courseName: string;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  lessonProgress: LessonProgressDto[];
}

export interface LessonProgressDto {
  lessonId: number;
  lessonName: string;
  startDate: string;
  completedDate: string | null;
  status: LessonStatus;
  score: number;
  timeSpent: number;
  totalVocabs: number;
  correctVocabs: number;
  incorrectVocabs: number;
}

export interface LessonProgressRequest {
  courseId: number;
  lessonId: number;
  startDate: string;
  completedDate?: string;
  score: number;
  timeSpent: number;
  vocabProgress: VocabProgressDto[];
}

export interface VocabProgressDto {
  vocabId: number;
  isCorrect: boolean;
}
