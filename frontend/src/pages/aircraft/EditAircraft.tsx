import { Aircraft, useAircrafts } from "../../hooks/use-aircrafts";
import Breadcrumb from "../../layout/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import LoadingSpinner from "../../layout/LoadingSpinner";
import AircraftForm from "./AircraftForm";
import { useEffect, useState } from "react";
import DangerAlert from "../../components/alerts/Danger";

const EditAircraft = () => {
    const { isLoading, error, selectedAircraft, updateAircraft } = useAircrafts();

    const [formData, setFormData] = useState<Omit<Aircraft, 'id'>>({
        model: selectedAircraft?.model ?? '', 
        registration: selectedAircraft?.registration ?? '', 
        serial_number: selectedAircraft?.serial_number ?? '',
    });

    useEffect(() => {
        setFormData({
            model: selectedAircraft?.model ?? '', 
            registration: selectedAircraft?.registration ?? '', 
            serial_number: selectedAircraft?.serial_number ?? '',
        });
    }, [selectedAircraft]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName='Edit aircraft' />
            <div className='flex flex-col gap-10 max-w-xl'>
                <div className='rounded-sm border border-stroke bg-white shadow-default'>
                    {isLoading && (
                        <div className='-mt-40'>
                            <LoadingSpinner />
                        </div>
                    )}

                    {(!isLoading && selectedAircraft) && (<AircraftForm
                        aircraftToEdit={selectedAircraft}
                        submitButtonText="Update"
                        handleSubmit={() => updateAircraft(selectedAircraft.id, formData)}
                        formData={formData}
                        setFormData={setFormData}
                    />)}
                </div>
            </div>
            {error && <DangerAlert message={error.message} />}
        </DefaultLayout>
    );
}

export default EditAircraft;