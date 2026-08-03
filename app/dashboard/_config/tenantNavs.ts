import { INavItem } from "@/lib/types";
import { CreditCard, Home, Settings } from "lucide-react";

export const tenantNavs: INavItem[] = [
    { label: "Dashboard", href: "/dashboard/tenant", icon: Home },
    { label: "Tenant Requests", href: "/dashboard/tenant/requests", icon: CreditCard },
    { label: "Profile", href: "/dashboard/tenant/profile", icon: Settings },
]
