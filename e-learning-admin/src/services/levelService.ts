/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonSortField } from "@/enums/sort-field/commonSortField";
import { LevelReq, LevelRes } from "@/models/level";
import { PageResponse } from "@/models/common/pageResponse";
import { CommonParam } from "@/types/commonParam";
import axiosInstance from "./agent";

interface LevelParams extends CommonParam {
    name: string;
    sortField: CommonSortField;
}

export const getAllLevels = async ({
    name,
    pageNumber,
    pageSize,
    sortField,
    sortDirection
}: LevelParams): Promise<PageResponse<LevelRes>> => {
    try {
        const params: Record<string, string | number | undefined> = {};
        if (name) params.name = name
        if (pageNumber !== undefined) params.pageNumber = pageNumber
        if (pageSize !== undefined) params.pageSize = pageSize
        if (sortField) params.sortField = sortField
        if (sortDirection) params.sortDirection = sortDirection

        const queryStr = new URLSearchParams(params as any).toString();
        const url = `/levels${queryStr ? `?${queryStr}` : ""}`
        const response = await axiosInstance.get(url)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const getLevelById = async (id: number): Promise<LevelRes> => {
    try {
        const response = await axiosInstance.get(`/levels/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const addLevel = async (req: LevelReq): Promise<void> => {
    try {
        const response = await axiosInstance.post(`/levels`, req)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const updateLevel = async (id: number, req: LevelReq): Promise<void> => {
    try {
        const response = await axiosInstance.put(`/levels/${id}`, req)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteLevel = async (id: number): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/levels/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteMultiLevels = async (ids: number[]): Promise<void> => {
    try {
        await axiosInstance.delete(`/levels/delete-multiple`, { data: ids })
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default {
    getAllLevels,
    getLevelById,
    addLevel,
    updateLevel,
    deleteLevel,
    deleteMultiLevels
}