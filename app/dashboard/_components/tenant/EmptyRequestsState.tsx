import Link from "next/link"
import { Building2, PlusCircle } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const EmptyRequestsState = () => {
    return (
        <Card className="border-dashed border-2 bg-muted/20 my-8">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">No Applications Found</h3>
                <p className="text-xs md:text-sm text-muted-foreground max-w-md mt-1 mb-6">
                    You haven't submitted any rental applications yet. Browse available properties and apply to get started.
                </p>
                <Link
                    href="/properties"
                    className={buttonVariants({ size: "default", className: "gap-2 font-semibold" })}
                >
                    <PlusCircle className="h-4 w-4" />
                    Explore Available Properties
                </Link>
            </CardContent>
        </Card>
    )
}

export default EmptyRequestsState
