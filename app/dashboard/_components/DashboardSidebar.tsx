"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { INavItem, NavbarProps, userApiResponse } from "@/lib/types"
import { sidebarNavs } from "../_config/sidebarNavs"



interface SidebarProps {
    mobileOpen?: boolean
    onMobileClose?: () => void
    user: NavbarProps
}

export function DashboardSidebar({ mobileOpen, onMobileClose, user }: SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()

    let navItems: INavItem[] = []

    if (user.data?.role === "ADMIN") {
        navItems = sidebarNavs.ADMIN
    } else if (user.data?.role === 'LANDLORD') {
        navItems = sidebarNavs.LANDLORD
    } else if (user.data?.role === 'TENANT') {
        navItems = sidebarNavs.TENANT
    } else {
        return
    }

    return (
        <>
            {/* Mobile Overlay BackDrop */}
            {mobileOpen && (
                <div
                    onClick={onMobileClose}
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-xs md:hidden"
                />
            )}

            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 h-screen w-72 border-r border-border bg-card flex flex-col justify-between p-5 transition-transform duration-300 md:z-30 md:translate-x-0",
                    mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between px-2 pt-2">
                        <div onClick={() => router.push("/")} className="flex cursor-pointer items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-lg shadow-xs">
                                RN
                            </div>
                            <span className="text-xl font-bold tracking-tight text-foreground">RentNest</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onMobileClose}
                            className="md:hidden h-8 w-8 text-muted-foreground"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Nav Items */}
                    <nav className="space-y-1.5">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onMobileClose}
                                    className={cn(
                                        "flex items-center gap-3.5 rounded-lg px-3.5 py-3 text-sm font-semibold transition-all",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-xs"
                                            : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                                    )}
                                >
                                    <Icon className="h-5 w-5 shrink-0" />
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* User Footer */}
                <div className="border-t border-border pt-4">
                    <div className="flex items-center gap-3.5 rounded-lg bg-muted/40 p-3 border border-border/50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                            TH
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-foreground">Md. Tomal Hossen</p>
                            <p className="truncate text-xs text-muted-foreground">landlord@rentnest.com</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
