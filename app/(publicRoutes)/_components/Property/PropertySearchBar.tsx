"use client";

import { useEffect, useRef, useState, } from "react";
import { Search, MapPin, Home, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpDown, Check, ChevronsUpDown } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Division, DIVISION_DISTRICT_MAP } from "@/lib/types";


const categories = ["Apartment", "House", "Studio", "Office", "Shop", "Warehouse", "Room", "Stadium"]


const SORT_OPTIONS = [
    { label: 'Date Added (Newest)', sortBy: 'createdAt', sortOrder: 'desc' },
    { label: 'Date Added (Oldest)', sortBy: 'createdAt', sortOrder: 'asc' },
    { label: 'Rent (Low to High)', sortBy: 'monthlyRent', sortOrder: 'asc' },
    { label: 'Rent (High to Low)', sortBy: 'monthlyRent', sortOrder: 'desc' },
    { label: 'Title (A to Z)', sortBy: 'title', sortOrder: 'asc' },
    { label: 'Title (Z to A)', sortBy: 'title', sortOrder: 'desc' },
    { label: 'Available Date (Earliest)', sortBy: 'availableFrom', sortOrder: 'asc' },
    { label: 'Available Date (Latest)', sortBy: 'availableFrom', sortOrder: 'desc' },
] as const


