import Link from "next/link"
import { Building2, Home, LandPlot, Briefcase, Store, Warehouse, DoorClosed, Dumbbell, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// Keep in sync with PropertySearchBar categories
const categories = [
    {
        name: "Apartment",
        icon: Building2,
        href: "/properties?category=Apartment",
        gradient: "from-primary/20 to-primary/5",
    },
    {
        name: "House",
        icon: Home,
        href: "/properties?category=House",
        gradient: "from-blue-500/20 to-blue-500/5",
    },
    {
        name: "Studio",
        icon: LandPlot,
        href: "/properties?category=Studio",
        gradient: "from-amber-500/20 to-amber-500/5",
    },
    {
        name: "Office",
        icon: Briefcase,
        href: "/properties?category=Office",
        gradient: "from-slate-500/20 to-slate-500/5",
    },
    {
        name: "Shop",
        icon: Store,
        href: "/properties?category=Shop",
        gradient: "from-rose-500/20 to-rose-500/5",
    },
    {
        name: "Warehouse",
        icon: Warehouse,
        href: "/properties?category=Warehouse",
        gradient: "from-emerald-500/20 to-emerald-500/5",
    },
    {
        name: "Room",
        icon: DoorClosed,
        href: "/properties?category=Room",
        gradient: "from-violet-500/20 to-violet-500/5",
    },
    {
        name: "Stadium",
        icon: Dumbbell,
        href: "/properties?category=Stadium",
        gradient: "from-teal-500/20 to-teal-500/5",
    },
]

export function CategoriesSection() {
    return (
        <section className="py-16 sm:py-20 bg-card/30 border-y border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        Browse by Category
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Find the perfect property type that fits your needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => {
                        const Icon = category.icon
                        return (
                            <Link
                                key={category.name}
                                href={category.href}
                                className="group p-6 rounded-xl border border-border bg-card shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4"
                            >
                                <div
                                    className={`h-11 w-11 shrink-0 rounded-lg bg-gradient-to-br ${category.gradient} text-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        Browse listings
                                    </p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                            </Link>
                        )
                    })}
                </div>

                <div className="text-center">
                    <Link
                        href="/properties"
                        className={cn(
                            buttonVariants({ variant: "outline", size: "lg" }),
                            "font-medium rounded-lg gap-2"
                        )}
                    >
                        View All Properties <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}