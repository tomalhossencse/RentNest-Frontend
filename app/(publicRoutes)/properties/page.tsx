import { getProperties } from "../_actions/propertyActions"
import { PropertyListing } from "../_components/Property/PropertyListing"

const PropertiesPage = async () => {
    const result = await getProperties()


    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <PropertyListing result={result} />
        </div>
    )
}

export default PropertiesPage