export function PropertySearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter()
    const pathname = usePathname()

    const selectedDivision = (searchParams.get("division") as Division) ?? "all";
    const availableDistricts = selectedDivision && selectedDivision !== ("" as any)
        ? DIVISION_DISTRICT_MAP[selectedDivision as Division] || []
        : [];

    const minRent = (Number(searchParams.get("minRent"))) ?? 5000;
    const maxRent = (Number(searchParams.get("maxRent"))) ?? 100000;
    const [priceRange, setPriceRange] = useState<[number, number]>([minRent, maxRent])

    const currentSortBy = searchParams.get('sortBy') || 'createdAt'
    const currentSortOrder = searchParams.get('sortOrder') || 'dsc'

    const activeOption = SORT_OPTIONS.find(
        (opt) => opt.sortBy === currentSortBy && opt.sortOrder === currentSortOrder
    )

    useEffect(() => {
        setPriceRange([
            (Number(searchParams.get("minRent"))) || 5000,
            (Number(searchParams.get("maxRent"))) || 100000
        ])
    }, [])

    const debounceReference = useRef<ReturnType<typeof setTimeout> | null>(null)


    const handleSearch = (value: string) => {
        if (debounceReference.current) {
            clearTimeout(debounceReference.current)
        }

        debounceReference.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())

            if (value) {
                params.set("searchTerm", value)
                params.set("page", "1");
            } else {
                params.delete("searchTerm")
                params.set("page", "1");
            }

            router.replace(`${pathname}?${params.toString()}`)
        }, 500)

    };


    const handleChange = (key: string, value: string) => {

        const params = new URLSearchParams(searchParams.toString())

        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }

        params.set("page", "1");


        router.replace(`${pathname}?${params.toString()}`)


    };

    const handlePriceChange = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(updates).forEach(([key, value]) => {
            if (value) {
                params.set(key, value)
            } else {
                params.delete(key)
            }

            params.set("page", "1");
        })

        params.set("page", "1");

        router.replace(`${pathname}?${params.toString()}`)
    }


    const handleSortChange = (sortBy: string, sortOrder: string) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set('sortBy', sortBy)
        params.set('sortOrder', sortOrder)
        params.set('page', '1')

        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }


    return (
        <div className="w-full rounded-2xl border border-border/60 bg-card p-3 shadow-lg backdrop-blur-md dark:bg-card/90">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-12 md:items-center">

                {/* Search Input (Location/Title) */}
                <div className="relative md:col-span-4">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search location, area, or property name..."
                        defaultValue={searchParams.get('searchTerm') ?? ""}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="h-11 border-border/40 pl-10 pr-4 text-sm font-medium focus-visible:ring-primary"
                    />
                </div>

                {/* Category Select */}
                <div className="md:col-span-2">
                    <Select value={searchParams.get('category') || ""} onValueChange={(value: string) => handleChange("category", value)}>
                        <SelectTrigger className="h-11 w-full border-border/40 text-sm font-medium">
                            <div className="flex items-center gap-2 truncate">
                                <Home className="h-4 w-4 shrink-0 text-muted-foreground" />
                                <SelectValue placeholder="Property Type" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All Types</SelectItem>
                            {
                                categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)
                            }

                        </SelectContent>
                    </Select>
                </div>

                {/* Division Select */}
                <div className="md:col-span-2">
                    <Select value={searchParams.get('division') || ""} onValueChange={(value: string) => handleChange("division", value)}>
                        <SelectTrigger className="h-11 w-full border-border/40 text-sm font-medium">
                            <div className="flex items-center gap-2 truncate">
                                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                                <SelectValue placeholder="Division" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All Bangladesh</SelectItem>

                            {
                                Object.keys(DIVISION_DISTRICT_MAP).map((division) =>
                                    <SelectItem key={division} value={division}>{division}</SelectItem>
                                )
                            }
                        </SelectContent>
                    </Select>
                </div>

                {/* District Select */}
                <div className="md:col-span-2">
                    <Select value={searchParams.get('district') || ""} onValueChange={(value: string) => handleChange("district", value)}>
                        <SelectTrigger className="h-11 w-full border-border/40 text-sm font-medium">
                            <div className="flex items-center gap-2 truncate">
                                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                                <SelectValue placeholder="Select Division First" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All Bangladesh</SelectItem>
                            {
                                availableDistricts.map((district) =>
                                    <SelectItem key={district} value={district}>{district}</SelectItem>
                                )
                            }
                        </SelectContent>
                    </Select>
                </div>

                {/* Filter Popover Trigger - FIXED HERE */}
                <div className="md:col-span-2">
                    <Popover>
                        <PopoverTrigger
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "h-11 w-full justify-between border-border/40 font-medium text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <div className="flex items-center gap-2 truncate">
                                <SlidersHorizontal className="h-4 w-4 shrink-0" />
                                <span>Filters & Sorting</span>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-5 space-y-5" align="start">

                            {/* sorting */}
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className={cn(
                                        buttonVariants({ variant: "outline" }),
                                        "h-11 w-full justify-between border-neutral-800 bg-neutral-900/60 text-xs font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white md:w-55"
                                    )}
                                >
                                    <div className="flex items-center gap-2 truncate">
                                        <ArrowUpDown className="h-4 w-4 shrink-0 text-neutral-400" />
                                        <span className="truncate">{activeOption ? activeOption.label : 'Sort by'}</span>
                                    </div>
                                    <ChevronsUpDown className="h-4 w-4 shrink-0 text-neutral-500" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-60 border-neutral-800 bg-neutral-950 text-neutral-200"
                                    align="end"
                                >
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel className="text-xs font-semibold text-neutral-400">
                                            Sort Properties
                                        </DropdownMenuLabel>
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator className="bg-neutral-800" />

                                    <DropdownMenuGroup>
                                        {SORT_OPTIONS.map((option) => {
                                            const isSelected =
                                                currentSortBy === option.sortBy && currentSortOrder === option.sortOrder

                                            return (
                                                <DropdownMenuItem
                                                    key={`${option.sortBy}-${option.sortOrder}`}
                                                    onClick={() => handleSortChange(option.sortBy, option.sortOrder)}
                                                    className={cn(
                                                        "cursor-pointer text-xs font-medium focus:bg-neutral-900 focus:text-white",
                                                        isSelected && "bg-neutral-900 text-white font-semibold"
                                                    )}
                                                >
                                                    <div className="flex w-full items-center justify-between">
                                                        <span>{option.label}</span>
                                                        {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                                                    </div>
                                                </DropdownMenuItem>
                                            )
                                        })}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Price Range Slider */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs font-semibold">
                                    <span className="text-muted-foreground">Price Range (BDT)</span>
                                    <span className="font-mono text-primary">
                                        ৳{priceRange[0].toLocaleString()} - ৳{priceRange[1].toLocaleString()}
                                    </span>
                                </div>
                                <Slider
                                    min={2000}
                                    max={200000}
                                    step={1000}
                                    value={priceRange}
                                    onValueChange={(value) => setPriceRange(value as [number, number])}
                                    onValueCommitted={(value) => {
                                        const [min, max] = value as [number, number];
                                        handlePriceChange({
                                            minRent: min.toString(),
                                            maxRent: max.toString(),
                                        });
                                    }}
                                    className="py-2"
                                />
                            </div>

                            {/* Floors Filter */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground">
                                    Floors
                                </label>
                                <div className="grid grid-cols-5 gap-1.5">
                                    {["any", "1", "2", "3", "4"].map((floor) => (
                                        <Button
                                            key={floor}
                                            type="button"
                                            size="sm"
                                            variant={searchParams.get('floor') === floor ? "default" : "outline"}
                                            onClick={() => handleChange("floor", floor)}
                                            className="h-8 text-xs font-medium capitalize"
                                        >
                                            {floor}
                                        </Button>
                                    ))}
                                </div>
                            </div>


                        </PopoverContent>
                    </Popover>
                </div>
            </div >
        </div >
    );
}
