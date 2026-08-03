import { INavItem } from "@/lib/types";
import { ShieldCheck, Users } from "lucide-react";

export const adminNavs: INavItem[] = [
    { label: "Admin Panel", href: "/dashboard/admin", icon: ShieldCheck },
    { label: "Manage Users", href: "/dashboard/admin/manage-users", icon: Users },
]
