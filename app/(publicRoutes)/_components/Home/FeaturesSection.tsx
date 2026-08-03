import { ShieldCheck, Zap, HeartHandshake, Search } from "lucide-react"

export function FeaturesSection() {
    const features = [
        {
            icon: ShieldCheck,
            title: "Verified Listings",
            description: "Every property goes through standard checks to ensure location and rental accuracy.",
        },
        {
            icon: HeartHandshake,
            title: "Direct Communication",
            description: "Connect directly with property owners without hidden middleman charges.",
        },
        {
            icon: Zap,
            title: "Instant Status Updates",
            description: "Real-time updates when units are booked, rented, or become available.",
        },
        {
            icon: Search,
            title: "Smart Filtering",
            description: "Filter listings by division, district, floor level, and price budget with ease.",
        },
    ]

    return (
        <section className="py-16 sm:py-20 bg-card/30 border-y border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        Why Choose Our Platform
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Designed to make renting simple, transparent, and efficient for tenants and landlords alike.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={feature.title}
                                className="p-6 rounded-xl border border-border bg-card space-y-3 shadow-xs hover:shadow-md transition-shadow"
                            >
                                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold text-base text-foreground">{feature.title}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
