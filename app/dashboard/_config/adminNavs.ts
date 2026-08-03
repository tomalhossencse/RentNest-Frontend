import { INavItem } from "@/lib/types";
import { Settings, ShieldCheck, Users } from "lucide-react";

export const adminNavs: INavItem[] = [
    { label: "Admin Panel", href: "/dashboard/admin", icon: ShieldCheck },
    { label: "Manage Users", href: "/dashboard/admin/manage-users", icon: Users },
    { label: "Profile", href: "/dashboard/admin/profile", icon: Settings },
]
