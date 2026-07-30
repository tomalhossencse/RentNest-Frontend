
const PaymentPage = async ({ params }: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params;
    return (
        <div>PaymentPage : Pay({id})
        </div>

    )
}

export default PaymentPage
