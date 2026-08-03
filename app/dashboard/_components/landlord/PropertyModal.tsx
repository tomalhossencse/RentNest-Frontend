"use client"

import { useEffect } from "react"
import { useForm, useWatch, Controller } from "react-hook-form"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Building2, MapPin, Image as ImageIcon, Calendar } from "lucide-react"
import { CreatePropertyFormData, DIVISION_DISTRICT_MAP } from "@/lib/types"


type DivisionType = keyof typeof DIVISION_DISTRICT_MAP


interface PropertyModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData?: CreatePropertyFormData | null
    onSubmit?: (data: CreatePropertyFormData) => void
    isEditing?: boolean
}

const DEFAULT_VALUES: CreatePropertyFormData = {
    title: "",
    description: "",
    monthlyRent: 35000,
    division: "DHAKA",
    district: "DHAKA",
    address: "",
    categoryId: "cmr9egxaj0000gwmhgbvasohq",
    status: "AVAILABLE",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    floor: 1,
    availableFrom: new Date().toISOString().split("T")[0],
}

const FIELD_LABEL_CLASS = "text-[13px] font-medium text-foreground/90 flex items-center gap-1"
const FIELD_INPUT_CLASS = "w-full h-10 px-3 bg-background border border-input text-sm text-foreground rounded-lg focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:outline-none placeholder:text-muted-foreground transition-colors"
const SELECT_TRIGGER_CLASS = "w-full h-10 px-3 bg-background border border-input text-sm text-foreground rounded-lg focus:ring-1 focus:ring-primary focus:ring-offset-0 focus:outline-none flex items-center justify-between transition-colors"

