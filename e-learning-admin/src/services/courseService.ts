/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonSortField } from "@/enums/sort-field/commonSortField";
import { PageResponse } from "@/models/common/pageResponse";
import { CourseReq, CourseRes } from "@/models/course";
import { CommonParam } from "@/types/commonParam";
import axiosInstance from "./agent";

interface CourseParams extends CommonParam {
    name: string;
    sortField: CommonSortField;
}

export const getAllCourses = async ({
    name,
    pageNumber,
    pageSize,
    sortField,
    sortDirection
}: CourseParams): Promise<PageResponse<CourseRes>> => {
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
        formData.append('name', req.description)
        formData.append('name', req.audience)
        formData.append('name', req.target)
        formData.append('name', req.content)
        formData.append('name', req.thumbnail)
        formData.append('name', req.price.toString())
        formData.append('name', req.status.toString())
        formData.append('name', req.categoryId.toString())
        formData.append('name', req.levelId.toString())

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
        const response = await axiosInstance.put(`/courses/${id}`, req)
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