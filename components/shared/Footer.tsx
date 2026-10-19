"use client";
import {
	GithubLogoIcon,
	InstagramLogoIcon,
	LinkedinLogoIcon,
	TwitterLogoIcon,
} from "@phosphor-icons/react";
import { ArrowRight, House, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const platformLinks = [
	{ label: "Browse Properties", href: "/properties" },
	{ label: "About Us", href: "/about" },
	{ label: "Contact", href: "/contact" },
	{ label: "Support", href: "/support" },
	{ label: "Landlord Dashboard", href: "/dashboard/landlord" },
	{ label: "Tenant Dashboard", href: "/dashboard/tenant" },
	{ label: "Admin Dashboard", href: "/dashboard/admin" },
];

const resourceLinks = [
	{ label: "Blog", href: "/support" },
	{ label: "FAQs", href: "/support" },
	{ label: "Rental Guides", href: "/support" },
	{ label: "Terms of Service", href: "/support" },
	{ label: "Privacy Policy", href: "/support" },
];

const socialLinks = [
	{ label: "GitHub", icon: GithubLogoIcon, href: "https://github.com" },
	{ label: "Twitter", icon: TwitterLogoIcon, href: "https://twitter.com" },
	{ label: "LinkedIn", icon: LinkedinLogoIcon, href: "https://linkedin.com" },
	{
		label: "Instagram",
		icon: InstagramLogoIcon,
		href: "https://instagram.com",
	},
];

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full border-t border-border bg-card/50 text-card-foreground backdrop-blur-md">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
					<div className="space-y-5">
						<Link href="/" className="flex items-center gap-2.5 group shrink-0">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
								<House className="h-5 w-5" />
							</div>
							<span className="text-xl font-bold tracking-tight text-foreground">
								Rent<span className="text-primary">Nest</span>
							</span>
						</Link>
						<p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
							Simplifying real estate management and property discovery with
							modern technology and seamless operational tools.
						</p>
						<div className="flex items-center gap-2 pt-1">
							{socialLinks.map((social) => {
								const Icon = social.icon;
								return (
									<a
										key={social.label}
										href={social.href}
										target="_blank"
										rel="noreferrer"
										aria-label={social.label}
										className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary"
									>
										<Icon className="h-4 w-4" />
									</a>
								);
							})}
						</div>
					</div>

					<div className="space-y-4">
						<h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
							Platform
						</h4>
						<ul className="space-y-2.5">
							{platformLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground transition-colors hover:text-primary flex items-center gap-1.5 group"
									>
										{link.label}
										<ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="space-y-4">
						<h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
							Resources
						</h4>
						<ul className="space-y-2.5">
							{resourceLinks.map((link) => (
								<li key={Math.random()}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground transition-colors hover:text-primary flex items-center gap-1.5 group"
									>
										{link.label}
										<ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="space-y-4">
						<h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
							Contact Us
						</h4>
						<ul className="space-y-3">
							<li className="flex items-start gap-2.5 text-sm text-muted-foreground">
								<MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
								<span>House 12, Road 4, Uttara, Dhaka, Bangladesh</span>
							</li>
							<li className="flex items-center gap-2.5 text-sm text-muted-foreground">
								<Phone className="h-4 w-4 shrink-0 text-primary" />
								<span>+880 1700-000000</span>
							</li>
							<li className="flex items-center gap-2.5 text-sm text-muted-foreground">
								<Mail className="h-4 w-4 shrink-0 text-primary" />
								<span>support@rentnest.com</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
					<p>© {currentYear} RentNest Inc. All rights reserved.</p>
					<div className="flex items-center gap-6">
						<Link
							href="/support"
							className="hover:text-primary transition-colors"
						>
							Privacy
						</Link>
						<Link
							href="/support"
							className="hover:text-primary transition-colors"
						>
							Terms
						</Link>
						<Link
							href="/support"
							className="hover:text-primary transition-colors"
						>
							Security
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
