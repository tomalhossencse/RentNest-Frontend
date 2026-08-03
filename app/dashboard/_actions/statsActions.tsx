import { isRefreshTokenValid } from "@/services/refreshToken";

export const getLandlordStats = async () => {
    const accessToken = await isRefreshTokenValid()

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/properties/landlord/stats`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60,
                tags: ["landlord-stats"],
            },
        },
    );

    const result = await res.json();

    return result;
};

export const getTenantStats = async () => {
    const accessToken = await isRefreshTokenValid()

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/properties/tenant/stats`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60,
                tags: ["tenant-stats"],
            },
        },
    );

    const result = await res.json();

    return result;
};

export const getAdminStats = async () => {
    const accessToken = await isRefreshTokenValid()

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/properties/admin/stats`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60,
                tags: ["admin-stats"],
            },
        },
    );

    const result = await res.json();

    return result;
};




