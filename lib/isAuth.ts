import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getJwtToken } from "./auth";


export const IsAuth = () => {
    const router = useRouter();
    const token = typeof window === "undefined" ? "" : getJwtToken();

    useEffect(() => {
        if (!token) {
            router.replace("/login?next=" + router.pathname)
        }
    }, [token, router])
}

