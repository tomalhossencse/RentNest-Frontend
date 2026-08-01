import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RequestCardSkeleton() {
    return (
        <Card className="border-border bg-card shadow-sm overflow-hidden">
            {/* Header Skeleton */}
            <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-border/50 bg-muted/20">
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-6 w-28 rounded-full" />
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
                {/* Title & Address Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-3/4 rounded" />
                    <Skeleton className="h-3.5 w-1/2 rounded" />
                </div>

                {/* Landlord Info Box Skeleton */}
                <div className="rounded-lg border border-border/60 bg-muted/30 p-2.5 space-y-2">
                    <Skeleton className="h-3 w-28 rounded" />
                    <div className="flex items-center justify-between gap-2 pt-1">
                        <Skeleton className="h-4 w-32 rounded" />
                        <Skeleton className="h-4 w-36 rounded" />
                    </div>
                </div>

                {/* Grid Stats Skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-muted/20 p-3 rounded-lg border border-border/40">
                    <div className="space-y-1.5">
                        <Skeleton className="h-3 w-16 rounded" />
                        <Skeleton className="h-5 w-20 rounded" />
                    </div>
                    <div className="space-y-1.5">
                        <Skeleton className="h-3 w-20 rounded" />
                        <Skeleton className="h-5 w-24 rounded" />
                    </div>
                    <div className="col-span-2 sm:col-span-1 space-y-1.5">
                        <Skeleton className="h-3 w-18 rounded" />
                        <Skeleton className="h-4 w-28 rounded" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export function RequestListSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <RequestCardSkeleton key={i} />
            ))}
        </div>
    )
}