export function PropertyModal({
    open,
    onOpenChange,
    initialData,
    onSubmit,
}: PropertyModalProps) {

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<CreatePropertyFormData>({
        defaultValues: DEFAULT_VALUES,
    })

    const selectedDivision = useWatch({
        control,
        name: "division",
        defaultValue: "DHAKA",
    }) as DivisionType

    const selectedDistrict = useWatch({ control, name: "district" })
    const imageUrl = useWatch({ control, name: "image" })
    const availableDistricts = DIVISION_DISTRICT_MAP[selectedDivision] || []

    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                availableFrom: initialData.availableFrom
                    ? new Date(initialData.availableFrom).toISOString().split("T")[0]
                    : DEFAULT_VALUES.availableFrom,
            })
        } else {
            reset(DEFAULT_VALUES)
        }
    }, [initialData, open, reset])

    useEffect(() => {
        if (availableDistricts.length > 0 && !availableDistricts.includes(selectedDistrict as never)) {
            setValue("district", availableDistricts[0])
        }
    }, [selectedDivision, availableDistricts, selectedDistrict, setValue])

    const onFormSubmit = (data: CreatePropertyFormData) => {
        const formattedData: CreatePropertyFormData = {
            ...data,
            monthlyRent: Number(data.monthlyRent),
            floor: Number(data.floor),
            availableFrom: new Date(data.availableFrom).toISOString(),
        }
        onSubmit?.(formattedData)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[88vh] bg-card border border-border/80 p-0 overflow-hidden flex flex-col shadow-2xl rounded-2xl">

                {/* Header */}
                <DialogHeader className="px-6 py-4 border-b border-border bg-muted/20">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <div className="space-y-0.5">
                            <DialogTitle className="text-base font-semibold tracking-tight text-foreground">
                                {initialData ? "Edit Property Listing" : "Add New Property Listing"}
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground">
                                Complete the property details and location information below.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {/* Scrollable Form Body */}
                <form
                    id="property-form"
                    onSubmit={handleSubmit(onFormSubmit)}
                    className="flex-1 overflow-y-auto p-6 space-y-6"
                >
                    {/* SECTION 1: BASIC DETAILS */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                            <Building2 className="h-4 w-4 text-primary" />
                            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                Basic Details
                            </h3>
                        </div>

                        {/* Title */}
                        <div className="flex flex-col gap-1.5 min-w-0">
                            <label className={FIELD_LABEL_CLASS}>
                                Property Title <span className="text-destructive">*</span>
                            </label>
                            <Input
                                {...register("title", { required: "Property title is required" })}
                                placeholder="e.g. Premium Lake View Apartment"
                                className={FIELD_INPUT_CLASS}
                            />
                            {errors.title && (
                                <p className="text-xs text-destructive font-medium">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1.5 min-w-0">
                            <label className={FIELD_LABEL_CLASS}>
                                Description <span className="text-destructive">*</span>
                            </label>
                            <Textarea
                                {...register("description", { required: "Description is required" })}
                                rows={3}
                                placeholder="Highlight key features, amenities, view, and surrounding facilities..."
                                className="w-full p-3 bg-background border border-input text-sm text-foreground rounded-lg focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:outline-none placeholder:text-muted-foreground resize-none transition-colors"
                            />
                            {errors.description && (
                                <p className="text-xs text-destructive font-medium">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Rent & Floor */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5 min-w-0">
                                <label className={FIELD_LABEL_CLASS}>
                                    Monthly Rent (BDT) <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    type="number"
                                    {...register("monthlyRent", { required: true, min: 1 })}
                                    className={FIELD_INPUT_CLASS}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 min-w-0">
                                <label className={FIELD_LABEL_CLASS}>
                                    Floor Number <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    type="number"
                                    {...register("floor", { required: true, min: 0 })}
                                    className={FIELD_INPUT_CLASS}
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: LOCATION */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                Location Information
                            </h3>
                        </div>

                        {/* Division & District */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5 min-w-0">
                                <label className={FIELD_LABEL_CLASS}>
                                    Division <span className="text-destructive">*</span>
                                </label>
                                <Controller
                                    name="division"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={(val) => field.onChange(val as DivisionType)}
                                        >
                                            <SelectTrigger className={SELECT_TRIGGER_CLASS}>
                                                <span className="truncate">
                                                    <SelectValue placeholder="Select Division" />
                                                </span>
                                            </SelectTrigger>
                                            <SelectContent className="bg-card border-border">
                                                {Object.keys(DIVISION_DISTRICT_MAP).map((divKey) => (
                                                    <SelectItem key={divKey} value={divKey} className="text-sm cursor-pointer">
                                                        {divKey}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 min-w-0">
                                <label className={FIELD_LABEL_CLASS}>
                                    District <span className="text-destructive">*</span>
                                </label>
                                <Controller
                                    name="district"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className={SELECT_TRIGGER_CLASS}>
                                                <span className="truncate">
                                                    <SelectValue placeholder="Select District" />
                                                </span>
                                            </SelectTrigger>
                                            <SelectContent className="bg-card border-border max-h-52">
                                                {availableDistricts.map((dist) => (
                                                    <SelectItem key={dist} value={dist} className="text-sm cursor-pointer">
                                                        {dist.replace("_", " ")}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Street Address */}
                        <div className="flex flex-col gap-1.5 min-w-0">
                            <label className={FIELD_LABEL_CLASS}>
                                Street Address <span className="text-destructive">*</span>
                            </label>
                            <Input
                                {...register("address", { required: "Address is required" })}
                                placeholder="House 42, Road 11, Block B, Sector 4"
                                className={FIELD_INPUT_CLASS}
                            />
                            {errors.address && (
                                <p className="text-xs text-destructive font-medium">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* SECTION 3: MEDIA & AVAILABILITY */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                            <ImageIcon className="h-4 w-4 text-primary" />
                            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                Media & Availability
                            </h3>
                        </div>

                        {/* Image URL & Live Preview */}
                        <div className="flex flex-col gap-1.5 min-w-0">
                            <label className={FIELD_LABEL_CLASS}>
                                Cover Image URL <span className="text-destructive">*</span>
                            </label>
                            <div className="flex gap-3 items-center">
                                <Input
                                    {...register("image", { required: true })}
                                    placeholder="https://images.unsplash.com/..."
                                    className={`${FIELD_INPUT_CLASS} flex-1`}
                                />
                                {imageUrl && (
                                    <div className="h-10 w-14 rounded-lg border border-border/80 overflow-hidden shrink-0 bg-muted">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={imageUrl}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                            onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Available From & Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5 min-w-0">
                                <label className={FIELD_LABEL_CLASS}>
                                    Available From <span className="text-destructive">*</span>
                                </label>
                                <div className="relative w-full">
                                    <Input
                                        type="date"
                                        {...register("availableFrom", { required: true })}
                                        className={`${FIELD_INPUT_CLASS} pr-9`}
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 min-w-0">
                                <label className={FIELD_LABEL_CLASS}>
                                    Status <span className="text-destructive">*</span>
                                </label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={(val) => field.onChange(val as "AVAILABLE" | "RENTED")}
                                        >
                                            <SelectTrigger className={SELECT_TRIGGER_CLASS}>
                                                <span className="truncate">
                                                    <SelectValue placeholder="Select Status" />
                                                </span>
                                            </SelectTrigger>
                                            <SelectContent className="bg-card border-border">
                                                <SelectItem value="AVAILABLE" className="text-sm cursor-pointer">
                                                    AVAILABLE
                                                </SelectItem>
                                                <SelectItem value="RENTED" className="text-sm cursor-pointer">
                                                    RENTED
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <DialogFooter className="px-6 py-4 border-t border-border bg-muted/20 flex-row items-center justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="font-medium text-xs h-10 px-5 border-border rounded-lg hover:bg-muted"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="property-form"
                        disabled={isSubmitting}
                        className="font-medium text-xs h-10 px-6 rounded-lg shadow-sm"
                    >
                        {initialData ? "Save Changes" : "Create Property"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
