"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    UserCheck,
    UserX,
    Search,
    Shield,
    Loader2,
    Mail,
} from "lucide-react";
import { toast } from "sonner";
import { IUser } from "@/lib/types";
import { toggleUserStatus } from "../../_actions/userActions";
import { formatDateTime } from "@/utils";

interface UserManagementTableProps {
    users: IUser[];
}

export default function UserManagementTable({ users: initialUsers }: UserManagementTableProps) {
    const [users, setUsers] = useState<IUser[]>(initialUsers || []);
    const [searchQuery, setSearchQuery] = useState("");
    const [loadingId, setLoadingId] = useState<string | null>(null);

    // Filter users by search input
    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Toggle user active/blocked state
    const handleToggleBlock = async (userId: string, currentStatus: string) => {
        try {
            console.log("handleToggleBlock called for userId:", userId, "currentStatus:", currentStatus);
            setLoadingId(userId);
            const res = await toggleUserStatus(userId, currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE");

            if (res?.success) {
                setUsers((prev) =>
                    prev.map((u) => (u.id === userId ? { ...u, status: currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE" } : u))
                );
                toast.success(
                    currentStatus === "ACTIVE" ? "User has been blocked successfully." : "User status set to active."
                );
            } else {
                toast.error("Failed to update user status.");
            }
        } catch (error) {
            toast.error("An error occurred while updating status.");
        } finally {
            setLoadingId(null);
        }
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "ADMIN":
                return (
                    <Badge className="bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30 font-semibold gap-1 text-[10px] px-2">
                        <Shield className="h-3 w-3" /> ADMIN
                    </Badge>
                );
            case "LANDLORD":
                return (
                    <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30 font-semibold text-[10px] px-2">
                        LANDLORD
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="text-muted-foreground text-[10px] px-2 font-semibold">
                        TENANT
                    </Badge>
                );
        }
    };

    return (
        <Card className="border-border bg-card shadow-xs">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                <div>
                    <CardTitle className="text-lg font-bold">User Management</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Monitor accounts, review roles, and manage access restrictions.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search by name, email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 h-9 text-xs"
                    />
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-muted/50 text-muted-foreground uppercase font-bold border-b">
                            <tr>
                                <th className="p-3.5">User</th>
                                <th className="p-3.5">Role</th>
                                <th className="p-3.5">Status</th>
                                <th className="p-3.5">Joined Date</th>
                                <th className="p-3.5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border font-medium">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                        No matching users found.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => {
                                    const isLoading = loadingId === user.id;

                                    return (
                                        <tr key={user.id} className="hover:bg-muted/30">
                                            {/* User Info */}
                                            <td className="p-3.5">
                                                <div className="font-bold text-foreground">{user.name}</div>
                                                <div className="flex items-center gap-2 text-muted-foreground text-[11px] mt-0.5">
                                                    <span className="flex items-center gap-1">
                                                        <Mail className="h-3 w-3" /> {user.email}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Role Badge */}
                                            <td className="p-3.5">{getRoleBadge(user.role)}</td>

                                            {/* Status */}
                                            <td className="p-3.5">
                                                {user.status === "BLOCKED" ? (
                                                    <Badge variant="outline" className="bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 text-[10px] px-2 py-0.5 font-semibold">
                                                        BLOCKED
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 text-[10px] px-2 py-0.5 font-semibold">
                                                        ACTIVE
                                                    </Badge>
                                                )}
                                            </td>

                                            {/* Joined Date */}
                                            <td className="p-3.5 text-muted-foreground">
                                                {formatDateTime(user.createdAt)}
                                            </td>

                                            {/* Block / Active Action */}
                                            <td className="p-3.5 text-right">
                                                {user.role === "ADMIN" ? (
                                                    <span className="text-[11px] text-muted-foreground italic">Protected</span>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        variant={user.status === "ACTIVE" ? "outline" : "default"}
                                                        disabled={isLoading}
                                                        onClick={() => handleToggleBlock(user.id, user.status)}
                                                        className={`h-8 text-xs font-semibold gap-1.5 ${user.status === "BLOCKED"
                                                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                                            : "text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/30"
                                                            }`}
                                                    >
                                                        {isLoading ? (
                                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                        ) : user.status === "BLOCKED" ? (
                                                            <>
                                                                <UserCheck className="h-3.5 w-3.5" /> Activate
                                                            </>
                                                        ) : (
                                                            <>
                                                                <UserX className="h-3.5 w-3.5" /> Block
                                                            </>
                                                        )}
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
