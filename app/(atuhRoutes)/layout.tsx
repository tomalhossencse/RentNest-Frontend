import { Navbar } from "@/components/shared/Navbar"
import { getMe } from "@/services/getMe"
import { unstable_noStore } from "next/cache"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    unstable_noStore()
    const user = await getMe()
    return (
        <div className="min-h-screen">
            <Navbar user={user} />
            {children}
        </div>
    )
}
