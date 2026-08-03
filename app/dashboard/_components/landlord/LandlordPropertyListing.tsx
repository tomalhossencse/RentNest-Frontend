import { deleteProperty, updatePropertyStatus } from "@/app/(publicRoutes)/_actions/propertyActions";
import { LandlordPropertyCard } from "./LandlordPropertyCard";
import { toast } from "sonner";

export default function LandlordPropertyListing({ result }: { result: any }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result?.data?.map((property: any) => (
                <LandlordPropertyCard
                    key={property.id}
                    property={property}
                />
            ))}
        </div>
    )
}
