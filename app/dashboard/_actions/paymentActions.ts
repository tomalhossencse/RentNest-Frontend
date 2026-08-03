"use server"

import { isRefreshTokenValid } from "@/services/refreshToken";
import { revalidateTag } from "next/cache";

export const createPayment = async (requestId: string) => {
    const payload = {
        requestId
    };
    const accessToken = await isRefreshTokenValid()

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result?.success) {
        revalidateTag("tenant-requests", {
            expire: 0,
        });
    }

    return result;
};

export const revalidateTenantRequests = async () => {
    revalidateTag("tenant-requests", {
        expire: 0,
    });
};
