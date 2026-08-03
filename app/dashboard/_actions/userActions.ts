"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const toggleUserStatus = async (userId: string, status: string) => {
    console.log("Toggling user status for userId:", userId, "to status:", status);
    const payload = { status };
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/auth/users/${userId}`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
                "content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(payload),

        },);

    const result = await res.json();
    if (result?.success) {
        revalidateTag("all-users", {
            expire: 0,
        });
    }

    return result;
};


export const getAllUsers = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/auth/users`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60,
                tags: ["all-users"],
            },
        })

    const result = await res.json();

    return result;
};

