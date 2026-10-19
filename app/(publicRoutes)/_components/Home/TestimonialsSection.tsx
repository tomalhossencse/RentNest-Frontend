import { Star, Quote, ArrowRight, MapPin, Building2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

const testimonials = [
    {
        name: "Ayesha Rahman",
        role: "Tenant, Dhaka",
        rating: 5,
        text: "Found my dream apartment in just 3 days. The landlord communication was smooth and the listing was exactly as described. Highly recommended!",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?fm=jpg&q=60&w=400&auto=format&fit=crop",
    },
    {
        name: "Md. Karim Hossain",
        role: "Landlord, Uttara",
        rating: 5,
        text: "Managing 8 properties has never been easier. The dashboard gives me full control over listings, requests, and payments. My occupancy rate went up by 40%.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=400&auto=format&fit=crop",
    },
    {
        name: "Fatema Noor",
        role: "Tenant, Gulshan",
        rating: 5,
        text: "The verification process gave me confidence as a tenant. No fake listings, no hidden fees. The whole rental journey was transparent and hassle-free.",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?fm=jpg&q=60&w=400&auto=format&fit=crop",
    },
    {
        name: "Rafiq Ahmed",
        role: "Landlord, Mirpur",
        rating: 4,
        text: "Excellent platform for landlords. The tenant screening saves time, and the payment system ensures I get paid on time every month. Already listed 3 new properties.",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fm=jpg&q=60&w=400&auto=format&fit=crop",
    },
    {
        name: "Nadia Sultana",
        role: "Tenant, Dhanmondi",
        rating: 5,
        text: "The search filters are incredibly accurate. I found a studio flat that matched my budget and requirements on the first try. Customer support was very responsive.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=400&auto=format&fit=crop",
    },
    {
        name: "Tanvir Hasan",
        role: "Landlord, Baridhara",
        rating: 5,
        text: "RentNest transformed how I handle rentals. From listing to tenant management to rent collection, everything is streamlined. My ROI has improved significantly.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fm=jpg&q=60&w=400&auto=format&fit=crop",
    },
];

export function TestimonialsSection() {
    return (
        <section className="py-16 sm:py-20 bg-card/30 border-y border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                        <Star className="h-3.5 w-3.5" />
                        Loved by Users
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        What Our Community Says
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Join thousands of satisfied tenants and landlords who trust RentNest.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.name}
                            className="flex flex-col rounded-xl border border-border bg-card shadow-xs p-6 space-y-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <Quote className="h-8 w-8 text-primary/20" />

                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-border"}`}
                                    />
                                ))}
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                &ldquo;{testimonial.text}&rdquo;
                            </p>

                            <div className="flex items-center gap-3 pt-3 border-t border-border">
                                <div className="h-10 w-10 rounded-full overflow-hidden border border-border">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        width={40}
                                        height={40}
                                        unoptimized
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/support"
                        className={cn(
                            buttonVariants({ variant: "outline", size: "lg" }),
                            "font-medium rounded-lg gap-2"
                        )}
                    >
                        Read More Stories <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}