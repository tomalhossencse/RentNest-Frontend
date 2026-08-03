"use client"
import {
    Ban,
    Calendar,
    CalendarDays,
    CheckCircle2,
    Clock,
    CreditCard,
    Mail,
    MapPin,
    User,
    XCircle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { IRentalRequest } from "@/lib/types"
import { formatDateTime, formattedAvailableDate } from "@/utils"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { createPayment } from "../../_actions/paymentActions"
import { toast } from "sonner"

interface RequestCardProps {
    req: IRentalRequest
    onPayment?: () => void
}
export function RequestCard({ req, onPayment }: RequestCardProps) {
    const landlord = req.property?.landlord
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handlePayment = () => {
        startTransition(async () => {
            try {
                const res = (await createPayment(req.id))
                if (res?.success) {
                    toast.success(`Payment created successfully`)
                    if (onPayment) onPayment()
                    router.push(res.data?.gatewayPageURL || "/dashboard")
                } else {
                    toast.error("Failed to create payment")
                }
            } catch (error) {
                toast.error("An unexpected error occurred")
                console.error(error)
            } finally {
            }
        })
    }


    return (
        <Card className="group relative overflow-hidden border-border bg-card shadow-sm hover:shadow-md transition-all duration-200">
            {/* Top Header: ID & Status */}
            <CardHeader className="pb-3 flex flex-row items-center justify-between gap-2 border-b border-border/50 bg-muted/20">
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-[11px] font-semibold bg-background px-2.5 py-0.5">
                        REQ #{req.id.slice(0, 8)}
                    </Badge>
                </div>
                {req.status === "PAID" && (
                    <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30 font-semibold gap-1 px-2.5 py-1">
                        <CreditCard className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> Paid
                    </Badge>
                )}

                {req.status === "APPROVED" && (
                    <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-semibold gap-1 px-2.5 py-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Approved
                    </Badge>
                )}

                {req.status === "PENDING" && (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 font-semibold gap-1 px-2.5 py-1">
                        <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" /> Pending Review
                    </Badge>
                )}

                {req.status === "REJECTED" && (
                    <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30 font-semibold gap-1 px-2.5 py-1">
                        <XCircle className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" /> Rejected
                    </Badge>
                )}

                {req.status === "CANCELLED" && (
                    <Badge variant="outline" className="bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30 font-semibold gap-1 px-2.5 py-1">
                        <Ban className="h-3.5 w-3.5 text-red-600 dark:text-red-400" /> Payment Canceled
                    </Badge>
                )}
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
                {/* Property Title & Address */}
                <div>
                    <h3 className="font-bold text-foreground text-base line-clamp-1 group-hover:text-primary transition-colors">
                        {req.property.title}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
                        <span className="truncate">{req.property.address}</span>
                    </p>
                </div>

                {/* Landlord Contact Info Card */}
                {landlord && (
                    <div className="rounded-lg border border-border/60 bg-muted/30 p-2.5 text-xs space-y-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                            Landlord Information
                        </span>
                        <div className="flex flex-wrap items-center justify-between gap-2 text-foreground">
                            {/* Landlord Name */}
                            {landlord.name && (
                                <div className="flex items-center gap-1.5 font-medium">
                                    <User className="h-3.5 w-3.5 text-primary shrink-0" />
                                    <span>{landlord.name}</span>
                                </div>
                            )}

                            {/* Landlord Email */}
                            {landlord.email && (
                                <div className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                                    <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                                    <a href={`mailto:${landlord.email}`} className="underline-offset-2 hover:underline font-mono text-[11px]">
                                        {landlord.email}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Request Details Grid (Rent, Move-in, Submitted Date+Time) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-muted/20 p-3 rounded-lg border border-border/40 text-xs">
                    {/* Rent */}
                    <div>
                        <span className="text-muted-foreground block text-[11px]">Monthly Rent</span>
                        <span className="font-bold text-foreground text-sm">
                            ৳{Number(req.property.monthlyRent).toLocaleString("en-BD")}
                        </span>
                    </div>

                    {/* Move-in Date */}
                    <div>
                        <span className="text-muted-foreground block text-[11px]">Target Move-In</span>
                        <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                            <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
                            {formattedAvailableDate(req.moveInDate)}
                        </span>
                    </div>

                    {/* Submitted Date & Time */}
                    <div className="col-span-2 sm:col-span-1">
                        <span className="text-muted-foreground block text-[11px]">Submitted On</span>
                        <span className="font-medium text-foreground/90 flex items-center gap-1 mt-0.5 text-[11px]">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            {formatDateTime(req.createdAt)}
                        </span>
                    </div>
                </div>
            </CardContent>

            {/* Footer / CTA Action */}
            {req.status === "APPROVED" && (
                <CardFooter className="pt-0 pb-4">
                    <Button onClick={() => handlePayment()}
                        disabled={isPending}
                        className={cn(
                            buttonVariants({ size: "default" }),
                            "w-full font-bold gap-2 shadow-sm hover:shadow transition-all"
                        )}
                    >
                        <CreditCard className="h-4 w-4" /> {isPending ? "Processing..." : "Proceed to Security Payment"}
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
