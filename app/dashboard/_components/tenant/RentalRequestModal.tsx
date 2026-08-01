"use client"


import { useForm } from "react-hook-form"
import { Calendar, Send, Loader2 } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RentalRequestFormData } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { rentalRequestSchema } from "@/lib/validations/request.validation"


interface RentalRequestModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    propertyTitle: string
    onSubmitRequest?: (data: RentalRequestFormData) => Promise<void> | void
}

//   const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting },
//     } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })



//     const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
//         try {
//             const promise = loginAction(data);

//             toast.promise(promise, {
//                 loading: "Logging in...",
//                 success: "Logged in successfully!",
//                 error: (err) => err.message || "Failed to log in.",
//             });

//             const res = await promise;

//             if (res?.redirectUrl) {
//                 router.replace(res.redirectUrl);
//                 router.refresh();
//             }
//         } catch (err) {
//         }
//     };


export function RentalRequestModal({
    open,
    onOpenChange,
    propertyTitle,
    onSubmitRequest,
}: RentalRequestModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RentalRequestFormData>({
        resolver: zodResolver(rentalRequestSchema), defaultValues: {
            moveInDate: new Date().toISOString().split("T")[0],
            message: "I'm interested in renting this apartment for my family.",
        }
    },

    )

    const handleFormSubmit = async (data: RentalRequestFormData) => {
        // Convert local YYYY-MM-DD to ISO 8601 string format: "2026-08-01T00:00:00.000Z"
        console.log(data)
        const formattedData = {
            ...data,
            moveInDate: new Date(data.moveInDate).toISOString(),
        }

        if (onSubmitRequest) {
            await onSubmitRequest(formattedData)
        }

        reset()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[90vw] sm:max-w-md bg-card border-border p-0 overflow-hidden shadow-xl rounded-xl">
                <DialogHeader className="px-5 pt-5 pb-3 border-b border-border bg-muted/20">
                    <DialogTitle className="text-lg font-bold text-foreground">
                        Request to Rent
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground mt-0.5 truncate">
                        {propertyTitle}
                    </DialogDescription>
                </DialogHeader>

                <form
                    id="rental-request-form"
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="p-5 space-y-4"
                >
                    {/* 1. Move-in Date Field */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            Desired Move-In Date <span className="text-destructive">*</span>
                        </label>
                        <div className="relative">
                            <Input
                                type="date"
                                {...register("moveInDate", { required: "Move-in date is required" })}
                                className="bg-background border-border text-xs h-9 pr-8"
                            />
                        </div>
                        {errors.moveInDate && (
                            <p className="text-[10px] text-destructive font-medium">
                                {errors.moveInDate.message}
                            </p>
                        )}
                    </div>

                    {/* 2. Message Field */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground">
                            Message to Landlord <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                            {...register("message", {
                                required: "Please add a brief message for the landlord",
                            })}
                            rows={3}
                            placeholder="Tell the landlord a bit about yourself or ask any questions..."
                            className="bg-background border-border text-xs resize-none"
                        />
                        {errors.message && (
                            <p className="text-[10px] text-destructive font-medium">
                                {errors.message.message}
                            </p>
                        )}
                    </div>
                </form>

                <DialogFooter className="px-5 py-3 border-t border-border bg-muted/20 flex-row items-center justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="font-semibold text-xs h-9 px-4 border-border"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="rental-request-form"
                        disabled={isSubmitting}
                        className="font-bold text-xs h-9 px-5 gap-1.5"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="h-3.5 w-3.5" />
                                Submit Request
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
