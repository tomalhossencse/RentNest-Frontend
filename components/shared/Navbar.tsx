"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { House, LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Image from "next/image";
import { logout } from "@/services/logout";
import { NavbarProps } from "@/lib/types";

// Navigation items configuration
const navItems = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Contact", href: "/contact" },
];

// User menu items configuration
const userMenuItems = [
    { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
    { label: "Profile", icon: User, action: "profile" },
    { label: "Settings", icon: Settings, action: "settings" },
];



export function Navbar({ user }: { user: NavbarProps }) {
    const router = useRouter()
    const handleUserMenuAction = async (action: string) => {

        if (action === "dashboard") {
            if (user.data.role === "TENANT") {
                router.push("/dashboard/tenant")
            }
            else if (user.data.role === "LANDLORD") {
                router.push("/dashboard/landlord")
            }
            else if (user.data.role === "ADMIN") {
                router.push("/dashboard/admin")
            }
            return;
        }

        if (action === "logout") {
            await logout();
            toast.success("User Logged Out Successfully!");
            router.push("/login");
        }
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <span className="text-2xl font-bold text-primary flex items-center gap-2">
                            <House size={20} /> RentNest
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-foreground hover:text-primary transition-colors text-sm font-medium"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* User Dropdown */}
                    {
                        user.success ? (
                            <DropdownMenu >
                                <DropdownMenuTrigger >
                                    <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                                        {user.data?.profilePhoto ? (
                                            <Image
                                                src={user.data.profilePhoto}
                                                alt={user.data.name ?? "User Avatar"}
                                                width={32}
                                                height={32}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <User className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">

                                    <DropdownMenuGroup>

                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm font-medium">
                                                    {user.data?.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {user.data?.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {userMenuItems.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <DropdownMenuItem
                                                    key={item.action}
                                                    onClick={() => handleUserMenuAction(item.action)}
                                                >
                                                    <Icon className="w-4 h-4 mr-2" />
                                                    <span>{item.label}</span>
                                                </DropdownMenuItem>
                                            );
                                        })}

                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() =>
                                            handleUserMenuAction("logout")
                                        }>
                                            <LogOut className="w-4 h-4 mr-2" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>

                                    </DropdownMenuGroup>


                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : <Link href={"/login"} >
                            <Button className="cursor-pointer">
                                Login
                            </Button>
                        </Link>
                    }
                </div>
            </div>
        </nav >
    );
}
