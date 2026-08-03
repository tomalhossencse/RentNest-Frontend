"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API request delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.success("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Get in Touch with <span className="text-primary">RentNest</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Have questions about listing a property or finding your next home?
                        Our team is here to support tenants and landlords across Bangladesh.
                    </p>
                </div>

                {/* Grid Layout: Contact Info + Contact Form */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Contact Cards */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Head Office</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Level 5, Gulshan Tower, Gulshan-2, <br />
                                        Dhaka-1212, Bangladesh
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
                                        +880 1900-000000
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Email Us</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        support@rentnest.com <br />
                                        info@rentnest.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Business Hours</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Saturday - Thursday: 9:00 AM - 8:00 PM <br />
                                        Friday: Closed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="p-8 rounded-xl border bg-card text-card-foreground shadow-sm lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                        <p className="text-sm text-muted-foreground mb-6">
                            Fill out the form below and we will respond within 24 hours.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Full Name <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Md. Tomal"
                                        className="w-full h-11 px-3.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border-input"
                                    />
                                </div>

                                {/* Email Address */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email Address <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="name@example.com"
                                        className="w-full h-11 px-3.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border-input"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">
                                    Subject <span className="text-destructive">*</span>
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="e.g. Inquiry about landlord verification"
                                    className="w-full h-11 px-3.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border-input"
                                />
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">
                                    Message <span className="text-destructive">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your detailed message here..."
                                    className="w-full p-3.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border-input resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto h-11 px-8 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <span>Sending...</span>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom FAQ Section */}
                <div className="pt-8 border-t">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Quick answers to common questions about RentNest.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="p-5 rounded-lg border bg-card">
                            <h4 className="font-semibold flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                How do I list my property as a landlord?
                            </h4>
                            <p className="text-sm text-muted-foreground mt-2 pl-6">
                                Register an account, navigate to your Landlord Dashboard, and click on "Add Property". Fill in the property details and upload high-quality photos.
                            </p>
                        </div>

                        <div className="p-5 rounded-lg border bg-card">
                            <h4 className="font-semibold flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                Is there any booking fee for tenants?
                            </h4>
                            <p className="text-sm text-muted-foreground mt-2 pl-6">
                                Submitting rental requests on RentNest is completely free. Payments are only processed once a landlord approves your rental application.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
