import { getMe } from "@/services/getMe"
import { unstable_noStore } from "next/cache"
import { DashboardShell } from "./_components/DashboardShell"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    unstable_noStore()
    const user = await getMe()
    return <DashboardShell user={user}>{children}</DashboardShell>
}
