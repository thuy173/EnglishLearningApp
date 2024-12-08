/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserReq, UserRes, UserUpdateReq } from "@/models/user"
import axiosInstance from "./agent"
import { CommonParam } from "@/types/commonParam";
import { CommonSortField } from "@/enums/sort-field/commonSortField";
import { PageResponse } from "@/models/common/pageResponse";

interface UserParams extends CommonParam {
    name?: string;
    sortField?: CommonSortField;
    status?: boolean;
}

export const getAllUsers = async ({
    name,
    status,
    pageNumber,
    pageSize,
    sortField,
    sortDirection
}: UserParams): Promise<PageResponse<UserRes>> => {
    try {
        const params: Record<string, string | number | boolean | undefined> = {};
        if (name) params.name = name
        if (pageNumber !== undefined) params.pageNumber = pageNumber
        if (pageSize !== undefined) params.pageSize = pageSize
        if (status !== undefined) params.status = status
        if (sortField) params.sortField = sortField
        if (sortDirection) params.sortDirection = sortDirection

        const queryStr = new URLSearchParams(params as any).toString();
        const url = `/users${queryStr ? `?${queryStr}` : ""}`
        const response = await axiosInstance.get(url)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const getUserProfile = async (): Promise<UserRes> => {
    try {
        const response = await axiosInstance.get(`/users/profile`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const addUser = async (req: UserReq): Promise<UserRes> => {
    try {
        const response = await axiosInstance.post(`/users`, req)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const updateUser = async (id: number, req: UserUpdateReq): Promise<UserRes> => {
    try {
        const response = await axiosInstance.put(`/users/${id}`, req)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteUser = async (id: number): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/users/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteMultiUsers = async (ids: number[]): Promise<void> => {
    try {
        await axiosInstance.delete(`/users/delete-multiple`, { data: ids })
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default {
    getAllUsers,
    getUserProfile,
    addUser,
    updateUser,
    deleteUser,
    deleteMultiUsers
}