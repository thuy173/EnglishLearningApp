export interface LessonReq {
    name: string;
    description: string;
    thumbnail: File;
    status: boolean;
    courseId: number;
}

export interface LessonRes {
    id: number;
    name: string;
    description: string;
    thumbnail: File;
    status: boolean;
    courseId: number;
}