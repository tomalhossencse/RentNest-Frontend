import { getMe } from "@/services/getMe"
import { DashboardShell } from "./_components/DashboardShell"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const user = await getMe()
    return <DashboardShell user={user}>{children}</DashboardShell>
}
