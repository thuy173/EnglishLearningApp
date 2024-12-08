import axiosInstance from "./agent"

export const uploadFile = async (file: File): Promise<string> => {
    try {
        const formData = new FormData()
        formData.append('file', file)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const response = await axiosInstance.post(`/upload`, formData, config)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default { uploadFile }