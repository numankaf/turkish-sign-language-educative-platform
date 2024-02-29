"use client";

import { useSession } from "next-auth/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { axiosBase } from "./axios";

const useAxiosAuth = () => {
    const axiosAuth = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });

    const { data: session, status, update } = useSession();
    const router = useRouter();
    axiosAuth.interceptors.request.use(
        async (req) => {
            req.headers.Authorization = `Bearer ${session?.user.access_token}`;
            const decoded = jwtDecode(session!.user.access_token) as any;
            const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;
            if (!isExpired) {
                return req;
            }
            await axiosBase
                .post("/auth/refresh-token", {
                    refreshToken: session?.user.refresh_token,
                })
                .then(async (res) => {
                    await update({
                        ...session,
                        user: {
                            ...session?.user,
                            access_token: res.data.access_token,
                            refresh_token: res.data.refresh_token,
                        },
                    });
                    if (session) {
                        session.user.access_token = res.data.access_token;
                        session.user.refresh_expires_in = res.data.refresh_token;
                    }
                })
                .catch((error) => {
                    router.replace(process.env.NEXT_PUBLIC_URL + "/auth/login");
                });

            req.headers.Authorization = `Bearer ${session?.user.access_token}`;
            return req;
        },
        (error) => Promise.reject(error)
    );

    return axiosAuth;
};

export default useAxiosAuth;
