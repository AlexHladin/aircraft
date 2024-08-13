import { useState } from "react";
import DangerAlert from "../../components/alerts/Danger";
import { MaintenanceCompany, useMaintenanceCompanies } from "../../hooks/use-maintenance-company";
import Breadcrumb from "../../layout/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import LoadingSpinner from "../../layout/LoadingSpinner";
import MaintenanceCompanyForm from "./MaintenanceCompanyForm";

const CreateMaintenanceCompany = () => {
    const { isLoading, error, createMaintenanceCompany } = useMaintenanceCompanies();
    const [formData, setFormData] = useState<Omit<MaintenanceCompany, 'id'>>({
        name: '', 
        contact: '', 
        specialization: '',
    });
    
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Create maintenance company' />
            <div className='flex flex-col gap-10 max-w-xl'>
                <div className='rounded-sm border border-stroke bg-white shadow-default'>
                    {isLoading && (
                        <div className='-mt-40'>
                            <LoadingSpinner />
                        </div>
                    )}

                    {!isLoading && (<MaintenanceCompanyForm
                        handleSubmit={() => createMaintenanceCompany(formData)}
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

export default CreateMaintenanceCompany;