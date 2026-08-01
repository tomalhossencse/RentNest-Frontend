"use client"

import { useState } from "react"
import { Search, Inbox } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RentalRequestCard } from "./RentalRequestCard"
import { IApiRentalRequests } from "@/lib/types"


export function RequestHistory({ result }: { result: IApiRentalRequests }) {
    const success = result?.success ?? false
    const requests = result?.data ?? []
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("ALL")

    const filteredRequests = requests.filter((req) => {
        const matchesTab =
            activeTab === "ALL" ? true : req.status.toUpperCase() === activeTab

        const matchesSearch =
            req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.tenant?.name?.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesTab && matchesSearch
    })

    return (
        <div className="space-y-6">
            {/* Controls Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search request ID or message..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-10 pl-10 text-sm bg-card border-border"
                    />
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                    <TabsList className="grid w-full grid-cols-4 bg-muted h-11 p-1">
                        <TabsTrigger value="ALL" className="text-sm font-semibold">All</TabsTrigger>
                        <TabsTrigger value="PAID" className="text-sm font-semibold">Paid</TabsTrigger>
                        <TabsTrigger value="PENDING" className="text-sm font-semibold">Pending</TabsTrigger>
                        <TabsTrigger value="APPROVED" className="text-sm font-semibold">Approved</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Grid List */}
            {filteredRequests.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredRequests.map((request) => (
                        <RentalRequestCard key={request.id} request={request} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center bg-card">
                    <Inbox className="h-12 w-12 text-muted-foreground/50 mb-3" />
                    <h3 className="text-lg font-bold text-foreground">No rental requests found</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                        There are no requests matching your selected status filter or search parameters.
                    </p>
                </div>
            )}
        </div>
    )
}
