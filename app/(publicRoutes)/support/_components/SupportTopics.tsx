"use client";

import { useState } from "react";
import { Search, Home, Wallet, ShieldCheck, UserCog, MessageSquare } from "lucide-react";

const supportTopics = [
    {
        icon: Search,
        title: "Finding a Property",
        description:
            "Learn how to search, filter, and save properties that match your budget and location preferences.",
    },
    {
        icon: Home,
        title: "Listing a Property",
        description:
            "Step-by-step guide to publishing your property with photos, pricing, and availability details.",
    },
    {
        icon: Wallet,
        title: "Payments & Billing",
        description:
            "Information about rent payments, security deposits, invoices, and refund policies.",
    },
    {
        icon: ShieldCheck,
        title: "Safety & Trust",
        description:
            "How we verify users, protect your data, and keep every rental transaction secure.",
    },
    {
        icon: UserCog,
        title: "Account & Settings",
        description:
            "Manage your profile, update passwords, change notification preferences, or delete your account.",
    },
    {
        icon: MessageSquare,
        title: "Requests & Bookings",
        description:
            "Track rental requests, chat with landlords, and understand the approval workflow.",
    },
];

export function SupportTopics() {
    const [activeTopic, setActiveTopic] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportTopics.map((topic) => {
                const Icon = topic.icon;
                const isActive = activeTopic === topic.title;
                return (
                    <button
                        key={topic.title}
                        type="button"
                        onClick={() => setActiveTopic(isActive ? null : topic.title)}
                        className={`p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-3 text-left transition-shadow hover:shadow-md ${isActive ? "border-primary/40" : ""}`}
                    >
                        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-base text-foreground">
                            {topic.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {topic.description}
                        </p>
                    </button>
                );
            })}
        </div>
    );
}
