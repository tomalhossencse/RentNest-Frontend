export const formattedRentFn = (monthlyRent: string) => {
    new Intl.NumberFormat("en-BD").format(
        Number(monthlyRent) || 0
    )
}

export const formattedAvailableDate = (availableFrom: string) => {
    new Date(availableFrom).toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    )
}
