
import Image from "next/image";
import Link from "next/link";

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { buttonVariants } from "@/components/ui/button";
import { PropertyCardProps } from "@/lib/types";
import { Building2, CalendarDays, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?fm=jpg&q=60&w=3000&auto=format&fit=crop";

const PropertyCard = ({ property }: PropertyCardProps) => {


    const formattedDate = new Date(property.availableFrom).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const formattedRent = Number(property.monthlyRent || 0).toLocaleString();

    return (
        <Card className="group overflow-hidden rounded-xl border bg-card shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pt-0">

            <CardHeader className="relative h-44 w-full p-0">
                <Image
                    src={property.image ?? FALLBACK_IMAGE}
                    alt={property.title || "Property Thumbnail"}
                    fill
                    unoptimized
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />


                <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-md text-xs font-medium">
                        {property.category?.name || "Apartment"}
                    </Badge>

                    <Badge
                        className={`text-xs font-semibold text-white ${property.status === "AVAILABLE"
                            ? "bg-emerald-600 hover:bg-emerald-600"
                            : "bg-destructive hover:bg-destructive"
                            }`}
                    >
                        {property.status}
                    </Badge>
                </div>
            </CardHeader>


            <CardContent className="space-y-3 px-4 py-2">

                <div>
                    <h3 className="line-clamp-1 text-base font-semibold tracking-tight" title={property.title}>
                        {property.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-1">{property.district}, {property.division}</span>
                    </p>
                </div>


                <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-primary">৳{formattedRent}</span>
                    <span className="text-xs text-muted-foreground font-medium">/ month</span>
                </div>


                <div className="flex items-center justify-between border-t border-b py-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-primary" />
                        <span>Floor {property.floor}</span>
                    </div>

                    <div className="h-3 w-px bg-border" />

                    <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-primary" />
                        <span>{formattedDate}</span>
                    </div>

                    <div className="h-3 w-px bg-border" />

                    <div className="flex items-center gap-1.5 max-w-27" title={property.landlord?.name}>
                        <User className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="truncate">{property.landlord?.name}</span>
                    </div>
                </div>
            </CardContent>

            {/* Action Footer */}
            <CardFooter className="px-4 py-2 pt-0">
                <Link
                    href={`/properties/${property.id}`}
                    className={cn(
                        buttonVariants({ size: "lg" }),
                        "w-full font-medium justify-center"
                    )}
                >
                    View Details
                </Link>
            </CardFooter>
        </Card>
    )
}

export default PropertyCard
