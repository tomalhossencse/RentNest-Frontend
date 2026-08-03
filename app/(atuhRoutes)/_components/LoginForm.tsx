'use client'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginFormData } from '@/lib/types'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginAction } from '../_actions/authActions'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/validations/login.validation'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'

const LoginFrom = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirectUrl");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })



    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        try {
            const promise = loginAction(data, redirectUrl);

            toast.promise(promise, {
                loading: "Logging in...",
                success: "Logged in successfully!",
                error: (err) => err.message || "Failed to log in.",
            });

            const res = await promise;

            if (res?.redirectUrl) {
                router.replace(res.redirectUrl);
                router.refresh();
            }
        } catch (err) {
        }
    };

    return (
        <Card className="mx-auto w-full max-w-md rounded-2xl border shadow-2xl">
            {/* Header */}
            <CardHeader className="space-y-4 px-8 pt-6 pb-2 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <LogIn className="h-8 w-8 text-primary" />
                </div>

                <div className="space-y-2">
                    <CardTitle className="text-3xl font-bold tracking-tight">
                        Welcome Back
                    </CardTitle>

                    <CardDescription className="text-base leading-relaxed">
                        Sign in to continue to your account.
                    </CardDescription>
                </div>
            </CardHeader>

            {/* Body */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-8">

                <div className="space-y-2">
                    <Label
                        htmlFor="email"
                        className="text-sm font-semibold"
                    >
                        Email Address
                    </Label>

                    <Input
                        type="email"
                        placeholder="john@example.com"
                        className="h-10"
                        {...register("email")}
                    />
                    {
                        errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email.message}
                            </p>
                        )
                    }
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="password"
                        className="text-sm font-semibold"
                    >
                        Password
                    </Label>

                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="h-10  pr-10"
                            {...register("password")}
                        />
                        {
                            errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password.message}
                                </p>
                            )
                        }

                    </div>
                </div>


                <Button
                    disabled={isSubmitting}
                    type='submit'
                    className="h-10 w-full text-base font-semibold"
                    size="lg"
                >
                    {isSubmitting ? "Loging..." : "Login"}
                </Button>

            </form>



            {/* Footer */}
            <CardFooter className="justify-center px-8 pb-6 pt-2">

                <p className="text-base text-muted-foreground">
                    Don&apos;t have an account?

                    <Link
                        href="/register"
                        className="ml-2 font-semibold text-primary transition-colors hover:underline"
                    >
                        Create Account
                    </Link>

                </p>

            </CardFooter>
        </Card>
    )
}

export default LoginFrom
