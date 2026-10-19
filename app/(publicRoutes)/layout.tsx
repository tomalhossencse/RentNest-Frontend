import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { getMe } from "@/services/getMe";
import { unstable_noStore } from "next/cache";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {

    unstable_noStore()
    const user = await getMe()
    return (
        <div>
            <Navbar user={user} />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </div>
    )
}
