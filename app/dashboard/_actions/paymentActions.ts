"use server"

import { cookies } from "next/headers";

export const createPayment = async (requestId: string) => {
    const payload = {
        requestId
    };

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    return result;
};
