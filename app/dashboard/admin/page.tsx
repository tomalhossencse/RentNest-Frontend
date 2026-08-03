import { AdminGlobalState, IUsersResponse } from "@/lib/types";
import { getAllUsers } from "../_actions/userActions";
import AdminStats from "../_components/admin/AdminStats";
import UserManagementTable from "../_components/admin/UserMangementTable";
import { getAdminStats } from "../_actions/statsActions";


export default async function AdminDashboardPage() {

    const result = await getAllUsers() as IUsersResponse;

    const gloalStateResult = await getAdminStats()

    const globalState: AdminGlobalState = {
        totalRevenue: gloalStateResult?.data?.totalRevenue || 0,
        totalUsers: gloalStateResult?.data?.totalUsers || 0,
        totalTenants: gloalStateResult?.data?.totalTenants || 0,
        totalLandlords: gloalStateResult?.data?.totalLandlords || 0,
        blockedUsers: gloalStateResult?.data?.blockedUsers || 0,
        totalProperties: gloalStateResult?.data?.totalProperties || 0,
        pendingProperties: gloalStateResult?.data?.pendingProperties || 0,
        activeProperties: gloalStateResult?.data?.activeProperties || 0,
        totalApplications: gloalStateResult?.data?.totalApplications || 0,
        pendingApplications: gloalStateResult?.data?.pendingApplications || 0,
        totalRentals: gloalStateResult?.data?.totalRentals || 0,
        successfulPaymentsCount: gloalStateResult?.data?.successfulPaymentsCount || 0,
    };

    const users = result?.success ? result.data : [];

    return (
        <div className="space-y-4">
            {/* Header Banner */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Admin Overview</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Global system health metrics, property controls, and user access management.
                </p>
            </div>

            {/* 1. Global Multi-State KPI Grid */}
            <AdminStats state={globalState} />

            {/* 2. User Management (Active / Block Controls) */}
            <UserManagementTable users={users} />
        </div>
    );
}
