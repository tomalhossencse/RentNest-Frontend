"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
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
    );
}
