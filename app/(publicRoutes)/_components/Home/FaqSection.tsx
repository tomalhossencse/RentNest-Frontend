"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const faqs = [
    {
        question: "How do I create an account on RentNest?",
        answer:
            "Click the Login button in the navbar, switch to the Register tab, and fill in your name, email, password, and role. You can start browsing properties immediately after registering.",
    },
    {
        question: "Is RentNest free for tenants?",
        answer:
            "Yes. Creating an account, searching properties, and submitting rental requests is completely free for tenants. Payment is only required after a landlord approves your request.",
    },
    {
        question: "How do I reset my password?",
        answer:
            "Go to the Login page and click \"Forgot Password\". Enter your registered email address and we will send you a secure link to set a new password.",
    },
    {
        question: "How do I contact a landlord?",
        answer:
            "Open any property detail page and use the request form to send a message. Once submitted, you can continue the conversation from your Tenant Dashboard under Requests.",
    },
    {
        question: "Can I edit my property after publishing?",
        answer:
            "Yes. Landlords can edit or remove any of their listings anytime from the Landlord Dashboard under the Properties section.",
    },
    {
        question: "What happens if my payment fails?",
        answer:
            "If a payment fails, no money is deducted. You will be redirected to a failure page with the reason, and you can retry the payment from your dashboard.",
    },
];

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section className="py-16 sm:py-20 bg-card/30 border-y border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                        <HelpCircle className="h-3.5 w-3.5" />
                        Frequently Asked Questions
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        Got Questions? We Have Answers
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Find quick answers to common questions about using RentNest.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={faq.question}
                                className={cn(
                                    "rounded-xl border bg-card shadow-xs overflow-hidden transition-all duration-200",
                                    isOpen
                                        ? "border-primary/40 shadow-md"
                                        : "border-border hover:border-border/80"
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggle(index)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between gap-3 p-5 text-left font-semibold text-foreground hover:bg-muted/40 transition-colors"
                                >
                                    <span className="flex items-center gap-2.5">
                                        <span
                                            className={cn(
                                                "h-7 w-7 shrink-0 rounded-md flex items-center justify-center text-xs font-bold transition-colors",
                                                isOpen
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-primary/10 text-primary"
                                            )}
                                        >
                                            {index + 1}
                                        </span>
                                        <span className="text-base leading-snug">
                                            {faq.question}
                                        </span>
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                                            isOpen && "rotate-180"
                                        )}
                                    />
                                </button>
                                <div
                                    className={cn(
                                        "grid transition-all duration-200 ease-in-out",
                                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed pl-14">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={cn(
                                        "h-px bg-border mx-5 transition-opacity duration-200",
                                        isOpen ? "opacity-0" : "opacity-100"
                                    )}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="text-center">
                    <Link
                        href="/support"
                        className={cn(
                            buttonVariants({ variant: "outline", size: "lg" }),
                            "font-medium rounded-lg gap-2"
                        )}
                    >
                        Visit Support Center <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}