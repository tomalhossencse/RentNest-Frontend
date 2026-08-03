import { getTenantRequests } from "../../_actions/requestActions"
import { IApiRentalRequests } from "@/lib/types"
import RequestHistory from "../../_components/tenant/RequestHistory";
export default async function TenantRequestsPage() {
    const result = await getTenantRequests() as IApiRentalRequests


    return (
        <div className="space-y-4">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                    My Rental Applications
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Track your rental application statuses and execute payment once approved.
                </p>
            </div>

            {/* history */}
            <RequestHistory result={result} />
        </div>
    )
}

