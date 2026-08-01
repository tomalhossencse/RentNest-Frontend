"use client"

import { useState } from "react"
import { Search, Inbox } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RentalRequestCard, RentalRequest } from "../landlord/RentalRequestCard"

const STATIC_REQUESTS: RentalRequest[] = [
    {
        id: "4b4a8549-b350-4d3f-9f14-df297fc88ea5",
        propertyId: "a156096e-3cea-4940-a641-1b4f28cca7ef",
        tenantId: "d764b6b7-1e24-4005-a08a-afacfff3ba5c",
        moveInDate: "2026-08-01T00:00:00.000Z",
        status: "PAID",
        message: "I'm interested in renting this apartment for my family.",
        createdAt: "2026-07-07T08:51:15.441Z",
        updatedAt: "2026-07-09T05:21:45.991Z",
        tenant: {
            name: "Tanvir Ahmed",
            email: "tanvir.tan@gmail.com",
        },
    },
    {
        id: "7c128549-a250-4d3f-9f14-eb297fc88ee1",
        propertyId: "b256096e-3cea-4940-a641-1b4f28cca7ef",
        tenantId: "e864b6b7-1e24-4005-a08a-afacfff3ba5d",
        moveInDate: "2026-08-15T00:00:00.000Z",
        status: "PENDING",
        message: "Looking for a quiet apartment near Sylhet city center.",
        createdAt: "2026-07-10T11:20:00.000Z",
        updatedAt: "2026-07-10T11:20:00.000Z",
        tenant: {
            name: "Rahim Chowdhury",
            email: "rahim.chowdhury@gmail.com",
        },
    },
    {
        id: "9d338549-c450-4d3f-9f14-fc297fc88ff2",
        propertyId: "c356096e-3cea-4940-a641-1b4f28cca7ef",
        tenantId: "f964b6b7-1e24-4005-a08a-afacfff3ba5e",
        moveInDate: "2026-09-01T00:00:00.000Z",
        status: "APPROVED",
        message: "Requesting move-in for September 1st.",
        createdAt: "2026-07-12T09:15:30.000Z",
        updatedAt: "2026-07-13T14:10:00.000Z",
        tenant: {
            name: "Nusrat Jahan",
            email: "nusrat.jahan@gmail.com",
        },
    },
]

export function RequestHistory() {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("ALL")

    const filteredRequests = STATIC_REQUESTS.filter((req) => {
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
