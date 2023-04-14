import axios from "axios";

export const fetchWithToken = async (url: string) => {
    const res = await axios.get(url, {
        headers: {
            Authorization: localStorage.getItem("token")!,
        }
    });

    return res.data;
};

export const api = (options?: { useToken: false }) => {
    const headers = options?.useToken ? {
        Authorization: localStorage.getItem("token")!
    } : {};

    return {
        post: (url: string, body: any) => axios.post(url, body, { headers }),
        put: (url: string, body: any) => axios.put(url, body, { headers }),
        delete: (url: string) => axios.delete(url, { headers }),
    };
};