"use client"

import * as React from "react"
import Link from "next/link"
import { Mail, Send, CheckCircle2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
    const [email, setEmail] = React.useState("")
    const [submitted, setSubmitted] = React.useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setSubmitted(true)
        }
    }

    return (
        <section className="py-16 sm:py-20 bg-card/30 border-y border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Left: Info Card */}
                    <div className="flex flex-col gap-6">
                        <div className="flex-1 rounded-xl border border-border bg-card p-8 shadow-xs flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                                    Get Rental Insights Delivered
                                </h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Subscribe for weekly property trends, landlord tips, and exclusive listings matched to your interests.
                                </p>
                            </div>
                            <div className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                    <span>Weekly market insights & price trends</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                    <span>New listings before they go public</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                    <span>Landlord guides & rental tips</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Signup Card */}
                    <div className="flex">
                        <div className="w-full rounded-xl border border-border bg-card p-8 shadow-xs flex flex-col justify-center">
                            {!submitted ? (
                                <>
                                    <div className="space-y-2 mb-6">
                                        <h3 className="text-xl font-bold text-foreground">
                                            Join our newsletter
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            One email per week. Unsubscribe anytime.
                                        </p>
                                    </div>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="newsletter-email"
                                                className="text-xs font-medium text-foreground"
                                            >
                                                Email address
                                            </label>
                                            <Input
                                                id="newsletter-email"
                                                type="email"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="h-11 rounded-lg"
                                            />
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <button
                                                type="submit"
                                                className={cn(
                                                    buttonVariants({ size: "lg" }),
                                                    "flex-1 font-medium rounded-lg gap-2"
                                                )}
                                            >
                                                Subscribe <Send className="h-4 w-4" />
                                            </button>
                                            <Link
                                                href="/support"
                                                className={cn(
                                                    buttonVariants({ variant: "outline", size: "lg" }),
                                                    "flex-1 font-medium rounded-lg"
                                                )}
                                            >
                                                Learn More
                                            </Link>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground">
                                            By subscribing, you agree to our Terms of Service and Privacy Policy.
                                        </p>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-6 space-y-4">
                                    <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="h-7 w-7" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-foreground">
                                            Thank you for subscribing!
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            We sent a confirmation to{" "}
                                            <span className="font-medium text-foreground">
                                                {email}
                                            </span>
                                            . Stay tuned for your first digest.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}