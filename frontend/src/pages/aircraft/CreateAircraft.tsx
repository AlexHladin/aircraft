import { useState } from "react";
import DangerAlert from "../../components/alerts/Danger";
import { Aircraft, useAircrafts } from "../../hooks/use-aircrafts";
import Breadcrumb from "../../layout/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import LoadingSpinner from "../../layout/LoadingSpinner";
import AircraftForm from "./AircraftForm";

const CreateAircraft = () => {
    const { isLoading, error, createAircraft } = useAircrafts();
    const [formData, setFormData] = useState<Omit<Aircraft, 'id'>>({
        model: '', 
        registration: '', 
        serial_number: '',
    });
    
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Create aircraft' />
            <div className='flex flex-col gap-10 max-w-xl'>
                <div className='rounded-sm border border-stroke bg-white shadow-default'>
                    {isLoading && (
                        <div className='-mt-40'>
                            <LoadingSpinner />
                        </div>
                    )}

                    {!isLoading && (<AircraftForm
                        handleSubmit={() => createAircraft(formData)}
                        submitButtonText="Create"
                        formData={formData}
                        setFormData={setFormData}
                    />)}
                </div>
            </div>
            {error && <DangerAlert message={error.message} />}
        </DefaultLayout>
    );
}

export default CreateAircraft;