import { getTenantRequests } from "../../_actions/tenant/requestActions"
import { RequestCard } from "../../_components/tenant/RequestCard"
import EmptyRequestsState from "../../_components/tenant/EmptyRequestsState"
import { IApiRentalRequests } from "@/lib/types"
import { Suspense } from "react"
import { RequestListSkeleton } from "../../_components/tenant/RequestCardSkeleton"
export default async function TenantRequestsPage() {
    const { data: requests, success } = await getTenantRequests() as IApiRentalRequests


    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                    My Rental Applications
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Track your rental application statuses and execute payment once approved.
                </p>
            </div>

            {success && requests.length > 0 ? (
                <Suspense fallback={<RequestListSkeleton count={4} />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {requests.map((req) => (
                            <RequestCard key={req.id} req={req} />
                        ))}
                    </div>
                </Suspense>
            ) : (
                <EmptyRequestsState />
            )}
        </div>
    )
}

