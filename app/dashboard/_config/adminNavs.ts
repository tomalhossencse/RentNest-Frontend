import { INavItem } from "@/lib/types";
import { Settings, ShieldCheck } from "lucide-react";

export const adminNavs: INavItem[] = [
    { label: "Admin Panel", href: "/dashboard/admin", icon: ShieldCheck },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
]
