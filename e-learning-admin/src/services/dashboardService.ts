import { DashboardRes } from "@/models/dashboard";
import axiosInstance from "./agent";

export const getDashboard = async (): Promise<DashboardRes> => {
    try {
        const response = await axiosInstance.get(`/dashboard`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default { getDashboard }