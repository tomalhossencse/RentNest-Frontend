"use client"

import { useState } from "react"
import { User, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    RentalRequestModal,
} from "./RentalRequestModal"
import { RentalRequestFormData } from "@/lib/types"
import { addRequests } from "../../_actions/requestActions"
import { toast } from "sonner"

interface PropertyActionCardProps {
    propertyId: string
    propertyTitle: string
    monthlyRent: string
    status: string
    landlord?: {
        name?: string
        email?: string
    }
}

export function PropertyActionCard({
    propertyId,
    propertyTitle,
    monthlyRent,
    status,
    landlord,
}: PropertyActionCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSubmitRequest = async (data: RentalRequestFormData) => {

        try {
            const promise = addRequests({ ...data }, propertyId);

            toast.promise(promise, {
                loading: "Requesting....",
                success: "Rental request send successfully",
                error: (err) => err.message || "Failed to request send.",
            });

        } catch (error) {

        }
    }

    return (
        <>
            <Card className="sticky top-20 border-border bg-card shadow-md">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Rental Details
                    </CardTitle>
                    <div className="mt-2 flex items-baseline gap-1.5">
                        <span className="text-3xl font-extrabold text-primary">
                            ৳{monthlyRent}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium">
                            / month
                        </span>
                    </div>
                </CardHeader>

                <CardContent className="space-y-5">
                    <Separator className="bg-border" />

                    {/* Landlord Contact Info */}
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Landlord Info
                        </p>
                        <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <User className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-foreground">
                                    {landlord?.name}
                                </p>
                                <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                                    <Mail className="h-3 w-3 shrink-0" />
                                    <span className="truncate">{landlord?.email}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2.5 pt-2">
                        <Button
                            className="w-full font-semibold"
                            size="lg"
                            disabled={status !== "AVAILABLE"}
                            onClick={() => setIsModalOpen(true)}
                        >
                            {status === "AVAILABLE" ? "Request to Rent" : "Currently Rented"}
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full border-border bg-card hover:bg-muted font-semibold gap-2"
                            onClick={() => {
                                window.open(
                                    `https://mail.google.com/mail/u/0/?to=${landlord?.email}&fs=1&tf=cm`,
                                    "_blank"
                                )
                            }}
                        >
                            Contact Landlord
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Modal Trigger */}
            <RentalRequestModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                propertyTitle={propertyTitle}
                onSubmitRequest={handleSubmitRequest}
            />
        </>
    )
}
