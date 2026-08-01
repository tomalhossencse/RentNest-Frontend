import { Navbar } from "@/components/shared/Navbar";
import { getMe } from "@/services/getMe";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    const user = await getMe()
    return (
        <div>
            <Navbar user={user} />
            {children}
            {/* <p>Footer</p> */}
        </div>
    )
}
