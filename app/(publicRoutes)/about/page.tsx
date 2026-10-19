import Link from "next/link";
import {
    Building2,
    Target,
    Eye,
    ArrowRight,
    ShieldCheck,
    HeartHandshake,
    Zap,
    Search,
    Users,
    MapPin,
} from "lucide-react";

const stats = [
    { label: "Active Listings", value: "2,500+" },
    { label: "Verified Landlords", value: "1,200+" },
    { label: "Satisfied Tenants", value: "10,000+" },
    { label: "Cities Covered", value: "25+" },
];

const values = [
    {
        icon: ShieldCheck,
        title: "Trust & Safety",
        description:
            "Every listing and landlord goes through verification checks so tenants can rent with confidence.",
    },
    {
        icon: HeartHandshake,
        title: "Transparency",
        description:
            "No hidden middleman charges. Tenants and landlords connect and agree on fair terms directly.",
    },
    {
        icon: Zap,
        title: "Simplicity",
        description:
            "From searching to signing, we keep every step of the rental journey short and effortless.",
    },
    {
        icon: Search,
        title: "Accuracy",
        description:
            "Detailed filters and reviewed property details mean what you see is exactly what you get.",
    },
    {
        icon: Users,
        title: "People First",
        description:
            "We design every feature for real tenants and landlords across Bangladesh, not for intermediaries.",
    },
    {
        icon: MapPin,
        title: "Local Focus",
        description:
            "Deep coverage of divisions, districts, and neighborhoods to match every budget and lifestyle.",
    },
];

const steps = [
    {
        icon: Search,
        title: "Discover",
        description:
            "Browse verified listings with smart filters for location, floor, and budget.",
    },
    {
        icon: Building2,
        title: "Connect",
        description:
            "Send a rental request and chat directly with the property owner.",
    },
    {
        icon: ShieldCheck,
        title: "Approve",
        description:
            "The landlord reviews your request and approves or declines it quickly.",
    },
    {
        icon: HeartHandshake,
        title: "Move In",
        description:
            "Complete payment securely and get status updates until moving day.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 mx-auto px-4 py-1.5 rounded-full border bg-card text-sm font-semibold text-muted-foreground">
                        <Building2 className="w-4 h-4 text-primary" />
                        About RentNest
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Built for the Way <span className="text-primary">Bangladesh</span> Rents
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        RentNest connects verified landlords with tenants across the country,
                        making renting simple, transparent, and free of hidden middleman fees.
                    </p>
                </div>

                {/* Story, Mission & Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-3 lg:col-span-1">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-base text-foreground">Our Story</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            RentNest started with a simple frustration: finding a trustworthy
                            rental in Bangladesh was slow, unclear, and full of middlemen. We
                            built a platform where verified listings and direct communication
                            replace guesswork, so tenants and landlords can meet on fair ground.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <Target className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-base text-foreground">Our Mission</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            To make renting effortless and transparent for everyone — giving
                            tenants a safe way to find their next home and landlords a reliable
                            way to list, manage, and rent out their properties without friction
                            or hidden costs.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <Eye className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-base text-foreground">Our Vision</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            To become Bangladesh&apos;s most trusted rental marketplace, where
                            every city, district, and neighborhood is one search away from a
                            verified, ready-to-move-in home — for every budget and lifestyle.
                        </p>
                    </div>
                </div>

                {/* Stats Band */}
                <div className="border-y border-border bg-card/50 py-10 rounded-xl">
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

                {/* Values Section */}
                <div className="space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            The Values Behind RentNest
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            The principles that shape every listing, request, and interaction on
                            our platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((value) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={value.title}
                                    className="p-6 rounded-xl border border-border bg-card space-y-3 shadow-xs hover:shadow-md transition-shadow"
                                >
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-semibold text-base text-foreground">
                                        {value.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* How It Works */}
                <div className="pt-8 border-t space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            How RentNest Works
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Four simple steps between you and your next home.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.title}
                                    className="p-6 rounded-xl border border-border bg-card space-y-3 shadow-xs hover:shadow-md transition-shadow"
                                >
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-semibold text-base text-foreground">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className="pt-8 border-t">
                    <div className="p-8 rounded-xl border bg-card text-card-foreground shadow-sm text-center max-w-4xl mx-auto space-y-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto">
                            <HeartHandshake className="h-5 w-5" />
                        </div>
                        <h2 className="text-2xl font-bold">Ready to find your next home?</h2>
                        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                            Browse thousands of verified listings, or list your property and
                            start reaching tenants across Bangladesh today.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                href="/properties"
                                className="inline-flex items-center gap-2 h-11 px-8 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                            >
                                <span>Browse Properties</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 h-11 px-8 rounded-lg border bg-card text-foreground font-medium hover:bg-muted transition-colors"
                            >
                                <span>Talk to Us</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
