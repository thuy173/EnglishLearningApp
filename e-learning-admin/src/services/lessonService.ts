/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonSortField } from "@/enums/sort-field/commonSortField";
import { PageResponse } from "@/models/common/pageResponse";
import { LessonReq, LessonRes } from "@/models/lesson";
import { CommonParam } from "@/types/commonParam";
import axiosInstance from "./agent";

interface LessonParams extends CommonParam {
    name: string;
    sortField: CommonSortField;
}

export const getAllLessons = async ({
    name,
    pageNumber,
    pageSize,
    sortField,
    sortDirection
}: LessonParams): Promise<PageResponse<LessonRes>> => {
    try {
        const params: Record<string, string | number | undefined> = {};
        if (name) params.name = name
        if (pageNumber !== undefined) params.pageNumber = pageNumber
        if (pageSize !== undefined) params.pageSize = pageSize
        if (sortField) params.sortField = sortField
        if (sortDirection) params.sortDirection = sortDirection

        const queryStr = new URLSearchParams(params as any).toString();
        const url = `/lessons${queryStr ? `?${queryStr}` : ""}`
        const response = await axiosInstance.get(url)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const getLessonById = async (id: number): Promise<LessonRes> => {
    try {
        const response = await axiosInstance.get(`/lessons/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const addLesson = async (req: LessonReq): Promise<void> => {
    try {
        const formData = new FormData()

        formData.append('name', req.name)
        formData.append('name', req.description)
        formData.append('name', req.thumbnail)
        formData.append('name', req.status.toString())
        formData.append('name', req.courseId.toString())

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const response = await axiosInstance.post(`/lessons`, formData, config)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const updateLesson = async (id: number, req: LessonReq): Promise<void> => {
    try {
        const response = await axiosInstance.put(`/lessons/${id}`, req)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteLesson = async (id: number): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/lessons/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteMultiLessons = async (ids: number[]): Promise<void> => {
    try {
        await axiosInstance.delete(`/lessons/delete-multiple`, { data: ids })
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default {
    getAllLessons,
    getLessonById,
    addLesson,
    updateLesson,
    deleteLesson,
    deleteMultiLessons
}