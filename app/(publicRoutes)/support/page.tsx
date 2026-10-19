import Link from "next/link";
import {
    LifeBuoy,
    Mail,
    Phone,
    MessageSquare,
    ArrowRight,
} from "lucide-react";
import { SupportTopics } from "./_components/SupportTopics";
import { SupportFaq } from "./_components/SupportFaq";

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 mx-auto px-4 py-1.5 rounded-full border bg-card text-sm font-semibold text-muted-foreground">
                        <LifeBuoy className="w-4 h-4 text-primary" />
                        Help Center
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        How can we <span className="text-primary">Support</span> you?
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Browse guides, browse common questions, or reach out to our team.
                        We are here to help tenants and landlords across Bangladesh.
                    </p>
                </div>

                {/* Support Topics Grid (interactive) */}
                <SupportTopics />

                {/* Contact Support Cards */}
                <div className="pt-8 border-t">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <h2 className="text-2xl font-bold">Contact Our Support Team</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Prefer talking to a person? Reach us through any of these channels.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Email Support</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        support@rentnest.com <br />
                                        Response within 24 hours
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Phone & WhatsApp</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        +880 1700-000000 <br />
                                        Saturday - Thursday, 9 AM - 8 PM
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Live Message</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Send us a message anytime <br />
                                        We reply as soon as possible
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section (interactive) */}
                <div className="pt-8 border-t">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Quick answers to the most common questions about RentNest.
                        </p>
                    </div>

                    <SupportFaq />
                </div>

                {/* Still Need Help CTA */}
                <div className="pt-8 border-t">
                    <div className="p-8 rounded-xl border bg-card text-card-foreground shadow-sm text-center max-w-4xl mx-auto space-y-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto">
                            <LifeBuoy className="h-5 w-5" />
                        </div>
                        <h2 className="text-2xl font-bold">Still need help?</h2>
                        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                            Can&apos;t find what you are looking for? Our support team is ready
                            to assist you with any question about your rental journey.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 h-11 px-8 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                            >
                                <span>Contact Us</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
