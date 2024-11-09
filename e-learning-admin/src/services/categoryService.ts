/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonSortField } from "@/enums/sort-field/commonSortField";
import { CategoryReq, CategoryRes } from "@/models/category";
import { PageResponse } from "@/models/common/pageResponse";
import { CommonParam } from "@/types/commonParam";
import axiosInstance from "./agent";

interface CategoryParams extends CommonParam {
    name?: string;
    sortField?: CommonSortField;
}

export const getAllCategories = async ({
    name,
    pageNumber,
    pageSize,
    sortField,
    sortDirection
}: CategoryParams): Promise<PageResponse<CategoryRes>> => {
    try {
        const params: Record<string, string | number | undefined> = {};
        if (name) params.name = name
        if (pageNumber !== undefined) params.pageNumber = pageNumber
        if (pageSize !== undefined) params.pageSize = pageSize
        if (sortField) params.sortField = sortField
        if (sortDirection) params.sortDirection = sortDirection

        const queryStr = new URLSearchParams(params as any).toString();
        const url = `/categories${queryStr ? `?${queryStr}` : ""}`
        const response = await axiosInstance.get(url)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const getCategoryById = async (id: number): Promise<CategoryRes> => {
    try {
        const response = await axiosInstance.get(`/categories/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const addCategory = async (req: CategoryReq): Promise<CategoryRes> => {
    try {
        const response = await axiosInstance.post(`/categories`, req)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const updateCategory = async (id: number, req: CategoryReq): Promise<void> => {
    try {
        const response = await axiosInstance.put(`/categories/${id}`, req)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteCategory = async (id: number): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/categories/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteMultiCategories = async (ids: number[]): Promise<void> => {
    try {
        await axiosInstance.delete(`/categories/delete-multiple`, { data: ids })
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    deleteMultiCategories
}