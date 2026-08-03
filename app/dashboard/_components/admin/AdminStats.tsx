"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminGlobalState } from "@/lib/types";
import {
    Users,
    Building2,
    DollarSign,
    FileCheck2,
    ArrowUpRight,
    UserCheck,
    ShieldAlert,
    Clock,
    UserX,
    Home,
} from "lucide-react";


interface AdminStatsProps {
    state: AdminGlobalState;
}

export default function AdminStats({ state }: AdminStatsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1. Total Transacted Revenue */}
            <Card className="border-border bg-card shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-extrabold">
                        ৳{state?.totalRevenue?.toLocaleString("en-BD")}
                    </div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1.5">
                        <ArrowUpRight className="h-3.5 w-3.5" /> {state?.successfulPaymentsCount || 0} Successful payouts
                    </p>
                </CardContent>
            </Card>

            {/* 2. User Distribution */}
            <Card className="border-border bg-card shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        User Base
                    </CardTitle>
                    <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-extrabold">{state?.totalUsers}</div>
                    <p className="text-xs text-muted-foreground font-medium mt-1.5">
                        <span className="font-bold text-foreground">{state?.totalTenants}</span> Tenants ·{" "}
                        <span className="font-bold text-foreground">{state?.totalLandlords}</span> Landlords
                    </p>
                </CardContent>
            </Card>

            {/* 3. Account Safety / Blocked */}
            <Card className="border-border bg-card shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Blocked Accounts
                    </CardTitle>
                    <UserX className="h-4 w-4 text-rose-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-extrabold">{state?.blockedUsers}</div>
                    <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-1.5">
                        Restricted access users
                    </p>
                </CardContent>
            </Card>

            {/* 4. Total & Active Listings */}
            <Card className="border-border bg-card shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Active Properties
                    </CardTitle>
                    <Building2 className="h-4 w-4 text-indigo-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-extrabold">{state?.activeProperties}</div>
                    <p className="text-xs text-muted-foreground font-medium mt-1.5">
                        Out of <span className="font-bold text-foreground">{state?.totalProperties}</span> total listings
                    </p>
                </CardContent>
            </Card>

            {/* 5. Moderation Queue */}
            <Card className="border-border bg-card shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Property Approvals
                    </CardTitle>
                    <Clock className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-extrabold">{state?.pendingProperties}</div>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1.5">
                        Awaiting verification
                    </p>
                </CardContent>
            </Card>

            {/* 6. System Applications */}
            <Card className="border-border bg-card shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Applications
                    </CardTitle>
                    <FileCheck2 className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-extrabold">{state?.totalApplications}</div>
                    <p className="text-xs text-muted-foreground font-medium mt-1.5">
                        <span className="font-bold text-foreground">{state?.pendingApplications}</span> currently pending
                    </p>
                </CardContent>
            </Card>

            {/* 7. Total Rentals */}
            <Card className="border-border bg-card shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Total Rentals
                    </CardTitle>
                    <Home className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-extrabold">
                        {state?.totalRentals}
                    </div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5 flex items-center gap-1">
                        <ArrowUpRight className="h-3.5 w-3.5" /> Active tenancies & leases
                    </p>
                </CardContent>
            </Card>

            {/* 8. Verified Landlords */}
            <Card className="border-border bg-card shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Landlord Health
                    </CardTitle>
                    <UserCheck className="h-4 w-4 text-teal-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-extrabold">{state?.totalLandlords}</div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5">
                        100% Identity verified
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
