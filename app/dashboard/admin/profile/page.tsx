import { getMe } from "@/services/getMe";
import ProfilePage from "../../_components/ProfilePage";

export default async function ProfileRootPage() {
    const user = await getMe()
    return (
        <main className="container py-6">
            <ProfilePage user={user} />
        </main>
    );
}
