export const formattedRentFn = (monthlyRent: string): string => {
    return Number(monthlyRent || 0).toLocaleString();
}

export const formattedAvailableDate = (availableFrom: string): string => {
    return new Date(availableFrom).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export const formatDateTime = (dateString?: string | Date) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })
}


