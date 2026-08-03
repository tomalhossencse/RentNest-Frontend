import { INavItem } from "@/lib/types";
import { Building2, FileText, Home, Settings } from "lucide-react";

export const landlordNavs: INavItem[] = [
    { label: "Dashboard", href: "/dashboard/landlord", icon: Home },
    { label: "My Properties", href: "/dashboard/landlord/properties", icon: Building2 },
    { label: "Landlord Requests", href: "/dashboard/landlord/requests", icon: FileText },
    { label: "Profile", href: "/dashboard/landlord/profile", icon: Settings },
]
