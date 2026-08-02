import { getLandlordProperties, getProperties } from "@/app/(publicRoutes)/_actions/propertyActions";
import { Paginations } from "@/app/(publicRoutes)/_components/Property/Pagination";
import { PropertyListing } from "@/app/(publicRoutes)/_components/Property/PropertyListing";
import { PropertySearchBar } from "@/app/(publicRoutes)/_components/Property/PropertySearchBar";


const DashboardPropertiesPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const query = await searchParams

    const result = await getLandlordProperties({ query })


    return (
        <div>
            <div className="space-y-5">
                <PropertySearchBar />
                <PropertyListing result={result} />
                <Paginations result={result} />
            </div>
        </div>
    )
}

export default DashboardPropertiesPage
