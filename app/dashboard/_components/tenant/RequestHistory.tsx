import { IApiRentalRequests } from "@/lib/types";
import { Suspense } from "react";
import { RequestListSkeleton } from "./RequestCardSkeleton";
import { RequestCard } from "./RequestCard";
import EmptyRequestsState from "./EmptyRequestsState";
export default function RequestHistory({ result }: { result: IApiRentalRequests }) {

    const requests = result?.data ?? []
    const success = result?.success ?? false
    return (
        <div>
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
    );
}
