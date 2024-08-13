import { useEffect, useState } from "react";
import { useAircrafts } from "../../hooks/use-aircrafts";
import { useMaintenanceCompanies } from "../../hooks/use-maintenance-company";
import { Priority, Status, UpdateServiceRequest, useServiceRequests } from "../../hooks/use-service-request";
import Breadcrumb from "../../layout/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import LoadingSpinner from "../../layout/LoadingSpinner";
import ServiceRequestForm from "./ServiceRequestForm";
import { formatDate } from "../../utils";
import DangerAlert from "../../components/alerts/Danger";

const CreateServiceRequeset = () => {
    const { aircrafts } = useAircrafts();
    const { maintenanceCompanies } = useMaintenanceCompanies();
    const { isLoading, error, createserviceRequest } = useServiceRequests();

    const [formData, setFormData] = useState<UpdateServiceRequest>({
        aircraft_id: 0,
        maintenance_company_id: 0,
        description: '', 
        priority: Priority.LOW, 
        status: Status.PENDING,
        start_date: formatDate(new Date().toISOString()),
        due_date: formatDate(new Date().toISOString()),
    });

    useEffect(() => {
        if (!aircrafts.length || !maintenanceCompanies.length) {
            return;
        }
        setFormData({
            aircraft_id: aircrafts[0].id,
            maintenance_company_id: maintenanceCompanies[0].id,
            description: '', 
            priority: Priority.LOW, 
            status: Status.PENDING,
            start_date: formatDate(new Date().toISOString()),
            due_date: formatDate(new Date().toISOString()),
        })
    }, [aircrafts, maintenanceCompanies]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName='Create service request' />
            <div className='flex flex-col gap-10 max-w-xl'>
                <div className='rounded-sm border border-stroke bg-white shadow-default'>
                    {isLoading && (
                        <div className='-mt-40'>
                            <LoadingSpinner />
                        </div>
                    )}

                    {!isLoading && (<ServiceRequestForm
                        handleSubmit={createserviceRequest}
                        aircrafts={aircrafts}
                        maintenanceCompanies={maintenanceCompanies}
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

export default CreateServiceRequeset;