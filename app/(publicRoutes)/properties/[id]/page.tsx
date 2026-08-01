import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
    Building2,
    CalendarDays,
    MapPin,
    User,
    Mail,
    CheckCircle2,
    ArrowLeft,
    Share2,
    ShieldCheck,
    Home
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { getPropertyById } from "../../_actions/propertyActions"

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"


export default async function PropertyDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const property = await getPropertyById(id)

    if (!property) {
        notFound()
    }

    const formattedRent = new Intl.NumberFormat("en-BD").format(
        Number(property.monthlyRent) || 0
    )

    const availableDate = new Date(property.availableFrom).toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    )

    return (
        <div className="min-h-screen bg-background text-foreground pb-12 pt-6 transition-colors duration-200">
            <div className="container mx-auto max-w-6xl px-4">

                {/* Navigation / Actions */}
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                        <Link className={cn(
                            buttonVariants({ variant: "ghost", size: "sm" }),
                            "gap-2 text-muted-foreground hover:text-foreground"
                        )} href="/properties">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Properties
                        </Link>
                    </Button>

                    <Button variant="outline" size="sm" className="gap-2 border-border bg-card">
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                </div>

                {/* Main Image Banner */}
                <div className="relative mb-8 h-80 w-full overflow-hidden rounded-xl border border-border bg-muted md:h-112">
                    <Image
                        src={property.image ?? FALLBACK_IMAGE}
                        alt={property.title || "Property Visual"}
                        fill
                        priority
                        unoptimized
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />

                    <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant="secondary" className="bg-background/90 backdrop-blur-md text-foreground font-medium shadow-xs">
                            {property.category?.name || "Property"}
                        </Badge>
                        <Badge
                            className={`font-semibold text-white ${property.status === "AVAILABLE"
                                ? "bg-emerald-600 hover:bg-emerald-600"
                                : "bg-destructive hover:bg-destructive"
                                }`}
                        >
                            {property.status}
                        </Badge>
                    </div>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* Main Info */}
                    <div className="space-y-6 lg:col-span-2">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
                                {property.title}
                            </h1>
                            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary shrink-0" />
                                <span>{property.address}, {property.district}, {property.division}</span>
                            </p>
                        </div>

                        <Separator className="bg-border" />

                        {/* Key Features Grid */}
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <div className="rounded-lg border border-border bg-card p-3.5 shadow-xs">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Building2 className="h-4 w-4 text-primary" />
                                    <span>Floor Level</span>
                                </div>
                                <p className="mt-1 text-sm font-semibold text-card-foreground">
                                    {property.floor === 0 ? "Ground Floor" : `${property.floor}th Floor`}
                                </p>
                            </div>

                            <div className="rounded-lg border border-border bg-card p-3.5 shadow-xs">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <CalendarDays className="h-4 w-4 text-primary" />
                                    <span>Available From</span>
                                </div>
                                <p className="mt-1 text-sm font-semibold text-card-foreground">{availableDate}</p>
                            </div>

                            <div className="rounded-lg border border-border bg-card p-3.5 shadow-xs col-span-2 sm:col-span-1">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Home className="h-4 w-4 text-primary" />
                                    <span>Category</span>
                                </div>
                                <p className="mt-1 text-sm font-semibold text-card-foreground">{property.category?.name}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold tracking-tight text-foreground">About this property</h2>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {property.description || "No description provided by the landlord."}
                            </p>
                        </div>

                        {/* Highlights Box */}
                        <div className="rounded-xl border border-border bg-muted/50 p-5 space-y-3">
                            <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                                Key Highlights
                            </h3>
                            <ul className="grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                                    Direct landlord listing
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                                    Verified location in {property.district}
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                                    Instant booking request eligible
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar Action Card */}
                    <div className="space-y-6">
                        <Card className="sticky top-20 border-border bg-card shadow-md">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Rental Details
                                </CardTitle>
                                <div className="mt-2 flex items-baseline gap-1.5">
                                    <span className="text-3xl font-extrabold text-primary">৳{formattedRent}</span>
                                    <span className="text-sm text-muted-foreground font-medium">/ month</span>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <Separator className="bg-border" />

                                {/* Landlord Contact Info */}
                                <div className="space-y-3">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Landlord Info
                                    </p>
                                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-foreground">{property.landlord?.name}</p>
                                            <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                                                <Mail className="h-3 w-3 shrink-0" />
                                                <span className="truncate">{property.landlord?.email}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-2.5 pt-2">
                                    <Button className="w-full font-semibold" size="lg" disabled={property.status !== "AVAILABLE"}>
                                        {property.status === "AVAILABLE" ? "Request to Rent" : "Currently Rented"}
                                    </Button>

                                    <Button variant="outline" className="w-full border-border bg-card hover:bg-muted" size="lg" >
                                        <a className={cn(
                                            buttonVariants({ variant: "ghost", size: "sm" }),
                                            "gap-2 text-muted-foreground hover:text-foreground"
                                        )} href={`https://mail.google.com/mail/u/0/?to=${property.landlord?.email}.com&fs=1&tf=cm`}

                                            target="_blank"
                                        >
                                            Contact Landlord
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    )
}
