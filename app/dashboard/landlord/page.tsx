import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, FileText, DollarSign, ArrowUpRight } from "lucide-react"
import { RequestHistory } from "../_components/landlord/RequestHistory"
import { IApiRentalRequests, ILandlordStatsResponse } from "@/lib/types"
import { getLandlordRequests } from "../_actions/requestActions"
import { getLandlordStats } from "../_actions/statsActions"

export default async function LandLordDashboardPage() {
    const result = await getLandlordRequests() as IApiRentalRequests

    const stateResult = await getLandlordStats() as ILandlordStatsResponse;

    return (
        <div className="max-w-7xl mx-auto space-y-10">

            {/* Page Title */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Landlord Overview</h1>
                <p className="text-sm text-muted-foreground mt-1.5">
                    Monitor real-time rental applications, active tenancies, and monthly performance metrics.
                </p>
            </div>

            {/* KPI Stats Overview */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border-border bg-card shadow-xs">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Total Properties
                        </CardTitle>
                        <Building2 className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold">{stateResult?.data?.totalProperties || "0"}</div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-2">
                            <ArrowUpRight className="h-4 w-4" /> 2 added this month
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border bg-card shadow-xs">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Active Tenants
                        </CardTitle>
                        <Users className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold">{stateResult?.data?.totalActiveTenants || "0"}</div>
                        <p className="text-xs text-muted-foreground font-medium mt-2">
                            Occupancy Rate: <span className="font-bold text-foreground">85%</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border bg-card shadow-xs">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Rental Requests
                        </CardTitle>
                        <FileText className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold">{stateResult?.data?.totalRequests || "0"}</div>
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-2">
                            1 pending review
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border bg-card shadow-xs">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Monthly Revenue
                        </CardTitle>
                        <DollarSign className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold">৳{stateResult?.data?.monthlyRevenue?.toLocaleString("en-BD") || "0"}</div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-2">
                            <ArrowUpRight className="h-4 w-4" /> +12% vs last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Requests Management System */}
            <div className="space-y-5">
                <div>
                    <h2 className="text-xl font-bold tracking-tight">Recent Rental Requests</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Filter and process incoming tenant move-in applications.
                    </p>
                </div>

                <RequestHistory result={result} />
            </div>

        </div>
    )
}
