import Breadcrumb from "../../layout/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import LoadingSpinner from "../../layout/LoadingSpinner";
import { Priority, Status, UpdateServiceRequest, useServiceRequests } from "../../hooks/use-service-request";
import ServiceRequestForm from "./ServiceRequestForm";
import { useAircrafts } from "../../hooks/use-aircrafts";
import { useMaintenanceCompanies } from "../../hooks/use-maintenance-company";
import { formatDate } from "../../utils";
import { useEffect, useState } from "react";
import DangerAlert from "../../components/alerts/Danger";

const EditServiceRequest = () => {
    const { isLoading, error, selectedServiceRequest, updateServiceRequest } = useServiceRequests();
    const { aircrafts } = useAircrafts();
    const { maintenanceCompanies } = useMaintenanceCompanies();

    const [formData, setFormData] = useState<UpdateServiceRequest>({
        aircraft_id: 0,
        maintenance_company_id: 0,
        description: selectedServiceRequest?.description ?? '', 
        priority: selectedServiceRequest?.priority ?? Priority.LOW, 
        status: selectedServiceRequest?.status ?? Status.PENDING,
        start_date: formatDate(selectedServiceRequest?.start_date ?? new Date().toISOString()),
        due_date: formatDate(selectedServiceRequest?.due_date ?? new Date().toISOString()),
    });

    useEffect(() => {
        if (!aircrafts.length || !maintenanceCompanies.length) {
            return;
        }

        setFormData({
            aircraft_id: selectedServiceRequest?.aircraft_id ?? aircrafts[0].id,
            maintenance_company_id: selectedServiceRequest?.maintenance_company_id ?? maintenanceCompanies[0].id,
            description: selectedServiceRequest?.description ?? '', 
            priority: selectedServiceRequest?.priority ?? Priority.LOW, 
            status: selectedServiceRequest?.status ?? Status.PENDING,
            start_date: formatDate(selectedServiceRequest?.start_date ?? new Date().toISOString()),
            due_date: formatDate(selectedServiceRequest?.due_date ?? new Date().toISOString()),
        });
    }, [selectedServiceRequest, maintenanceCompanies, aircrafts]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit service request" />
            <div className="flex flex-col gap-10 max-w-xl">
                <div className="rounded-sm border border-stroke bg-white shadow-default">
                    {isLoading && (
                        <div className='-mt-40'>
                            <LoadingSpinner />
                        </div>
                    )}

                    {(!isLoading && selectedServiceRequest) && (<ServiceRequestForm
                        submitButtonText="Update"
                        handleSubmit={() => updateServiceRequest(selectedServiceRequest.id, formData)}
                        aircrafts={aircrafts}
                        maintenanceCompanies={maintenanceCompanies}
                        formData={formData}
                        setFormData={setFormData}
                    />)}
                </div>
            </div>
            {error && <DangerAlert message={error.message} />}
        </DefaultLayout>
    );
}

export default EditServiceRequest;