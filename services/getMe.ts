"use server";

import { isRefreshTokenValid } from "./refreshToken";

export const getMe = async () => {
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
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24,
            tags: ["my-profile"],
        },
    });

    const result = await res.json();


    return result;
};
