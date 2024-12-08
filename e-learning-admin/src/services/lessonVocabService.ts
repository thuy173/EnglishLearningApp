import { LessonVocabReq, LessonVocabRes } from "@/models/lessonVocab";
import axiosInstance from "./agent";

export const addLessonVocab = async (req: LessonVocabReq): Promise<void> => {
    try {
        const response = await axiosInstance.post(`/lesson-vocab/add`, req)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const getLessonVocabs = async (lessonId: number): Promise<LessonVocabRes> => {
    try {
        const response = await axiosInstance.get(`/lesson-vocab/${lessonId}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteLessonVocabs = async (lessonId: number, ids: number[]): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/lesson-vocab/${lessonId}/vocabs`, { data: ids })
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default { addLessonVocab, getLessonVocabs, deleteLessonVocabs }