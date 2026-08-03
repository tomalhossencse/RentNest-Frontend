export function StatsSection() {
    const stats = [
        { label: "Active Listings", value: "2,500+" },
        { label: "Verified Landlords", value: "1,200+" },
        { label: "Satisfied Tenants", value: "10,000+" },
        { label: "Cities Covered", value: "25+" },
    ]

    return (
        <section className="border-y border-border bg-card/50 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label} className="space-y-1">
                            <p className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                                {stat.value}
                            </p>
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
