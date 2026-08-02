import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ArrowUpRight, Home, Clock, CreditCard, TrendingUp } from "lucide-react"
import { IApiRentalRequests, ITenantStatsResponse } from "@/lib/types"
import { getTenantRequests } from "../_actions/requestActions"
import { getTenantStats } from "../_actions/statsActions"
import RequestHistory from "../_components/tenant/RequestHistory"

export default async function TenantDashboardPage() {
    const result = await getTenantRequests() as IApiRentalRequests
    const stateResult = await getTenantStats() as ITenantStatsResponse;

    const data = stateResult?.data || {};


    // Calculate dynamic metrics if available
    const activeRentals = data?.totalRentals || 0;
    const pendingRequests = data?.totalPendingRequests || 0;
    const totalRequests = data?.totalRequests || 0;
    const totalSpent = data?.totalPayments || 0;

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Tenant Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1.5">
                    Track your rental applications, view active tenancies, and manage payment history.
                </p>
            </div>

            {/* KPI Stats Overview */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card 1: Active Rentals */}
                <Card className="border-border bg-card shadow-xs">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Active Rentals
                        </CardTitle>
                        <Home className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold">{activeRentals}</div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-2">
                            <ArrowUpRight className="h-4 w-4" /> Current active stay
                        </p>
                    </CardContent>
                </Card>

                {/* Card 2: Applications Sent */}
                <Card className="border-border bg-card shadow-xs">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Applications Sent
                        </CardTitle>
                        <FileText className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold">{totalRequests}</div>
                        <p className="text-xs text-muted-foreground font-medium mt-2">
                            Submitted rental requests
                        </p>
                    </CardContent>
                </Card>

                {/* Card 3: Pending Review */}
                <Card className="border-border bg-card shadow-xs">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Pending Review
                        </CardTitle>
                        <Clock className="h-5 w-5 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold">{pendingRequests}</div>
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-2">
                            {pendingRequests > 0
                                ? `${pendingRequests} awaiting landlord response`
                                : "No pending applications"}
                        </p>
                    </CardContent>
                </Card>

                {/* Card 4: Total Payments Made */}
                <Card className="border-border bg-card shadow-xs">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Total Spent
                        </CardTitle>
                        <CreditCard className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold">
                            ৳{totalSpent?.toLocaleString("en-BD") || "0"}
                        </div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-2">
                            <TrendingUp className="h-4 w-4" /> Successful payments
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Requests Management System */}
            <div className="space-y-5">
                <div>
                    <h2 className="text-xl font-bold tracking-tight">My Rental Applications</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Track your application statuses, pay booking deposits, and view request details.
                    </p>
                </div>
                <RequestHistory result={result} />
            </div>

        </div >
    )
}
