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



