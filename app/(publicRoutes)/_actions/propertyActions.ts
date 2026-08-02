"use server";

import { IProperty, PropertiesResponse } from "@/lib/types";
import { cookies } from "next/headers";
import { toast } from "sonner";


type NewsQuery = {
    searchTerm?: string | string[];
    page?: string | string[];
    category?: string | string[];
    division?: string | string[];
    district?: string | string[];
    minRent?: string | string[];
    maxRent?: string | string[];
    floor?: string | string[];
    sortBy?: string | string[];
    sortOrder?: string | string[];
};


export const getProperties = async ({
    query,
}: {
    query?: NewsQuery;
}): Promise<PropertiesResponse> => {
    const params = new URLSearchParams();

    const searchTerm = Array.isArray(query?.searchTerm)
        ? query.searchTerm[0]
        : query?.searchTerm;
    const page = Array.isArray(query?.page) ? query.page[0] : query?.page;
    const category = Array.isArray(query?.category) ? query.category[0] : query?.category;
    const division = Array.isArray(query?.division) ? query.division[0] : query?.division;
    const district = Array.isArray(query?.district) ? query.district[0] : query?.district;
    const minRent = Array.isArray(query?.minRent) ? query.minRent[0] : query?.minRent;
    const maxRent = Array.isArray(query?.maxRent) ? query.maxRent[0] : query?.maxRent;
    const floor = Array.isArray(query?.floor) ? query.floor[0] : query?.floor;
    const sortBy = Array.isArray(query?.sortBy) ? query.sortBy[0] : query?.sortBy;
    const sortOrder = Array.isArray(query?.sortOrder) ? query.sortOrder[0] : query?.sortOrder;

    if (searchTerm) params.set("searchTerm", searchTerm);
    if (page) params.set("page", page);
    if (category) params.set("category", category);
    if (division) params.set("division", division);
    if (district) params.set("district", district);
    if (minRent) params.set("minRent", minRent);
    if (maxRent) params.set("maxRent", maxRent);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (sortBy) params.set("sortBy", sortBy);
    if (floor && floor !== "any") params.set("floor", floor);


    const queryString = params.toString();

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/properties?limit=8${queryString ? `&${queryString}` : ""}`,
        {
            cache: "force-cache",
            next: {
                revalidate: 60 * 60,
                tags: ["properties"],
            },
        },
    );

    const result = await res.json();

    return result;
};


export const getPropertyById = async (id: string): Promise<IProperty | null> => {
    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/properties/${id}`,
            {
                cache: "no-store",
            });

        if (!res.ok) return null
        const result = await res.json();
        return result.data || null;

    } catch (error) {
        toast.error('Failed to fetch property details:')
        console.error("Failed to fetch property details:", error)
        return null
    }
}

export const getLandlordProperties = async ({
    query,
}: {
    query?: NewsQuery;
}): Promise<PropertiesResponse> => {
    const params = new URLSearchParams();

    const searchTerm = Array.isArray(query?.searchTerm)
        ? query.searchTerm[0]
        : query?.searchTerm;
    const page = Array.isArray(query?.page) ? query.page[0] : query?.page;
    const category = Array.isArray(query?.category) ? query.category[0] : query?.category;
    const division = Array.isArray(query?.division) ? query.division[0] : query?.division;
    const district = Array.isArray(query?.district) ? query.district[0] : query?.district;
    const minRent = Array.isArray(query?.minRent) ? query.minRent[0] : query?.minRent;
    const maxRent = Array.isArray(query?.maxRent) ? query.maxRent[0] : query?.maxRent;
    const floor = Array.isArray(query?.floor) ? query.floor[0] : query?.floor;
    const sortBy = Array.isArray(query?.sortBy) ? query.sortBy[0] : query?.sortBy;
    const sortOrder = Array.isArray(query?.sortOrder) ? query.sortOrder[0] : query?.sortOrder;

    if (searchTerm) params.set("searchTerm", searchTerm);
    if (page) params.set("page", page);
    if (category) params.set("category", category);
    if (division) params.set("division", division);
    if (district) params.set("district", district);
    if (minRent) params.set("minRent", minRent);
    if (maxRent) params.set("maxRent", maxRent);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (sortBy) params.set("sortBy", sortBy);
    if (floor && floor !== "any") params.set("floor", floor);


    const queryString = params.toString();

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/properties/landlord/all?limit=8${queryString ? `&${queryString}` : ""}`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60,
                tags: ["landlord-properties"],
            },
        },
    );

    const result = await res.json();

    return result;
};

