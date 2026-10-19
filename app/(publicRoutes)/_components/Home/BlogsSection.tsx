import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, User, Tag, Clock, BookOpen } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const blogs = [
    {
        title: "How to Set the Perfect Rent Price for Your Property",
        excerpt: "A step-by-step guide to pricing your rental property competitively in 2026.",
        author: "Sarah Khan",
        date: "Oct 12, 2026",
        readTime: "5 min read",
        tag: "Landlord Tips",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?fm=jpg&q=60&w=1200&auto=format&fit=crop",
        href: "/support/blog/setting-rent-price",
    },
    {
        title: "Tenant Screening: What Landlords Must Know",
        excerpt: "Best practices for verifying tenant credentials and reducing rental risk.",
        author: "Md. Rafiq Islam",
        date: "Oct 8, 2026",
        readTime: "7 min read",
        tag: "Guides",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?fm=jpg&q=60&w=1200&auto=format&fit=crop",
        href: "/support/blog/tenant-screening",
    },
    {
        title: "Legal Rights of Tenants in Bangladesh: A Quick Overview",
        excerpt: "Understanding the Rent Control Act and what every tenant should know.",
        author: "Ayesha Rahman",
        date: "Oct 2, 2026",
        readTime: "6 min read",
        tag: "Legal",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=jpg&q=60&w=1200&auto=format&fit=crop",
        href: "/support/blog/tenant-rights-bangladesh",
    },
]

export function BlogsSection() {
    return (
        <section className="py-16 sm:py-20 bg-card/30 border-y border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary font-medium text-xs uppercase tracking-wider">
                            <BookOpen className="h-4 w-4" />
                            <span>From Our Blog</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            Latest Articles & Guides
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Practical advice for tenants, landlords, and property owners.
                        </p>
                    </div>
                    <Link
                        href="/support"
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "sm" }),
                            "gap-1.5 text-primary hover:text-primary/90 font-medium self-start sm:self-auto"
                        )}
                    >
                        View All Articles <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <Link
                            key={blog.title}
                            href={blog.href}
                            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <div className="relative h-44 w-full overflow-hidden">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    unoptimized
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-background/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-primary border border-border/60">
                                        <Tag className="h-3 w-3" />
                                        {blog.tag}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col p-5 space-y-3">
                                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {blog.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {blog.readTime}
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                    {blog.excerpt}
                                </p>

                                <div className="mt-auto flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                                    <User className="h-3 w-3" />
                                    <span>{blog.author}</span>
                                    <span className="ml-auto flex items-center gap-1 text-primary font-medium group-hover:gap-1.5 transition-all">
                                        Read more <ArrowRight className="h-3 w-3" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}