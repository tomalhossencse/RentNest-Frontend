import Link from "next/link"
import { Building2, GitBranch, Globe, House, Mail, Phone } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full border-t border-border bg-card/50 text-card-foreground backdrop-blur-md mt-12">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    {/* Brand Info */}
                    <div className="md:col-span-2 space-y-4">
                        {/* 1. Brand Logo */}
                        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                                <House className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-foreground">
                                Rent<span className="text-primary">Nest</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                            Simplifying real estate management and property discovery with modern technology and seamless operational tools.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <Link
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                <GitBranch className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link
                                href="#"
                                className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                <Globe className="h-4 w-4" />
                                <span className="sr-only">Website</span>
                            </Link>
                            <Link
                                href="mailto:support@yourapp.com"
                                className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                <span className="sr-only">Email</span>
                            </Link>
                        </div>
                    </div>

                    {/* Column 1: Platform */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                            Platform
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/properties" className="hover:text-primary transition-colors">
                                    Browse Properties
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/landlord" className="hover:text-primary transition-colors">
                                    Landlord Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="hover:text-primary transition-colors">
                                    Pricing Plans
                                </Link>
                            </li>
                            <li>
                                <Link href="/featured" className="hover:text-primary transition-colors">
                                    Featured Units
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Resources */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                            Resources
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/documentation" className="hover:text-primary transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/guides" className="hover:text-primary transition-colors">
                                    Rental Guides
                                </Link>
                            </li>
                            <li>
                                <Link href="/support" className="hover:text-primary transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/api" className="hover:text-primary transition-colors">
                                    API Docs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Legal & Contact */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                            Legal & Support
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/terms" className="hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="hover:text-primary transition-colors">
                                    Cookie Settings
                                </Link>
                            </li>
                            <li className="pt-2 text-xs flex items-center gap-1.5 text-muted-foreground">
                                <Phone className="h-3.5 w-3.5 shrink-0" />
                                <span>+880 1700-000000</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>© {currentYear} YourApp Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:underline">Privacy</Link>
                        <Link href="/terms" className="hover:underline">Terms</Link>
                        <Link href="/security" className="hover:underline">Security</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
