import { LessonStatus } from "@/enums/lessonStatus";

export interface LessonReq {
    name: string;
    description: string;
    thumbnail: File | string;
    status: LessonStatus;
    courseId: number;
}

export interface LessonRes {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    status: LessonStatus;
    courseId: number;
}