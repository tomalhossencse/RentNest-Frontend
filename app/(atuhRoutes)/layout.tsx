import { Navbar } from "@/components/shared/Navbar"
import { getMe } from "@/services/getMe"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const user = await getMe()
    return (
        <div className="min-h-screen">
            <Navbar user={user} />
            {children}
        </div>
    )
}
