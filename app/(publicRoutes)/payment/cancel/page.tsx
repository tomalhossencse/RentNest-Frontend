import Link from "next/link"
import { XCircle } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function PaymentCancelPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6 border border-border bg-card p-8 rounded-2xl shadow-lg">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <XCircle className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-extrabold text-foreground">Payment Cancelled</h1>
                    <p className="text-xs text-muted-foreground">
                        Transaction was not completed. You can re-initiate payment at any time from your tenant request dashboard.
                    </p>
                </div>
                <Link href="/dashboard/tenant-requests" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full font-bold")}>
                    Back to Dashboard
                </Link>
            </div>
        </div>
    )
}
