"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TopbarProps {
    onMobileMenuToggle?: () => void
}

export function DashboardTopbar({ onMobileMenuToggle }: TopbarProps) {
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
                <Button variant="outline" size="icon" className="relative h-9 w-9 md:h-10 md:w-10 border-border text-muted-foreground hover:text-foreground">
                    <Bell className="h-4 w-4 md:h-5 md:w-5" />
                    <Badge className="absolute -right-1 -top-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-[10px] md:text-xs bg-primary text-primary-foreground font-bold">
                        3
                    </Badge>
                </Button>

                <div className="h-5 w-[1px] bg-border my-auto mx-0.5 md:mx-1" />

                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-hidden">
                        <Avatar className="h-9 w-9 md:h-10 md:w-10 border border-border cursor-pointer transition-all hover:ring-2 hover:ring-primary/20">
                            <AvatarImage src="/avatar-placeholder.png" alt="User Avatar" />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs md:text-sm font-bold">
                                TH
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 border-border bg-card p-2">
                        <DropdownMenuLabel className="font-normal p-2">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-bold leading-none text-foreground">Md. Tomal Hossen</p>
                                <p className="text-xs text-muted-foreground mt-0.5">landlord@rentnest.com</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-border my-1" />
                        <DropdownMenuItem className="text-sm cursor-pointer py-2">Profile Settings</DropdownMenuItem>
                        <DropdownMenuItem className="text-sm cursor-pointer py-2">Billing & Payments</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border my-1" />
                        <DropdownMenuItem className="text-sm text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer py-2">
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
