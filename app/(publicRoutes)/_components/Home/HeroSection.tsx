"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight, ChevronLeft, ChevronRight, MapPin, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Featured properties/images for the Hero Slider
const heroSlides = [
    {
        id: 1,
        title: "Luxury Modern Apartments",
        location: "Uttara, Dhaka",
        rent: "৳28,000/mo",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
        tag: "Featured Studio",
    },
    {
        id: 2,
        title: "Spacious Lakeside Duplex",
        location: "Gulshan, Dhaka",
        rent: "৳65,000/mo",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        tag: "Verified Landlord",
    },
    {
        id: 3,
        title: "Cozy Family Residence",
        location: "Mirpur, Dhaka",
        rent: "৳18,500/mo",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
        tag: "Ready for Move-in",
    },
]

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = React.useState(0)

    // Auto-slide effect every 5 seconds
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

    const activeSlide = heroSlides[currentSlide]

    return (
        <section className="relative overflow-hidden bg-background py-6">
            {/* Background Radial Glow */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_45%_at_50%_50%,rgba(132,204,22,0.08),transparent)]" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">

                    {/* Left Side Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="lg:col-span-6 space-y-6 text-center lg:text-left"
                    >
                        <Badge variant="secondary" className="px-3.5 py-1.5 rounded-full text-xs font-medium border border-border inline-flex items-center gap-1.5">
                            <span>✨</span>
                            <span>Simplifying Property Rentals & Management</span>
                        </Badge>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl text-foreground leading-[1.15]">
                            Find Your Perfect Place <br />
                            <span className="text-primary">Without the Hassle</span>
                        </h1>

                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Discover vetted apartments, connected landlords, and verified listings. Whether renting or listing, experience modern real estate done right.
                        </p>

                        {/* CTA Buttons */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                            <Link
                                href="/properties"
                                className={cn(
                                    buttonVariants({ size: "lg" }),
                                    "w-full sm:w-auto font-medium h-11 px-6 shadow-md gap-2 rounded-lg"
                                )}
                            >
                                <Search className="h-4 w-4" />
                                Explore All Listings
                            </Link>
                            <Link
                                href="/dashboard/landlord"
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "lg" }),
                                    "w-full sm:w-auto font-medium h-11 px-6 gap-2 rounded-lg"
                                )}
                            >
                                List Property <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        {/* Mini Trust Stats */}
                        <div className="pt-6 border-t border-border/60 flex items-center justify-center lg:justify-start gap-8 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-primary" />
                                <span><strong>2,500+</strong> Active Units</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span><strong>25+</strong> Key Locations</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side Animated Slider */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-6 relative"
                    >
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border shadow-2xl bg-card">

                            {/* Slider Image with Framer Motion Animation */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSlide.id}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={activeSlide.image}
                                        alt={activeSlide.title}
                                        fill
                                        unoptimized
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        priority
                                        className="object-cover"
                                    />
                                    {/* Subtle Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                                </motion.div>
                            </AnimatePresence>

                            {/* Floating Slide Details Card */}
                            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-xl bg-card/85 backdrop-blur-md border border-border/80 shadow-lg space-y-1">
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-[10px] uppercase font-semibold text-primary border-primary/30">
                                        {activeSlide.tag}
                                    </Badge>
                                    <span className="text-sm font-bold text-foreground">{activeSlide.rent}</span>
                                </div>
                                <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                                    {activeSlide.title}
                                </h3>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3 text-primary shrink-0" />
                                    {activeSlide.location}
                                </p>
                            </div>

                            {/* Controls */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/60 hover:bg-background/90 backdrop-blur-sm text-foreground flex items-center justify-center border border-border transition-all"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/60 hover:bg-background/90 backdrop-blur-sm text-foreground flex items-center justify-center border border-border transition-all"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>

                            {/* Slide Indicators / Dots */}
                            <div className="absolute top-4 right-4 flex gap-1.5 z-10">
                                {heroSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={cn(
                                            "h-1.5 rounded-full transition-all",
                                            currentSlide === index ? "w-6 bg-primary" : "w-1.5 bg-background/60"
                                        )}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
