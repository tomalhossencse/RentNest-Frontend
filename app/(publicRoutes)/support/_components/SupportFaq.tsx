"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

export function SupportFaq() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
                <div key={faq.question} className="p-5 rounded-lg border bg-card">
                    <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full font-semibold flex items-center justify-between gap-2 text-left"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                                {index + 1}
                            </span>
                            {faq.question}
                        </span>
                        <ChevronDown
                            className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                        />
                    </button>
                    {openFaq === index && (
                        <p className="text-sm text-muted-foreground mt-2 pl-6">
                            {faq.answer}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
