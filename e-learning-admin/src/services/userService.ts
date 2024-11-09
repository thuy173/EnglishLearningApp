import axiosInstance from "./agent"

export const getUser = async () => {
    try {
        await axiosInstance.get(`/users`)
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default { getUser }