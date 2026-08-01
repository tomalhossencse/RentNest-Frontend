'use server'
import { RentalRequestFormData } from "@/lib/types";
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

    return result;
};

export const addRequests = async (data: RentalRequestFormData, propertyId: string) => {
    const payload = {
        ...data,
        propertyId
    };

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/requests`, {
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

export const getLandlordRequests = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/requests/landlord`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60,
                tags: ["landlord-requests"],
            },
        },
    );

    const result = await res.json();

    return result;
};


