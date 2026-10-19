import { getProperties } from "./_actions/propertyActions";
import { BlogsSection } from "./_components/Home/BlogsSection";
import { CategoriesSection } from "./_components/Home/CategoriesSection";
import { CtaSection } from "./_components/Home/CtaSection";
import { FaqSection } from "./_components/Home/FaqSection";
import { FeaturesSection } from "./_components/Home/FeaturesSection";
import { HeroSection } from "./_components/Home/HeroSection";
import { LatestPropertiesSection } from "./_components/Home/LatestPropertiesSection";
import { NewsletterSection } from "./_components/Home/NewsletterSection";
import { StatsSection } from "./_components/Home/StatsSection";
import { TestimonialsSection } from "./_components/Home/TestimonialsSection";

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
			<FaqSection />
			<TestimonialsSection />
			<FeaturesSection />
			<CtaSection />
		</div>
	);
}
