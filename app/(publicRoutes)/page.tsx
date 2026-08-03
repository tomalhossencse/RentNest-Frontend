import { getProperties } from "./_actions/propertyActions"
import { CtaSection } from "./_components/Home/CtaSection"
import { FeaturesSection } from "./_components/Home/FeaturesSection"
import { HeroSection } from "./_components/Home/HeroSection"
import { LatestPropertiesSection } from "./_components/Home/LatestPropertiesSection"
import { StatsSection } from "./_components/Home/StatsSection"

async function getLatestProperties() {
    // Replace with your server action / database query e.g., await db.property.findMany(...)
    return [
        {
            id: "1",
            title: "Modern Modern 3-Bed Apartment in Uttara",
            district: "Dhaka",
            division: "Dhaka",
            monthlyRent: 28000,
            floor: 4,
            availableFrom: "2026-09-01",
            status: "AVAILABLE",
            category: { name: "Apartment" },
            landlord: { name: "Md. Tomal Hossen" },
            image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?fm=jpg&q=60&w=3000&auto=format&fit=crop",
        },
        {
            id: "2",
            title: "Spacious Duplex with Lake View",
            district: "Gulshan",
            division: "Dhaka",
            monthlyRent: 65000,
            floor: 7,
            availableFrom: "2026-08-15",
            status: "AVAILABLE",
            category: { name: "Duplex" },
            landlord: { name: "Rahim Chowdhury" },
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=jpg&q=60&w=3000&auto=format&fit=crop",
        },
        {
            id: "3",
            title: "Cozy Studio Flat for Students & Job Holders",
            district: "Mirpur",
            division: "Dhaka",
            monthlyRent: 15000,
            floor: 2,
            availableFrom: "2026-08-10",
            status: "RENTED",
            category: { name: "Studio" },
            landlord: { name: "Anisur Rahman" },
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?fm=jpg&q=60&w=3000&auto=format&fit=crop",
        },
    ]
}

export default async function HomePage() {
    const result = await getProperties({})
    const latestProperties = result?.success ? result.data : []

    return (
        <div className="flex flex-col min-h-screen">
            <HeroSection />
            <LatestPropertiesSection properties={latestProperties} />
            <StatsSection />
            <FeaturesSection />
            <CtaSection />
        </div>
    )
}
