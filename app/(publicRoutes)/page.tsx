import { getProperties } from "./_actions/propertyActions";
import { BlogsSection } from "./_components/Home/BlogsSection";
import { CategoriesSection } from "./_components/Home/CategoriesSection";
import { CtaSection } from "./_components/Home/CtaSection";
import { FeaturesSection } from "./_components/Home/FeaturesSection";
import { HeroSection } from "./_components/Home/HeroSection";
import { LatestPropertiesSection } from "./_components/Home/LatestPropertiesSection";
import { NewsletterSection } from "./_components/Home/NewsletterSection";
import { StatsSection } from "./_components/Home/StatsSection";

export default async function HomePage() {
	const result = await getProperties({});
	const latestProperties = result?.success ? result.data : [];

	return (
		<div className="flex flex-col min-h-screen">
			<HeroSection />
			<LatestPropertiesSection properties={latestProperties} />
			<StatsSection />
			<CategoriesSection />
			<NewsletterSection />
			<BlogsSection />
			<FeaturesSection />
			<CtaSection />
		</div>
	);
}
