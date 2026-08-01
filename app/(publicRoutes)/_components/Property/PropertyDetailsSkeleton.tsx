import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function PropertyDetailsSkeleton() {
    return (
        <div className="min-h-screen bg-background text-foreground pb-12 pt-6">
            <div className="container mx-auto max-w-6xl px-4">

                {/* Navigation & Action Top Bar Skeleton */}
                <div className="mb-6 flex items-center justify-between">
                    <Skeleton className="h-9 w-36 bg-muted" />
                    <Skeleton className="h-9 w-20 bg-muted" />
                </div>

                {/* Hero Image Skeleton */}
                <div className="relative mb-8 h-80 w-full overflow-hidden rounded-xl border border-border bg-muted md:h-[450px]">
                    <Skeleton className="h-full w-full" />
                    <div className="absolute top-4 left-4 flex gap-2">
                        <Skeleton className="h-6 w-20 bg-background/80" />
                        <Skeleton className="h-6 w-24 bg-background/80" />
                    </div>
                </div>

                {/* Main Content & Sidebar Grid Skeleton */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* Main Info Skeleton (2 Columns) */}
                    <div className="space-y-6 lg:col-span-2">

                        {/* Title & Location */}
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-3/4 md:w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>

                        <Separator className="bg-border" />

                        {/* Features Key-Value Cards */}
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <div className="rounded-lg border border-border p-3.5 space-y-2">
                                <Skeleton className="h-3.5 w-16" />
                                <Skeleton className="h-5 w-24" />
                            </div>
                            <div className="rounded-lg border border-border p-3.5 space-y-2">
                                <Skeleton className="h-3.5 w-20" />
                                <Skeleton className="h-5 w-20" />
                            </div>
                            <div className="rounded-lg border border-border p-3.5 space-y-2 col-span-2 sm:col-span-1">
                                <Skeleton className="h-3.5 w-16" />
                                <Skeleton className="h-5 w-16" />
                            </div>
                        </div>

                        {/* About Description Paragraphs */}
                        <div className="space-y-3">
                            <Skeleton className="h-6 w-40" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-11/12" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                        </div>

                        {/* Key Highlights Card */}
                        <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-3">
                            <Skeleton className="h-5 w-32" />
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-4 w-36" />
                                <Skeleton className="h-4 w-44" />
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar Action Card Skeleton (1 Column) */}
                    <div className="space-y-6">
                        <Card className="border-border bg-card shadow-md">
                            <CardHeader className="pb-4 space-y-3">
                                <Skeleton className="h-3.5 w-24" />
                                <Skeleton className="h-9 w-36" />
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <Separator className="bg-border" />

                                {/* Landlord Card Skeleton */}
                                <div className="space-y-3">
                                    <Skeleton className="h-3 w-20" />
                                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-3">
                                        <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                                        <div className="space-y-1.5 flex-1">
                                            <Skeleton className="h-4 w-28" />
                                            <Skeleton className="h-3 w-36" />
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-2.5 pt-2">
                                    <Skeleton className="h-11 w-full rounded-md" />
                                    <Skeleton className="h-11 w-full rounded-md" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    )
}
