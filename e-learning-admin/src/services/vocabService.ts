/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonSortField } from "@/enums/sort-field/commonSortField";
import { PageResponse } from "@/models/common/pageResponse";
import { VocabAiReq, VocabReq, VocabRes } from "@/models/vocabulary";
import { CommonParam } from "@/types/commonParam";
import axiosInstance from "./agent";
import { VocabStatus } from "@/enums/vocabStatus";
import axios from "axios";

const baseAiUrl = `${import.meta.env.VITE_API_AI_KEY}`

interface VocabParams extends CommonParam {
    word?: string;
    sortField?: CommonSortField;
    status?: VocabStatus;
}

export const getAllVocabs = async ({
    word,
    pageNumber,
    pageSize,
    sortField,
    sortDirection,
    status
}: VocabParams): Promise<PageResponse<VocabRes>> => {
    try {
        const params: Record<string, string | number | undefined> = {};
        if (word) params.word = word
        if (pageNumber !== undefined) params.pageNumber = pageNumber
        if (pageSize !== undefined) params.pageSize = pageSize
        if (sortField) params.sortField = sortField
        if (sortDirection) params.sortDirection = sortDirection
        if (status !== undefined) params.status = status

        const queryStr = new URLSearchParams(params as any).toString();
        const url = `/vocabularies${queryStr ? `?${queryStr}` : ""}`
        const response = await axiosInstance.get(url)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const getVocabById = async (id: number): Promise<VocabRes> => {
    try {
        const response = await axiosInstance.get(`/vocabularies/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const addVocab = async (req: VocabReq): Promise<void> => {
    try {
        const formData = new FormData()

        formData.append('word', req.word)
        formData.append('ipa', req.ipa)
        formData.append('image', req.image)
        formData.append('meaning', req.meaning)
        formData.append('synonym', req.synonym)
        formData.append('definition', req.definition)
        formData.append('example', req.example)
        formData.append('collocation', req.collocation)
        formData.append('status', req.status.toString())
        formData.append('levelId', req.levelId.toString())

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const response = await axiosInstance.post(`/vocabularies`, formData, config)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const updateVocab = async (id: number, req: VocabReq): Promise<VocabRes> => {
    try {
        const formData = new FormData()

        formData.append('word', req.word)
        formData.append('ipa', req.ipa)
        if (req.image) {
            formData.append('image', req.image)
        }
        formData.append('meaning', req.meaning)
        formData.append('synonym', req.synonym)
        formData.append('definition', req.definition)
        formData.append('example', req.example)
        formData.append('collocation', req.collocation)
        formData.append('status', req.status.toString())
        formData.append('levelId', req.levelId.toString())

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const response = await axiosInstance.put(`/vocabularies/${id}`, formData, config)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteVocab = async (id: number): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/vocabularies/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const deleteMultiVocabs = async (ids: number[]): Promise<void> => {
    try {
        await axiosInstance.delete(`/vocabularies/delete-multiple`, { data: ids })
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const generateVocabs = async (req: VocabAiReq): Promise<VocabRes[]> => {
    try {
        const response = await axios.post(`${baseAiUrl}/vocabulary/generate`, req);
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const addManyVocabs = async (req: VocabReq[]): Promise<void> => {
    try {
        const response = await axiosInstance.post(`/vocabularies/many`, req)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default {
    getAllVocabs,
    getVocabById,
    addVocab,
    updateVocab,
    deleteVocab,
    deleteMultiVocabs,
    generateVocabs,
    addManyVocabs
}