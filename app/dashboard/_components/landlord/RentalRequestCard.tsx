"use client"

import { CalendarDays, Mail, User, Clock, CreditCard, CheckCircle2, XCircle, Loader2, Ban } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { IApiRentalRequest, IRentalRequest } from "@/lib/types"
import { formattedAvailableDate } from "@/utils"
import { useState, useTransition } from "react"
import { updateRequestStatus } from "../../_actions/requestActions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface RentalRequestCardProps {
    request: IRentalRequest
    onRequestUpdated?: () => void
}

export function RentalRequestCard({ request, onRequestUpdated }: RentalRequestCardProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [activeAction, setActiveAction] = useState<string | null>(null)

    const handleStatus = (status: string) => {
        // 1. Set active action OUTSIDE startTransition immediately
        setActiveAction(status)

        startTransition(async () => {
            try {
                const res = (await updateRequestStatus(status, request.id)) as IApiRentalRequest

                if (res?.success) {
                    toast.success(`Request ${status.toLowerCase()} successfully`)
                    if (onRequestUpdated) onRequestUpdated()
                    router.refresh()
                } else {
                    toast.error(res?.message || "Failed to update status")
                }
            } catch (error) {
                toast.error("An unexpected error occurred")
                console.error(error)
            } finally {
                // 2. Clear active action after transition completes
                setActiveAction(null)
            }
        })
    }

    const getStatusBadge = (status: string) => {
        switch (status?.toUpperCase()) {
            case "PAID":
                return (
                    <Badge className="bg-emerald-600/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-600/30 text-xs px-2.5 py-1 font-bold gap-1.5 shadow-none">
                        <CreditCard className="h-3.5 w-3.5" /> Deposit Paid
                    </Badge>
                );

            case "APPROVED":
                return (
                    <Badge className="bg-blue-600/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-600/30 text-xs px-2.5 py-1 font-bold gap-1.5 shadow-none">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Approved
                    </Badge>
                );

            case "PENDING":
                return (
                    <Badge
                        variant="outline"
                        className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs px-2.5 py-1 font-bold gap-1.5 shadow-none"
                    >
                        <Clock className="h-3.5 w-3.5" /> Action Required
                    </Badge>
                );

            case "REJECTED":
                return (
                    <Badge className="bg-destructive/15 text-destructive border-destructive/30 text-xs px-2.5 py-1 font-bold gap-1.5 shadow-none">
                        <XCircle className="h-3.5 w-3.5" /> Rejected
                    </Badge>
                );

            case "CANCELLED":
                return (
                    <Badge
                        variant="outline"
                        className="bg-muted text-muted-foreground border-border text-xs px-2.5 py-1 font-bold gap-1.5 shadow-none"
                    >
                        <Ban className="h-3.5 w-3.5" /> Cancelled
                    </Badge>
                );

            default:
                return (
                    <Badge variant="outline" className="text-xs px-2.5 py-1 font-bold shadow-none">
                        {status}
                    </Badge>
                );
        }
    };
    return (
        <Card className="border-border bg-card shadow-xs transition-all hover:shadow-md">
            <CardHeader className="pb-3 pt-5 px-6">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                        REQ: #{request.id.slice(0, 8)}
                    </span>
                    {getStatusBadge(request.status)}
                </div>
            </CardHeader>

            <CardContent className="space-y-4 px-6 py-3 text-sm">
                {/* Tenant Information */}
                <div className="flex items-center gap-3.5 rounded-xl border border-border bg-muted/30 p-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                        <User className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-bold text-foreground">
                            {request.tenant?.name || `Tenant (${request.tenantId.slice(0, 8)})`}
                        </p>
                        <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground mt-0.5">
                            <Mail className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{request.tenant?.email || "tenant@example.com"}</span>
                        </p>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/20 p-3">
                    <div className="space-y-1">
                        <span className="text-xs font-medium text-muted-foreground">Desired Move-in</span>
                        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <CalendarDays className="h-4 w-4 text-primary shrink-0" />
                            {formattedAvailableDate(request.moveInDate)}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs font-medium text-muted-foreground">Requested On</span>
                        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <Clock className="h-4 w-4 text-primary shrink-0" />
                            {formattedAvailableDate(request.createdAt)}
                        </p>
                    </div>
                </div>

                {/* Message */}
                {request.message && (
                    <div className="rounded-lg bg-muted/50 p-3.5 text-sm text-foreground/90 italic leading-relaxed">
                        "{request.message}"
                    </div>
                )}
            </CardContent>

            {/* Action Footer for Pending Requests */}
            {request.status.toUpperCase() === "PENDING" && (
                <CardFooter className="flex items-center gap-3 border-t border-border px-6 py-4">
                    <Button
                        onClick={() => handleStatus("REJECTED")}
                        disabled={isPending}
                        size="default"
                        variant="outline"
                        className="flex-1 text-sm font-semibold border-destructive/30 text-destructive hover:bg-destructive/10"
                    >
                        {isPending && activeAction === "REJECTED" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            "Reject"
                        )}
                    </Button>
                    <Button
                        onClick={() => handleStatus("APPROVED")}
                        disabled={isPending}
                        size="default"
                        className="flex-1 text-sm font-semibold"
                    >
                        {isPending && activeAction === "APPROVED" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            "Approve Request"
                        )}
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
