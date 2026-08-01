"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CalendarDays, CreditCard, Clock, CheckCircle2 } from "lucide-react"

const TENANT_REQUESTS = [
    {
        id: "req-101",
        propertyTitle: "Premium Lake View Apartment",
        address: "Chashara, Narayanganj",
        monthlyRent: 70000,
        status: "APPROVED", // Rent accepted -> direct user to pay
        moveInDate: "2026-09-12",
        createdAt: "2026-07-15",
    },
    {
        id: "req-102",
        propertyTitle: "Modern Duplex Studio",
        address: "Zindabazar, Sylhet",
        monthlyRent: 35000,
        status: "PENDING",
        moveInDate: "2026-08-01",
        createdAt: "2026-07-20",
    },
]

export default function TenantRequestsPage() {
    return (

        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">My Rental Applications</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Track your rental application statuses and execute payment once approved.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TENANT_REQUESTS.map((req) => (
                    <Card key={req.id} className="border-border bg-card shadow-xs">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <span className="text-xs font-mono font-bold text-muted-foreground">REQ: #{req.id}</span>
                            {req.status === "APPROVED" ? (
                                <Badge className="bg-emerald-600/15 text-emerald-600 border-emerald-600/30 font-bold gap-1">
                                    <CheckCircle2 className="h-3.5 w-3.5" /> Approved - Ready to Pay
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30 font-bold gap-1">
                                    <Clock className="h-3.5 w-3.5" /> Under Landlord Review
                                </Badge>
                            )}
                        </CardHeader>

                        <CardContent className="space-y-3 text-sm">
                            <div>
                                <h3 className="font-bold text-foreground text-base">{req.propertyTitle}</h3>
                                <p className="text-xs text-muted-foreground">{req.address}</p>
                            </div>

                            <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg text-xs">
                                <div>
                                    <span className="text-muted-foreground block">Monthly Rent</span>
                                    <span className="font-bold text-foreground text-sm">৳{req.monthlyRent.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground block">Move-in Date</span>
                                    <span className="font-bold text-foreground flex items-center gap-1">
                                        <CalendarDays className="h-3.5 w-3.5 text-primary" /> {req.moveInDate}
                                    </span>
                                </div>
                            </div>
                        </CardContent>

                        {req.status === "APPROVED" && (
                            <CardFooter className="pt-2">
                                <Link
                                    href={`/payment?requestId=${req.id}&amount=${req.monthlyRent}`}
                                    className={cn(buttonVariants({ size: "default" }), "w-full font-bold gap-2")}
                                >
                                    <CreditCard className="h-4 w-4" /> Proceed to Security Payment
                                </Link>
                            </CardFooter>
                        )}
                    </Card>
                ))}
            </div>
        </div>

    )
}
