"use client"

import { useState } from "react"
import { DashboardSidebar } from "./_components/DashboardSidebar"
import { DashboardTopbar } from "./_components/DashboardTopbar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <DashboardSidebar
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />

            <div className="flex flex-1 flex-col md:pl-72 min-w-0">
                <DashboardTopbar onMobileMenuToggle={() => setMobileOpen((prev) => !prev)} />
                <main className="flex-1 p-4 md:p-8 lg:p-10">{children}</main>
            </div>
        </div>
    )
}
