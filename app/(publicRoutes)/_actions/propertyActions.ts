"use server";

import { PropertiesResponse } from "@/lib/types";


type NewsQuery = {
    searchTerm?: string | string[];
    page?: string | string[];
    category?: string | string[];
    division?: string | string[];
    district?: string | string[];
    minRent?: string | string[];
    maxRent?: string | string[];
    floor?: string | string[];
    // sortBy?: string | string[];
    // sortOrder?: string | string[];
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

    if (searchTerm) params.set("searchTerm", searchTerm);
    if (page) params.set("page", page);
    if (category) params.set("category", category);
    if (division) params.set("division", division);
    if (district) params.set("district", district);
    if (minRent) params.set("minRent", minRent);
    if (maxRent) params.set("maxRent", maxRent);
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
