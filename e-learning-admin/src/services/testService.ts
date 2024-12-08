/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonSortField } from "@/enums/sort-field/commonSortField";
import { TestReq, TestRes } from "@/models/test";
import { PageResponse } from "@/models/common/pageResponse";
import { CommonParam } from "@/types/commonParam";
import axiosInstance from "./agent";

interface TestParams extends CommonParam {
    name?: string;
    sortField?: CommonSortField;
    lessonId?: number;
}

export const getAllTests = async ({
    name,
    lessonId,
    pageNumber,
    pageSize,
    sortField,
    sortDirection
}: TestParams): Promise<PageResponse<TestRes>> => {
    try {
        const params: Record<string, string | number | undefined> = {};
        if (name) params.name = name
        if (lessonId !== undefined) params.lessonId = lessonId
        if (pageNumber !== undefined) params.pageNumber = pageNumber
        if (pageSize !== undefined) params.pageSize = pageSize
        if (sortField) params.sortField = sortField
        if (sortDirection) params.sortDirection = sortDirection

        const queryStr = new URLSearchParams(params as any).toString();
        const url = `/testing${queryStr ? `?${queryStr}` : ""}`
        const response = await axiosInstance.get(url)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const getTestById = async (id: string): Promise<TestRes> => {
    try {
        const response = await axiosInstance.get(`/testing/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const addTest = async (req: TestReq): Promise<TestRes> => {
    try {
        const response = await axiosInstance.post(`/testing`, req)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const updateTest = async (id: string, req: TestReq): Promise<TestRes> => {
    try {
        const response = await axiosInstance.put(`/testing/${id}`, req)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteTest = async (id: string): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/testing/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteMultiTests = async (ids: string[]): Promise<void> => {
    try {
        await axiosInstance.delete(`/testing/delete-multiple`, { data: ids })
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default {
    getAllTests,
    getTestById,
    addTest,
    updateTest,
    deleteTest,
    deleteMultiTests
}