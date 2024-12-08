import { QuestionType } from "@/enums/questionType";

export interface TestReq {
    title: string;
    description: string;
    lessonId: number;
    levelId: number;
    timeLimit: number;
    passingScore: number;
    questions: Array<{
        content: string;
        type: QuestionType;
        points: number;
        options: Array<{
            content: string;
        }>;
        correctAnswers: string[];
        explanation: string;
    }>;
}

export interface TestRes {
    id: string;
    title: string;
    description: string;
    lessonId: number;
    levelId: number;
    timeLimit: number;
    passingScore: number;
    questions: Array<{
        id: string;
        content: string;
        type: QuestionType;
        points: number;
        options: Array<{
            content: string;
        }>;
        explanation: string;
    }>;
    createdAt: string;
    updatedAt: string;
}