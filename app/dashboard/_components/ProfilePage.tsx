"use client";

import {
    User,
    Mail,
    ShieldCheck,
    Calendar,
    Clock,
    Edit3,
    CheckCircle2,
    Sparkles
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NavbarProps } from "@/lib/types";


export default function ProfilePage({ user }: { user: NavbarProps }) {

    // Format dates for a clean presentation
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // app/dashboard/_components/ProfilePage.tsx

    // Safe getInitials helper
    const getInitials = (name?: string | null) => {
        if (!name) return "U"; // Default fallback (e.g. "U" for User)

        return name
            .trim()
            .split(/\s+/)
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <div className="space-y-5">
            {/* Header Banner Section */}
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        {/* Avatar with Status Indicator */}
                        <div className="relative">
                            <Avatar className="h-20 w-20 border-2 border-background shadow-md">
                                <AvatarImage src={user?.data?.profilePhoto || undefined} alt={user?.data?.name} />
                                <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
                                    {getInitials(user?.data?.name)}
                                </AvatarFallback>
                            </Avatar>
                            {user?.data?.status === "ACTIVE" && (
                                <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background bg-emerald-500" />
                            )}
                        </div>

                        {/* Core Info */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                    {user?.data?.name}
                                </h1>
                                <Badge variant="secondary" className="gap-1 text-xs font-semibold">
                                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                                    {user?.data?.role}
                                </Badge>
                            </div>
                            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Mail className="h-3.5 w-3.5" />
                                {user?.data?.email}
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Button variant="outline" className="gap-2 self-stretch sm:self-auto">
                        <Edit3 className="h-4 w-4" />
                        Edit Profile
                    </Button>
                </div>
            </div>

            {/* Main Grid Content */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column: Bio & Identity */}
                <div className="space-y-6 md:col-span-2">
                    <Card className="border-border/60 shadow-xs">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                <User className="h-4 w-4 text-muted-foreground" />
                                Biography
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {user?.data?.bio ? (
                                <p className="text-sm leading-relaxed text-foreground/90">{user?.data?.bio}</p>
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/80 p-6 text-center">
                                    <Sparkles className="h-8 w-8 text-muted-foreground/40 mb-2" />
                                    <p className="text-sm font-medium text-muted-foreground">No bio provided yet</p>
                                    <p className="text-xs text-muted-foreground/70">
                                        Add a short bio to let others know more about your role and expertise.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Account Details */}
                    <Card className="border-border/60 shadow-xs">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-semibold">
                                Account Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-1 rounded-lg border border-border/40 bg-accent/20 p-3">
                                    <span className="text-xs font-medium text-muted-foreground">Account Status</span>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        <span className="text-sm font-semibold capitalize text-foreground">
                                            {user?.data?.status.toLowerCase()}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1 rounded-lg border border-border/40 bg-accent/20 p-3">
                                    <span className="text-xs font-medium text-muted-foreground">Assigned Role</span>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-primary" />
                                        <span className="text-sm font-semibold text-foreground">
                                            {user?.data?.role}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-2" />

                            <div className="space-y-2">
                                <span className="text-xs font-medium text-muted-foreground">System Identifier (ID)</span>
                                <p className="font-mono text-xs text-muted-foreground break-all rounded-md bg-muted p-2">
                                    {user?.data?.id}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Metadata & Activity */}
                <div className="space-y-6">
                    <Card className="border-border/60 shadow-xs">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-semibold">
                                Activity Metadata
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                                <div className="space-y-0.5">
                                    <p className="text-xs font-medium text-muted-foreground">Joined On</p>
                                    <p className="font-medium text-foreground">{formatDate(user?.data?.createdAt)}</p>
                                    <p className="text-xs text-muted-foreground">{formatTime(user?.data?.createdAt)}</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex items-start gap-3">
                                <Clock className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                                <div className="space-y-0.5">
                                    <p className="text-xs font-medium text-muted-foreground">Last Modified</p>
                                    <p className="font-medium text-foreground">{formatDate(user?.data?.updatedAt)}</p>
                                    <p className="text-xs text-muted-foreground">{formatTime(user?.data?.updatedAt)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
