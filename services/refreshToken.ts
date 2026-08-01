"use server";

import { verifyToken } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const getNewAccessTokenByRefreshToken = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
        return {
            success: false,
            message: "Refresh token not found!",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
        {
            method: "POST",
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
            },
            cache: "no-store",
        },
    );

    const result = await res.json();

    // console.log(result);

    return result;
};

export const isRefreshTokenValid = async () => {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const decodeAccessToken = accessToken
        ? ((await verifyToken(accessToken, "access")) as JwtPayload)
        : null;

    const decodeRefreshToken = refreshToken
        ? ((await verifyToken(refreshToken, "refresh")) as JwtPayload)
        : null;

    if (!decodeAccessToken?.success && decodeRefreshToken?.success) {
        const result = await getNewAccessTokenByRefreshToken();

        if (result.success) {
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24,
            });

            accessToken = newAccessToken;
        }
    }

    return accessToken;
};
