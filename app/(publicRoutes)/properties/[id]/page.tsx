import React from "react"

const PropertyDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params
    return <div>PropertyDetailsPage : {id}</div>
}

export default PropertyDetailsPage
