import z from "zod";
import { loginSchema } from "./validations/login.validation";
import { registerSchema } from "./validations/register.validation";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;


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


export type NavbarProps = {
    user: userApiResponse<UserProfile>
};



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

