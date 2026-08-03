"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Building2 } from "lucide-react"
import { PropertyModal, PropertyFormData } from "./PropertyModal" // Adjust path as needed
import { useRouter } from "next/navigation"

export function DashboardPropertyHeader({
    children,
}: {
    children?: React.ReactNode // Pass PropertySearchBar as children if desired
}) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleCreateProperty = async (data: PropertyFormData) => {
        try {
            // Call your server action here
            // e.g., await createPropertyAction(data)
            router.refresh()
        } catch (error) {
            console.error("Failed to create property:", error)
        }
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/50 border border-border/60 p-4 sm:p-5 rounded-2xl shadow-xs">
                {/* Search Bar Wrapper */}
                <div className="flex-1 w-full">{children}</div>

                {/* Styled Add Property Action Trigger */}
                <div className="shrink-0 flex items-center">
                    <Button
                        onClick={() => setOpen(true)}
                        size="lg"
                        className="w-full sm:w-auto h-11 px-5 rounded-xl font-semibold text-xs transition-all duration-200 shadow-sm hover:shadow-md hover:opacity-95 active:scale-[0.98] gap-2.5 bg-primary text-primary-foreground group"
                    >
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary-foreground/15 text-primary-foreground group-hover:scale-110 transition-transform">
                            <Plus className="h-4 w-4 stroke-[2.5]" />
                        </div>
                        <span className="tracking-wide">Add New Property</span>
                    </Button>
                </div>
            </div>

            {/* Modal */}
            <PropertyModal
                open={open}
                onOpenChange={setOpen}
                onSubmit={handleCreateProperty}
            />
        </>
    )
}
