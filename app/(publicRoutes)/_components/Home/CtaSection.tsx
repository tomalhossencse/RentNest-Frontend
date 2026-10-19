import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Building2, ShieldCheck, Clock, TrendingUp, ArrowRight } from "lucide-react"

const benefits = [
    { icon: Building2, text: "List in under 5 minutes" },
    { icon: ShieldCheck, text: "Verified tenants only" },
    { icon: Clock, text: "Get paid on time" },
    { icon: TrendingUp, text: "Maximize rental income" },
]

export function CtaSection() {
    return (
        <section className="py-16 sm:py-20 bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                    <div
                        className="absolute top-0 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
                        aria-hidden
                    />
                    <div
                        className="absolute bottom-0 left-0 h-64 w-64 translate-y-1/2 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
                        aria-hidden
                    />

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center p-8 sm:p-12 lg:p-16">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                                <TrendingUp className="h-3.5 w-3.5" />
                                For Landlords
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                                Turn Your Empty Property Into{" "}
                                <span className="text-primary">Passive Income</span>
                            </h2>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
                                List your apartment in minutes, manage listings from your dashboard, and connect with pre-screened, reliable tenants — all on one platform.
                            </p>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                {benefits.map((benefit) => {
                                    const Icon = benefit.icon
                                    return (
                                        <div
                                            key={benefit.text}
                                            className="flex items-center gap-2.5 text-sm text-foreground"
                                        >
                                            <div className="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <span className="font-medium">{benefit.text}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-xl border border-border bg-gradient-to-b from-card to-muted/40 p-1 shadow-lg">
                                <div className="rounded-lg bg-card p-8 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                            <Building2 className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground leading-tight">
                                                Landlord Dashboard
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                Everything in one place
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { label: "Listings", value: "12" },
                                            { label: "Tenants", value: "8" },
                                            { label: "Revenue", value: "৳1.2L" },
                                        ].map((stat) => (
                                            <div
                                                key={stat.label}
                                                className="rounded-lg border border-border bg-muted/40 p-3 text-center"
                                            >
                                                <p className="text-lg font-bold text-primary">{stat.value}</p>
                                                <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                                                    {stat.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Property Status</span>
                                            <span className="font-semibold text-foreground">Active</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                                            <div className="h-full w-3/4 rounded-full bg-primary" />
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-1">
                                        <Link
                                            href="/dashboard/landlord"
                                            className={cn(
                                                buttonVariants({ size: "lg" }),
                                                "w-full font-semibold rounded-lg gap-2 justify-center"
                                            )}
                                        >
                                            Go to Landlord Dashboard
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                        <Link
                                            href="/register"
                                            className={cn(
                                                buttonVariants({ variant: "outline", size: "lg" }),
                                                "w-full font-medium rounded-lg justify-center"
                                            )}
                                        >
                                            Create Free Account
                                        </Link>
                                    </div>

                                    <p className="text-center text-xs text-muted-foreground">
                                        No credit card required. Set up in minutes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}