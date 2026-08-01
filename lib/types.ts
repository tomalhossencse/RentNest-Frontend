import z from "zod";
import { loginSchema } from "./validations/login.validation";
import { registerSchema } from "./validations/register.validation";
import { rentalRequestSchema } from "./validations/request.validation";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type RentalRequestFormData = z.infer<typeof rentalRequestSchema>;

export interface userApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

export type UserStatus = 'ACTIVE' | 'BLOCKED';
export type UserRole = 'LANDLORD' | 'TENANT' | 'ADMIN';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    status: UserStatus;
    role: UserRole;
    profilePhoto: string | null;
    bio: string | null;
    createdAt: string;
    updatedAt: string;
}


export type NavbarProps = userApiResponse<UserProfile>



export interface Meta {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
}

export interface Landlord {
    id: string;
    name: string;
    email: string;
}


export interface PropertyCategory {
    id: string;
    name: string;
}


export type PropertyStatus = "AVAILABLE" | "RENTED" | "INACTIVE";

export type Division =
    | "DHAKA"
    | "CHATTOGRAM"
    | "RAJSHAHI"
    | "KHULNA"
    | "BARISHAL"
    | "SYLHET"
    | "RANGPUR"
    | "MYMENSINGH";


export interface IProperty {
    id: string;
    title: string;
    monthlyRent: string;
    division: Division;
    district: string;
    address: string;
    description: string;
    status: PropertyStatus;
    floor: number;
    image: string | null;
    availableFrom: string;
    createdAt: string;
    updatedAt: string;
    landlord: Landlord;
    category: PropertyCategory;
}


export interface PaginatedApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T[];
    meta: Meta;
}

export type PropertiesResponse = PaginatedApiResponse<IProperty>;

export type PropertyCardProps = {
    property: IProperty;
};

export type RentalRequestStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "PAID"
    | "CANCELLED";

export interface PropertyCategory {
    name: string;
}

export interface NestedPropertyDetails {
    title: string;
    address: string;
    monthlyRent: string; // Note: String type to match JSON ("24000")
    category: PropertyCategory;
    landlord: {
        name: string,
        email: string
    }
}

export interface IRentalRequest {
    id: string;
    propertyId: string;
    tenantId: string;
    moveInDate: string; // ISO Date String
    status: RentalRequestStatus;
    message: string;
    createdAt: string; // ISO Date String
    updatedAt: string; // ISO Date String
    property: NestedPropertyDetails;
    tenant: {
        name: string,
        email: string
    }
}



export type IRentalRequests = IRentalRequest[]

export type IApiRentalRequests = userApiResponse<IRentalRequests>

export type INavItem = {
    label: string;
    href: string;
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
};


