/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonSortField } from "@/enums/sort-field/commonSortField";
import { PageResponse } from "@/models/common/pageResponse";
import { CourseReq, CourseRes, CourseShortRes } from "@/models/course";
import { CommonParam } from "@/types/commonParam";
import axiosInstance from "./agent";

interface CourseParams extends CommonParam {
    name?: string;
    sortField?: CommonSortField;
}

export const getAllCourses = async ({
    name,
    pageNumber,
    pageSize,
    sortField,
    sortDirection
}: CourseParams): Promise<PageResponse<CourseShortRes>> => {
    try {
        const params: Record<string, string | number | undefined> = {};
        if (name) params.name = name
        if (pageNumber !== undefined) params.pageNumber = pageNumber
        if (pageSize !== undefined) params.pageSize = pageSize
        if (sortField) params.sortField = sortField
        if (sortDirection) params.sortDirection = sortDirection

        const queryStr = new URLSearchParams(params as any).toString();
        const url = `/courses${queryStr ? `?${queryStr}` : ""}`
        const response = await axiosInstance.get(url)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const getCourseById = async (id: number): Promise<CourseRes> => {
    try {
        const response = await axiosInstance.get(`/courses/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const addCourse = async (req: CourseReq): Promise<void> => {
    try {
        const formData = new FormData()

        formData.append('name', req.name)
        formData.append('description', req.description)
        formData.append('audience', req.audience)
        formData.append('target', req.target)
        formData.append('content', req.content)
        formData.append('thumbnail', req.thumbnail)
        formData.append('price', req.price.toString())
        formData.append('status', req.status.toString())
        formData.append('categoryId', req.categoryId.toString())
        formData.append('levelId', req.levelId.toString())

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const response = await axiosInstance.post(`/courses`, formData, config)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const updateCourse = async (id: number, req: CourseReq): Promise<void> => {
    try {
        const formData = new FormData()

        formData.append('name', req.name)
        formData.append('description', req.description)
        formData.append('audience', req.audience)
        formData.append('target', req.target)
        formData.append('content', req.content)
        if (req.thumbnail) {
            formData.append('thumbnail', req.thumbnail)
        }
        formData.append('price', req.price.toString())
        formData.append('status', req.status.toString())
        formData.append('categoryId', req.categoryId.toString())
        formData.append('levelId', req.levelId.toString())

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }


        const response = await axiosInstance.put(`/courses/${id}`, formData, config)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteCourse = async (id: number): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/courses/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteMultiCourses = async (ids: number[]): Promise<void> => {
    try {
        await axiosInstance.delete(`/courses/delete-multiple`, { data: ids })
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default {
    getAllCourses,
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourse,
    deleteMultiCourses
}