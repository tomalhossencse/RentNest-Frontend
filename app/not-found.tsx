import Link from "next/link";
import { Building2, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "404 - Page Not Found | RentNest",
    description: "The requested rental property or page could not be found.",
};

export default function NotFound() {
    return (
        <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-12">
            {/* Background Decorative Glow */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96" />

            <div className="mx-auto flex max-w-lg flex-col items-center text-center">
                {/* Real-Estate Themed Icon Badge */}
                <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 backdrop-blur-sm">
                    <Building2 className="h-12 w-12 text-primary" />
                    <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-border/80 bg-background shadow-sm">
                        <span className="font-mono text-xs font-bold text-muted-foreground">404</span>
                    </div>
                </div>

                {/* Header Text */}
                <h1 className="font-heading text-6xl font-extrabold tracking-tight text-foreground sm:text-7xl">
                    404
                </h1>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Listing or page not found
                </h2>

                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Sorry, the property listing or page you&apos;re looking for doesn&apos;t exist, has been removed, or moved to a new URL.
                </p>

                {/* Navigation Actions */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link href="/">
                        <Button size="lg" className="w-full gap-2 font-semibold shadow-md sm:w-auto">
                            <Home className="h-4 w-4" />
                            <span>Back to Home</span>
                        </Button>
                    </Link>

                    <Link href="/properties">
                        <Button variant="outline" size="lg" className="w-full gap-2 border-border/70 font-semibold sm:w-auto">
                            <Search className="h-4 w-4" />
                            <span>Browse Rentals</span>
                        </Button>
                    </Link>
                </div>

                {/* Helpful Shortcut Tip */}
                <div className="mt-10 border-t border-border/40 pt-6">
                    <p className="text-xs text-muted-foreground">
                        Looking for something specific? Search locations like{" "}
                        <span className="font-medium text-foreground">Dhaka</span>,{" "}
                        <span className="font-medium text-foreground">Chattogram</span>, or{" "}
                        <span className="font-medium text-foreground">Sylhet</span> directly on our homepage.
                    </p>
                </div>
            </div>
        </main>
    );
}
