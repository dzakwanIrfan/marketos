import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";

const getHeaders = async () => {
    const c = await cookies();
    return {
        Cookie: c.toString(),
    };
};

export const post = async (path: string, formData: FormData) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(Object.fromEntries(formData)),
    });
    const parseRes = await res.json();
    if (!res.ok) {
        return { error: getErrorMessage(parseRes) };
    }

    return { error: "" };
};

export const get = async <T>(path: string, tags?: string[]) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/${path}`, {
        headers: { ...headers },
        next: { tags },
    });
    return res.json() as T;
};