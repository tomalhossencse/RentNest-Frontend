"use server";

import { PropertiesResponse } from "@/lib/types";


export const getProperties = async (): Promise<PropertiesResponse> => {

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/properties`,
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
