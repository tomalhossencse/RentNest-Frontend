import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CtaSection() {
    return (
        <section className="py-16 sm:py-20 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-primary px-6 py-12 sm:px-12 sm:py-16 text-center text-primary-foreground space-y-6 shadow-xl">
                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                        Have a Property to Rent Out?
                    </h2>
                    <p className="max-w-xl mx-auto text-primary-foreground/90 text-sm sm:text-base leading-relaxed">
                        List your apartment in minutes, manage listings with our dedicated Landlord Dashboard, and connect with reliable tenants today.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/dashboard/landlord"
                            className={cn(
                                buttonVariants({ variant: "secondary", size: "lg" }),
                                "font-semibold rounded-xl text-primary bg-background hover:bg-background/90"
                            )}
                        >
                            Go to Landlord Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
