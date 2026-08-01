import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6 border border-border bg-card p-8 rounded-2xl shadow-lg">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-extrabold text-foreground">Payment Successful!</h1>
                    <p className="text-xs text-muted-foreground">
                        Your rental deposit has been confirmed. The landlord has been notified of your move-in status.
                    </p>
                </div>
                <Link href="/dashboard/tenant/requests" className={cn(buttonVariants({ size: "lg" }), "w-full font-bold")}>
                    Return to My Applications
                </Link>
            </div>
        </div>
    )
}
