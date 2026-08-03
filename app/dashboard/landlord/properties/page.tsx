import { getLandlordProperties } from "@/app/(publicRoutes)/_actions/propertyActions";
import { Paginations } from "@/app/(publicRoutes)/_components/Property/Pagination";
import { PropertyListing } from "@/app/(publicRoutes)/_components/Property/PropertyListing";
import { PropertySearchBar } from "@/app/(publicRoutes)/_components/Property/PropertySearchBar";
import { AddPropertyButton } from "../../_components/landlord/AddProperyButton";
import LandlordPropertyListing from "../../_components/landlord/LandlordPropertyListing";
const DashboardPropertiesPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const query = await searchParams;
    const result = await getLandlordProperties({ query });

    return (
        <div className="space-y-6">
            {/* Header Actions Area */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex-1">
                    <PropertySearchBar />
                </div>
                <div className="shrink-0">
                    <AddPropertyButton />
                </div>
            </div>

            {/* Listings Grid */}
            <LandlordPropertyListing result={result} />

            {/* Pagination */}
            <div className="pt-2 flex justify-center">
                <Paginations result={result} />
            </div>
        </div>
    );
};

export default DashboardPropertiesPage;
