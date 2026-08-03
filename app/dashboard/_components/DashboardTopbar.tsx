"use client"

import { Bell, Search, Menu, LogOut, User, LayoutDashboard, Settings, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavbarProps } from "@/lib/types"
import { formatName, formatprofileAvatar } from "@/utils"
import { useRouter } from "next/navigation"
import { logout } from "@/services/logout"
import { toast } from "sonner"
import Link from "next/link"


const userMenuItems = [
    { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
    { label: "Home", icon: Home, action: "home" },
    { label: "Profile", icon: User, action: "profile" },
    { label: "Settings", icon: Settings, action: "settings" },
];


interface TopbarProps {
    onMobileMenuToggle?: () => void,
    user: NavbarProps
}

export function DashboardTopbar({ onMobileMenuToggle, user }: TopbarProps) {
    const success = user?.success ?? false
    const profile = user?.data ?? null

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

        if (action === "home") {
            router.push("/")
        }

        if (action === "logout") {
            await logout();
            toast.success("User Logged Out Successfully!");
            router.push("/login");
        }
    };
    return (
        <header className="sticky top-0 z-20 flex h-16 md:h-20 w-full items-center justify-between border-b border-border bg-card/80 px-4 md:px-8 backdrop-blur-md">
            {/* Mobile Menu & Search */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMobileMenuToggle}
                    className="md:hidden h-10 w-10 text-muted-foreground hover:text-foreground"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <div className="relative w-48 sm:w-72 md:w-96">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search properties, requests..."
                        className="h-9 md:h-10 pl-10 text-xs md:text-sm bg-muted/40 border-border focus-visible:bg-background"
                    />
                </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 md:gap-4">
                {/* Notification Bell */}
                <Button
                    variant="outline"
                    size="icon"
                    className="relative h-9 w-9 md:h-10 md:w-10 border-border text-muted-foreground hover:text-foreground"
                >
                    <Bell className="h-4 w-4 md:h-5 md:w-5" />
                    <Badge className="absolute -right-1 -top-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-[10px] md:text-xs bg-primary text-primary-foreground font-bold">
                        3
                    </Badge>
                </Button>

                {/* Divider */}
                <div className="h-5 w-px bg-border my-auto mx-0.5 md:mx-1" />

                {/* User Dropdown */}
                {
                    success && profile ? <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-primary/20">
                            <Avatar className="h-9 w-9 md:h-10 md:w-10 border border-border cursor-pointer">
                                <AvatarImage src="/avatar-placeholder.png" alt="User Avatar" />
                                <AvatarFallback className="bg-primary/10 text-primary text-xs md:text-sm font-bold">
                                    {formatprofileAvatar(profile.name)}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-64 border-border bg-card p-2">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="font-normal p-2">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-bold leading-none text-foreground">
                                            {formatName(profile.name)}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
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
                                            className="text-sm cursor-pointer py-2"
                                            key={item.action}
                                            onClick={() => handleUserMenuAction(item.action)}
                                        >
                                            <Icon className="w-4 h-4 mr-2" />
                                            <span>{item.label}</span>
                                        </DropdownMenuItem>
                                    );
                                })}
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator className="bg-border my-1" />

                            <DropdownMenuItem className="text-sm text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer py-2" onClick={() =>
                                handleUserMenuAction("logout")
                            }>
                                <LogOut className="w-4 h-4 mr-2" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> : (
                        <Link
                            href={"/login"} >
                            <Button className="cursor-pointer">
                                Login
                            </Button>
                        </Link>
                    )
                }
            </div>
        </header>
    )
}
