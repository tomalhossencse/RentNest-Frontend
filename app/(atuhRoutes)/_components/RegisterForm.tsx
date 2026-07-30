"use client";

import Link from "next/link";
import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterFormData } from "@/lib/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "../_actions/authActions";
import { registerSchema } from "@/lib/validations/register.validation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {

    const router = useRouter()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) })

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {

        try {
            const promise = registerAction(data);

            toast.promise(promise, {
                loading: "Creating account...",
                success: "Account created successfully!",
                error: (err) => err.message || "Failed to create account.",
            });

            const res = await promise;

            if (res?.redirectUrl) {
                router.replace(res.redirectUrl);
                router.refresh();
            }
        } catch (err) { }
    }

    return (
        <Card className="mx-auto w-full max-w-xl rounded-2xl border shadow-2xl">
            {/* Header */}
            <CardHeader className="space-y-4 px-8 pt-6 pb-2 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <UserPlus className="h-8 w-8 text-primary" />
                </div>

                <div className="space-y-2">
                    <CardTitle className="text-3xl font-bold tracking-tight">
                        Create Account
                    </CardTitle>

                    <CardDescription className="text-base leading-relaxed">
                        Join RentNest and start renting or listing your properties.
                    </CardDescription>
                </div>

            </CardHeader>

            {/* Body */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-8">

                <div className="grid gap-6 md:grid-cols-2 items-center justify-between">

                    {/* Name */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="name"
                            className="text-sm font-semibold"
                        >
                            Full Name
                        </Label>

                        <Input
                            type="text"
                            placeholder="your name here"
                            className="h-10"
                            {...register("name")}
                        />
                        {
                            errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name.message}
                                </p>
                            )
                        }
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                        <Label className="text-base">I am a</Label>

                        <Controller
                            name="role"
                            control={control}
                            defaultValue="TENANT"
                            render={({ field }) => (
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="TENANT" id="tenant" />
                                        <Label htmlFor="tenant">Tenant</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="LANDLORD" id="landlord" />
                                        <Label htmlFor="landlord">Landlord</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>

                </div>


                <div className="grid gap-6 md:grid-cols-2 items-center justify-between">

                    {/* email */}
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

                    {/* password */}
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

                </div>

                {/* photo */}

                <div className="space-y-2">
                    <Label
                        htmlFor="profilePhoto"
                        className="text-sm font-semibold"
                    >
                        Profile Photo  <span className="text-muted-foreground">(Optional)</span>
                    </Label>


                    <Input
                        type="text"
                        placeholder="https://example.com/photo.jpg"
                        className="h-10"
                        {...register("profilePhoto")}
                    />
                    {
                        errors.profilePhoto && (
                            <p className="text-sm text-destructive">
                                {errors.profilePhoto.message}
                            </p>
                        )
                    }
                </div>

                <Button
                    type='submit'
                    disabled={isSubmitting}
                    className="h-10 w-full text-base font-semibold"
                    size="lg"
                >
                    {isSubmitting ? "Creating..." : "Create Account"}
                </Button>

            </form>



            {/* Footer */}
            <CardFooter className="justify-center px-8 pb-6 pt-2">

                <p className="text-base text-muted-foreground">
                    Already have an account?

                    <Link
                        href="/login"
                        className="ml-2 font-semibold text-primary transition-colors hover:underline"
                    >
                        Sign In
                    </Link>

                </p>

            </CardFooter>
        </Card>
    )
}

export default RegisterForm
