import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import PropertyCard from "../Property/PropertyCard"
import { IProperty } from "@/lib/types"


interface LatestPropertiesSectionProps {
    properties: IProperty[]
}

export function LatestPropertiesSection({ properties }: LatestPropertiesSectionProps) {
    return (
        <section className="py-16 sm:py-20 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">

                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary font-medium text-xs uppercase tracking-wider">
                            <Sparkles className="h-4 w-4" />
                            <span>Fresh Listings</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            Latest Available Properties
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Explore recently added homes and apartments ready for move-in.
                        </p>
                    </div>

                    <Link
                        href="/properties"
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "sm" }),
                            "gap-1.5 text-primary hover:text-primary/90 font-medium self-start sm:self-auto"
                        )}
                    >
                        View All Properties <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Properties Grid */}
                {properties && properties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.slice(0, 6).map((property) => (
                            <PropertyCard key={property.id} property={property as any} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 rounded-xl border border-dashed border-border text-muted-foreground text-sm">
                        No properties found at the moment. Check back soon!
                    </div>
                )}
            </div>
        </section>
    )
}
