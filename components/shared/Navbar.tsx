"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    House,
    LayoutDashboard,
    LogOut,
    Settings,
    User,
    Menu,
    X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/services/logout";
import { NavbarProps } from "@/lib/types";
import { formatName, formatprofileAvatar } from "@/utils";

// Navigation links configuration
const navItems = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Contact", href: "/contact" },
];

// Dropdown menu items configuration
const userMenuItems = [
    { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
    { label: "Profile", icon: User, action: "profile" },
    { label: "Settings", icon: Settings, action: "settings" },
];

export function Navbar({ user }: { user: NavbarProps }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const success = user?.success ?? false;
    const profile = user?.data ?? null;

    const handleUserMenuAction = async (action: string) => {
        if (action === "dashboard") {
            const role = profile?.role;
            if (role === "TENANT") router.push("/dashboard/tenant");
            else if (role === "LANDLORD") router.push("/dashboard/landlord");
            else if (role === "ADMIN") router.push("/dashboard/admin");
            return;
        }

        if (action === "profile") {
            router.push("/dashboard/profile");
            return;
        }

        if (action === "settings") {
            router.push("/settings");
            return;
        }

        if (action === "logout") {
            await logout();
            toast.success("User Logged Out Successfully!");
            router.push("/login");
        }
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Medium Balanced Height: h-16 on mobile, h-18 on desktop */}
                <div className="flex items-center justify-between h-16 md:h-18">

                    {/* 1. Brand Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                            <House className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            Rent<span className="text-primary">Nest</span>
                        </span>
                    </Link>

                    {/* 2. Active Link Navigation Bar */}
                    <div className="hidden md:flex md:items-center md:gap-1.5 bg-muted/50 p-1.5 rounded-full border border-border/60">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${isActive
                                        ? "bg-background text-foreground shadow-xs border border-border/60"
                                        : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* 3. User Avatar / Login Action */}
                    <div className="flex items-center gap-3">
                        {success && profile ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="focus:outline-none rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-primary/20">
                                    <Avatar className="h-9 w-9 md:h-10 md:w-10 border border-border/80 cursor-pointer shadow-xs">
                                        <AvatarImage
                                            src={profile.profilePhoto || "/avatar-placeholder.png"}
                                            alt={profile.name || "User Avatar"}
                                        />
                                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                                            {formatprofileAvatar(profile.name || "U")}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-64 border-border bg-card p-2 shadow-lg rounded-xl">
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel className="font-normal p-2">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-bold text-foreground">
                                                    {formatName(profile.name || "")}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {profile.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator className="bg-border my-1" />

                                    <DropdownMenuGroup>
                                        {userMenuItems.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <DropdownMenuItem
                                                    key={item.action}
                                                    className="text-sm font-medium cursor-pointer py-2 rounded-lg focus:bg-accent focus:text-accent-foreground"
                                                    onClick={() => handleUserMenuAction(item.action)}
                                                >
                                                    <Icon className="w-4 h-4 mr-2.5 text-muted-foreground" />
                                                    <span>{item.label}</span>
                                                </DropdownMenuItem>
                                            );
                                        })}
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator className="bg-border my-1" />

                                    <DropdownMenuItem
                                        className="text-sm font-medium text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer py-2 rounded-lg"
                                        onClick={() => handleUserMenuAction("logout")}
                                    >
                                        <LogOut className="w-4 h-4 mr-2.5" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/login">
                                <Button className="h-9 md:h-10 px-5 text-sm font-semibold rounded-full shadow-xs">
                                    Login
                                </Button>
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden h-9 w-9 text-muted-foreground hover:text-foreground"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* 4. Responsive Mobile Drawer */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-border/60 py-3 space-y-1 bg-card/95 px-2 rounded-b-xl animate-in slide-in-from-top-2 duration-150">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </nav>
    );
}
