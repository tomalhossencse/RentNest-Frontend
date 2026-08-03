import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { getNewAccessTokenByRefreshToken } from "./services/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/properties", "/properties/:id", "/contact"];

export async function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname;
    const cookieStore = await cookies();

    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodeAccessToken = accessToken
        ? ((await verifyToken(accessToken, "access")) as JwtPayload)
        : null;

    const decodeRefreshToken = refreshToken
        ? ((await verifyToken(refreshToken, "refresh")) as JwtPayload)
        : null;


    if (!decodeAccessToken?.success && decodeRefreshToken?.success) {
        const result = await getNewAccessTokenByRefreshToken();

        if (result.success) {
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24,
            });

            accessToken = newAccessToken;
            decodeAccessToken = (await verifyToken(
                accessToken!,
                "access",
            )) as JwtPayload;
        }
    }

    let userRole = []

    if (!decodeAccessToken?.success) {
        cookieStore.delete("accessToken");
    }

    if (decodeAccessToken?.success && decodeAccessToken?.data) {
        userRole = decodeAccessToken.data.role;
    }


    // Authenticated user not allowed to access auth routes
    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === "ADMIN") {
            return NextResponse.redirect(
                new URL("/dashboard/admin", request.url),
            );
        } else if (userRole === "LANDLORD") {
            return NextResponse.redirect(
                new URL("/dashboard/landlord", request.url),
            );
        }
        return NextResponse.redirect(new URL("/dashboard/tenant", request.url));
    }


    const isPublicRoute = PUBLIC_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(route),
    );

    const isAuthRoute = AUTH_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(route),
    );


    // Unauthenticated user not allowed to access protected routes
    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirectUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Autorization: Role-based access control
    if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    } else if (
        pathname.startsWith("/dashboard/landlord") &&
        userRole !== "LANDLORD"
    ) {
        return NextResponse.redirect(new URL("/not-found", request.url));
    } else if (pathname.startsWith("/dashboard/tenant") && userRole !== "TENANT") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    }


    return NextResponse.next();
}


export const config = {
    matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
