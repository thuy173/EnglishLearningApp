export default interface TestingResponseDto {
  id: string;
  title: string;
  description: string;
  lessonId: number;
  timeLimit: number;
  passingScore: number;
  questions: QuestionDto[];
  createdAt: string;
  updatedAt: string;
}

export interface QuestionDto {
  id: string;
  content: string;
  prompt: string;
  type: string;
  points: number;
  explanation: string;
  media: string;
  options: OptionDto[];
}

export interface OptionDto {
  id: string | null;
  content: string;
  media: string | null;
}

export interface TestingShortDto {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  totalQuestions: number;
}

export interface Answer {
  questionId: string;
  selectedOptions: string[];
  timeSpent: number;
}

export interface TestSubmitPayload {
  quizId: string;
  answers: Answer[];
}

export interface PaginationResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface QuestionResult {
  questionId: string;
  prompt: string;
  content: string;
  options: OptionDto[];
  selectedOptions: string[];
  correctAnswers: string[];
  isCorrect: boolean;
  points: number;
  earnedPoints: number;
  timeSpent: number;
  explanation: string;
}

export interface Statistics {
  totalQuestions: number;
  incorrectAnswer: number;
  averageTimePerQuestion: number;
  accuracy: number;
  correctAnswers: number;
}

export interface QuizResult {
  quizId: string;
  score: number;
  passed: boolean;
  startedAt: string;
  completedAt: string;
  totalTimeSpent: number;
  questionResults: QuestionResult[];
  statistics: Statistics;
}

export interface UserQuizAttemptResponse {
  attemptId: string;
  quizId: string;
  quizTitle: string;
  score: number;
  passed: boolean;
  startedAt: string;
  completedAt: string;
}
