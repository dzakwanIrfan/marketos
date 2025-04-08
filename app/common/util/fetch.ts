import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";

export const getHeaders = async () => {
    const c = await cookies();
    return {
        Cookie: c.toString(),
    };
};

export const post = async (path: string, data: FormData | object) => {
    const body = data instanceof FormData ? Object.fromEntries(data) : data;
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(body),
    });
    const parseRes = await res.json();
    if (!res.ok) {
        return { error: getErrorMessage(parseRes) };
    }

    return { error: "", data: parseRes };
};

export const get = async <T>(
    path: string, 
    tags?: string[], 
    params?: URLSearchParams
) => {
    const url = params ? `${API_URL}/${path}?` + params : `${API_URL}/${path}`;
    const headers = await getHeaders();
    const res = await fetch(url, {
        headers: { ...headers },
        next: { tags },
    });
    return res.json() as T;
};