"use server"
import { LoginFormData, RegisterFormData } from "@/lib/types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const loginAction = async (data: LoginFormData) => {
    console.log(data)

    const payload = {
        ...data
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
        throw new Error(result.message || "Invalid credentials");
    }

    if (result.success) {
        const cookieStore = await cookies();
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24,
        });
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        const decodeToken = jwt.decode(result.data.accessToken) as JwtPayload;

        let redirectUrl = "/dashboard/tenant";
        if (decodeToken.role === "ADMIN") {
            redirectUrl = "/dashboard/admin";
        } else if (decodeToken.role === "LANDLORD") {
            redirectUrl = "/dashboard/landlord";
        }

        return { success: true, redirectUrl };
    }

    return result;

};

export const registerAction = async (data: RegisterFormData) => {
    console.log(data)

    const payload = {
        ...data
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to register user ");
    }

    if (result.success) {
        const cookieStore = await cookies();
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24,
        });
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        const decodeToken = jwt.decode(result.data.accessToken) as JwtPayload;

        let redirectUrl = "/dashboard/tenant";
        if (decodeToken.role === "ADMIN") {
            redirectUrl = "/dashboard/admin";
        } else if (decodeToken.role === "LANDLORD") {
            redirectUrl = "/dashboard/landlord";
        }

        return { success: true, redirectUrl };
    }


    return result;
};
