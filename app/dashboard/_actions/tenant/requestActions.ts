import { cookies } from "next/headers";

export const getTenantRequests = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/requests/tenant`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60,
                tags: ["tenant-requests"],
            },
        },
    );

    const result = await res.json();

    return result.data;
};
