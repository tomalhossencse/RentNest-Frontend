import { Skeleton } from "@/components/ui/skeleton";

export default function PropertiesSkeleton() {
    return (
        <div className="mx-auto max-w-7xl space-y-6 p-6">
            <Skeleton className="h-10 w-64" />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                        <div className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card p-4 shadow-sm space-y-4">
                            {/* Property Image Skeleton */}
                            <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl">
                                <Skeleton className="h-full w-full" />
                                {/* Category Badge Placeholder */}
                                <Skeleton className="absolute top-3 left-3 h-6 w-20 rounded-full" />
                            </div>

                            {/* Content Section */}
                            <div className="space-y-3">
                                {/* Title & Price Line */}
                                <div className="flex items-start justify-between gap-2">
                                    <Skeleton className="h-6 w-2/3 rounded-md" />
                                    <Skeleton className="h-6 w-1/4 rounded-md" />
                                </div>

                                {/* Location / Address Line */}
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 rounded-full" /> {/* Pin Icon */}
                                    <Skeleton className="h-4 w-1/2 rounded-md" />
                                </div>

                                {/* Features Row (Beds, Baths, Sqft) */}
                                <div className="flex items-center justify-between border-y border-border/40 py-2.5">
                                    <div className="flex items-center gap-1.5">
                                        <Skeleton className="h-4 w-4 rounded" />
                                        <Skeleton className="h-4 w-10 rounded" />
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Skeleton className="h-4 w-4 rounded" />
                                        <Skeleton className="h-4 w-10 rounded" />
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Skeleton className="h-4 w-4 rounded" />
                                        <Skeleton className="h-4 w-12 rounded" />
                                    </div>
                                </div>

                                {/* Footer (Landlord Avatar & Action) */}
                                <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        <Skeleton className="h-4 w-24 rounded" />
                                    </div>
                                    <Skeleton className="h-8 w-20 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
