"use server";

import { unstable_noStore } from "next/cache";
import { isRefreshTokenValid } from "./refreshToken";

export const getMe = async () => {
    unstable_noStore();
    const accessToken = await isRefreshTokenValid()

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
        headers: {
            Cookie: `accessToken=${accessToken}`,
        },
    });


    const result = await res.json();


    return result;
};
