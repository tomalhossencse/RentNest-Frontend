import { getMe } from "@/services/getMe";
import ProfilePage from "../../_components/ProfilePage";
import { unstable_noStore } from "next/cache";

export default async function ProfileRootPage() {
    unstable_noStore()
    const user = await getMe()
    return (
        <main className="container py-6">
            <ProfilePage user={user} />
        </main>
    );
}
