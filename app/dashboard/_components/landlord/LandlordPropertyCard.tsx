"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { CreatePropertyFormData, PropertyCardProps } from "@/lib/types"
import { PropertyModal } from "./PropertyModal" // Adjust path as needed
import {
    Building2,
    CalendarDays,
    MapPin,
    MoreVertical,
    Pencil,
    Trash2,
    Eye,
    CheckCircle2,
    XCircle,
    Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formattedAvailableDate, formattedRentFn } from "@/utils"
import { useRouter } from "next/navigation"
import { deleteProperty, updateProperty, updatePropertyStatus } from "@/app/(publicRoutes)/_actions/propertyActions"
import { toast } from "sonner"

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?fm=jpg&q=60&w=3000&auto=format&fit=crop"

interface LandlordPropertyCardProps extends PropertyCardProps {
    // onUpdate?: (id: string, data: CreatePropertyFormData) => Promise<void>

}

export const LandlordPropertyCard = ({
    property,
}: LandlordPropertyCardProps) => {
    const router = useRouter()
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

    const formattedDate = formattedAvailableDate(property.availableFrom)
    const formattedRent = formattedRentFn(property.monthlyRent)

    // Handle quick status toggle (AVAILABLE <-> RENTED)
    const handleStatusChange = async () => {
        try {
            setIsUpdatingStatus(true)
            const res = await updatePropertyStatus(property.status === "AVAILABLE" ? "INACTIVE" : "AVAILABLE", property.id)
            if (res?.success) {
                toast.success(`Propery updated to ${status.toLowerCase()} successfully`)
                router.refresh()
            } else {
                toast.error("Failed to update status")
            }
        } catch (error) {
            console.error("Failed to update status:", error)
            toast.error("Failed to update status")
        } finally {
            setIsUpdatingStatus(false)
        }
    }

    // Handle delete confirmation
    const handleDeleteConfirm = async () => {
        try {
            setIsDeleting(true)
            const res = await deleteProperty(property.id)
            if (res?.success) {
                toast.success(`Property deleted successfully`)
                router.refresh()
            } else {
                toast.error("Failed to delete status")
            }
            router.refresh()
        } catch (error) {
            toast.error("Failed to delete status")
            console.error("Failed to delete property:", error)
        } finally {
            setIsDeleting(false)
            setIsDeleteDialogOpen(false)
        }
    }

    // Handle property update
    const handleFormSubmit = async (data: CreatePropertyFormData) => {
        try {
            const res = await updateProperty(data, property.id)
            if (res?.success) {
                toast.success("Property updated successfully")
                router.refresh()
            } else {
                toast.error("Failed to update property")
            }
        } catch (error) {
            toast.error("Failed to update property")
            console.error("Failed to delete property:", error)
        }
    }

    return (
        <>
            <Card className="group overflow-hidden rounded-xl border bg-card shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pt-0 flex flex-col justify-between">
                <div>
                    {/* Header Image & Badges */}
                    <CardHeader className="relative h-44 w-full p-0">
                        <Image
                            src={property.image ?? FALLBACK_IMAGE}
                            alt={property.title || "Property Thumbnail"}
                            fill
                            unoptimized
                            loading="eager"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Top Category & Status Badges */}
                        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2 z-10">
                            <Badge variant="secondary" className="bg-background/80 backdrop-blur-md text-xs font-medium">
                                {property.category?.name || "Apartment"}
                            </Badge>

                            <div className="flex items-center gap-1.5">
                                <Badge
                                    className={`text-xs font-semibold text-white shadow-xs ${property.status === "AVAILABLE"
                                        ? "bg-emerald-600 hover:bg-emerald-600"
                                        : "bg-destructive hover:bg-destructive"
                                        }`}
                                >
                                    {isUpdatingStatus ? (
                                        <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                    ) : null}
                                    {property.status}
                                </Badge>

                                {/* Action Dropdown Menu */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        className={cn(
                                            buttonVariants({ variant: "secondary", size: "icon" }),
                                            "h-7 w-7 rounded-full bg-background/80 backdrop-blur-md hover:bg-background/90"
                                        )}
                                    >
                                        <MoreVertical className="h-3.5 w-3.5" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                                        <DropdownMenuItem
                                            onClick={() => setIsEditOpen(true)}
                                            className="cursor-pointer gap-2 text-xs font-medium"
                                        >
                                            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                                            Edit Property Details
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            onClick={handleStatusChange}
                                            disabled={isUpdatingStatus}
                                            className="cursor-pointer gap-2 text-xs font-medium"
                                        >
                                            {property.status === "AVAILABLE" ? (
                                                <>
                                                    <XCircle className="h-3.5 w-3.5 text-amber-500" />
                                                    Mark as Inactive
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                                    Mark as Available
                                                </>
                                            )}
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem
                                            onClick={() => setIsDeleteDialogOpen(true)}
                                            className="cursor-pointer gap-2 text-xs font-medium text-destructive focus:text-destructive focus:bg-destructive/10"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                            Delete Listing
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardHeader>

                    {/* Content Details */}
                    <CardContent className="space-y-3 px-4 py-3">
                        <div>
                            <h3 className="line-clamp-1 text-base font-semibold tracking-tight" title={property.title}>
                                {property.title}
                            </h3>
                            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                <span className="line-clamp-1">{property.district}, {property.division}</span>
                            </p>
                        </div>

                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-primary">৳{formattedRent}</span>
                            <span className="text-xs text-muted-foreground font-medium">/ month</span>
                        </div>

                        <div className="flex items-center justify-between border-t border-b py-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Building2 className="h-3.5 w-3.5 text-primary" />
                                <span>Floor {property.floor}</span>
                            </div>

                            <div className="h-3 w-px bg-border" />

                            <div className="flex items-center gap-1.5">
                                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                    </CardContent>
                </div>

                {/* Management Actions Footer */}
                <CardFooter className="px-4 py-3 pt-0 grid grid-cols-2 gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditOpen(true)}
                        className="w-full font-medium text-xs h-9 gap-1.5 rounded-lg border-border hover:bg-muted"
                    >
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                        Edit
                    </Button>

                    <Link
                        href={`/properties/${property.id}`}
                        className={cn(
                            buttonVariants({ variant: "default", size: "sm" }),
                            "w-full font-medium text-xs h-9 gap-1.5 rounded-lg justify-center"
                        )}
                    >
                        <Eye className="h-3.5 w-3.5" />
                        View
                    </Link>
                </CardFooter>
            </Card>

            {/* Edit Modal Component Integration */}
            <PropertyModal
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                initialData={{
                    title: property.title,
                    description: property.description || "",
                    monthlyRent: Number((property.monthlyRent)),
                    division: property.division as any,
                    district: property.district,
                    address: property.address || "",
                    categoryId: property.categoryId || "cmr9egxaj0000gwmhgbvasohq",
                    status: property.status as "AVAILABLE" | "RENTED",
                    image: property.image || FALLBACK_IMAGE,
                    floor: property.floor,
                    availableFrom: property.availableFrom,
                }}
                onSubmit={handleFormSubmit}
            />

            {/* Delete Confirmation Alert */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="bg-card border-border rounded-xl max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-base font-semibold">
                            Delete Property Listing?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-xs text-muted-foreground">
                            This action cannot be undone. This will permanently delete <strong>{property.title}</strong> from your active listings.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel className="h-9 text-xs rounded-lg border-border">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                            className="h-9 text-xs rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : null}
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
