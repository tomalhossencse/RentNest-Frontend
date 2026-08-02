'use client'
import Link from "next/link"
import { XCircle } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { revalidateTenantRequests } from "@/app/dashboard/_actions/paymentActions"
import { useEffect } from "react"

export default function PaymentCancelPage() {

    const router = useRouter();

    useEffect(() => {
        revalidateTenantRequests().then(() => {
            router.refresh();
        });
    }, [router]);

    const searchParams = useSearchParams();

    const requestId = searchParams.get("requestId");
    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 text-center shadow-lg transition-all">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive dark:bg-destructive/20">
                    <XCircle className="h-12 w-12" />
                </div>

                {/* Status Header */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                        Payment Cancelled!
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        Transaction was not completed. You can re-initiate payment at any time from your tenant request dashboard.
                    </p>
                </div>

                {/* Transaction Details Box */}
                {(requestId) && (
                    <div className="space-y-2.5 rounded-xl border border-border/60 bg-muted/50 p-4 text-left font-mono text-xs">
                        {requestId && (
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <span className="font-sans font-medium text-muted-foreground">Request ID</span>
                                <span className="truncate font-semibold text-foreground" title={requestId}>
                                    {requestId}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                <Link href="/dashboard/tenant/requests" className={cn(buttonVariants({ size: "lg" }), "w-full font-bold")}>
                    Return to My Applications
                </Link>
            </div>
        </div>
    )
}
