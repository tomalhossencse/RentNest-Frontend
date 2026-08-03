import { IUsersResponse } from "@/lib/types";
import UserManagementTable from "../../_components/admin/UserMangementTable";
import { getAllUsers } from "../../_actions/userActions";

export default async function ManageUsersPage() {
    const result = await getAllUsers() as IUsersResponse;
    const users = result?.success ? result.data : [];

    return (
        <div className="space-y-4">
            {/* 2. User Management (Active / Block Controls) */}
            <UserManagementTable users={users} />
        </div>
    );
}
