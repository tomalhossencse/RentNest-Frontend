"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Lock, CreditCard } from "lucide-react"

export default function PaymentPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const amount = searchParams.get("amount") || "70000"

    const [loading, setLoading] = useState(false)

    const handlePaySuccess = () => {
        setLoading(true)
        setTimeout(() => {
            router.push("/payment/success")
        }, 1000)
    }

    const handleCancel = () => {
        router.push("/payment/cancel")
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <Card className="max-w-md w-full border-border bg-card shadow-lg">
                <CardHeader className="text-center space-y-1">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                        <Lock className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-extrabold">Secure Rental Payment</CardTitle>
                    <p className="text-xs text-muted-foreground">RentNest Escrow Checkout</p>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="rounded-xl bg-muted/40 p-4 border border-border text-center space-y-1">
                        <span className="text-xs font-bold text-muted-foreground uppercase">Total Amount Due</span>
                        <div className="text-3xl font-extrabold text-foreground">৳{Number(amount).toLocaleString()}</div>
                    </div>

                    <div className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-foreground">Cardholder Name</label>
                            <Input placeholder="Md. Tomal Hossen" className="bg-background border-border" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-foreground">Card Number</label>
                            <Input placeholder="4242 •••• •••• 4242" className="bg-background border-border" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-foreground">Expiry</label>
                                <Input placeholder="12/28" className="bg-background border-border" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-foreground">CVC</label>
                                <Input placeholder="123" className="bg-background border-border" />
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex-col gap-2 pt-2">
                    <Button onClick={handlePaySuccess} disabled={loading} className="w-full h-11 font-bold text-base gap-2">
                        <CreditCard className="h-5 w-5" /> Pay ৳{Number(amount).toLocaleString()}
                    </Button>
                    <Button onClick={handleCancel} variant="ghost" className="w-full text-xs text-muted-foreground">
                        Cancel Payment
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
