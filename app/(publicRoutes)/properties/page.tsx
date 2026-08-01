import { Suspense } from "react";
import { getProperties } from "../_actions/propertyActions"
import { Paginations } from "../_components/Property/Pagination";
import { PropertyListing } from "../_components/Property/PropertyListing"
import { PropertySearchBar } from "../_components/Property/PropertySearchBar"

const PropertiesPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const query = await searchParams

    const result = await getProperties({ query })


    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-4 sm:px-6 lg:px-8">
            <PropertySearchBar />
            <PropertyListing result={result} />
            <Paginations result={result} />
        </div>
    )
}

export default PropertiesPage
