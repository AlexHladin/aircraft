import Breadcrumb from "../../layout/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import LoadingSpinner from "../../layout/LoadingSpinner";
import { MaintenanceCompany, useMaintenanceCompanies } from "../../hooks/use-maintenance-company";
import MaintenanceCompanyForm from "./MaintenanceCompanyForm";
import { useEffect, useState } from "react";
import DangerAlert from "../../components/alerts/Danger";

const EditMaintenanceCompany = () => {
    const { isLoading, error, selectedMaintenanceCompany, updateMaintenanceCompany } = useMaintenanceCompanies();

    const [formData, setFormData] = useState<Omit<MaintenanceCompany, 'id'>>({
        name: selectedMaintenanceCompany?.name ?? '', 
        contact: selectedMaintenanceCompany?.contact ?? '', 
        specialization: selectedMaintenanceCompany?.specialization ?? '',
    });

    useEffect(() => {
        setFormData({
            name: selectedMaintenanceCompany?.name ?? '', 
            contact: selectedMaintenanceCompany?.contact ?? '', 
            specialization: selectedMaintenanceCompany?.specialization ?? '',
        });
    }, [selectedMaintenanceCompany]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName='Edit maintenance company' />
            <div className='flex flex-col gap-10 max-w-xl'>
                <div className='rounded-sm border border-stroke bg-white shadow-default'>
                    {isLoading && (
                        <div className='-mt-40'>
                            <LoadingSpinner />
                        </div>
                    )}

                    {(!isLoading && selectedMaintenanceCompany) && (<MaintenanceCompanyForm
                        maintenanceCompanyToEdit={selectedMaintenanceCompany}
                        submitButtonText="Update"
                        handleSubmit={() => updateMaintenanceCompany(selectedMaintenanceCompany.id, formData)}
                        formData={formData}
                        setFormData={setFormData}
                    />)}
                </div>
            </div>
            {error && <DangerAlert message={error.message} />}
        </DefaultLayout>
    );
}

export default EditMaintenanceCompany;