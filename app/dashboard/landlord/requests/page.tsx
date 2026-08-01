import { IApiRentalRequests } from '@/lib/types'
import { getLandlordRequests } from '../../_actions/tenant/requestActions'
import { RequestHistory } from '../../_components/landlord/RequestHistory'

const ManageRequestPage = async () => {
    const result = await getLandlordRequests() as IApiRentalRequests
    return (
        <div className="space-y-5">
            <div>
                <h2 className="text-xl font-bold tracking-tight">Rental Requests</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Filter and process incoming tenant move-in applications.
                </p>
            </div>

            <RequestHistory result={result} />
        </div>
    )
}

export default ManageRequestPage
