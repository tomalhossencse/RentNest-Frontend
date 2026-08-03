import { INavItem } from "@/lib/types";
import { CreditCard, Home } from "lucide-react";

export const tenantNavs: INavItem[] = [
    { label: "Dashboard", href: "/dashboard/tenant", icon: Home },
    { label: "Tenant Requests", href: "/dashboard/tenant/requests", icon: CreditCard },
]
