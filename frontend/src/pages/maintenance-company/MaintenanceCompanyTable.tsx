import { useCallback, useState } from 'react';
import LoadingSpinner from '../../layout/LoadingSpinner';
import DropdownEditDelete from '../../components/DropdownEditDelete';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal';
import { MaintenanceCompany, useMaintenanceCompanies } from '../../hooks/use-maintenance-company';

const MaintenanceCompanyTable = () => {
  const { maintenanceCompanies, isLoading, deleteMaintenanceCompany } = useMaintenanceCompanies();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [companyIdToDelete, setCompanyIdToDelete] = useState<number | null>(null);

  const onDelete = useCallback(() => {
    if (companyIdToDelete) {
      deleteMaintenanceCompany(companyIdToDelete);
      setShowModal(false);
    }
  }, [companyIdToDelete, deleteMaintenanceCompany, setShowModal]);

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex w-1/4 ml-auto">
      <button 
          onClick={() => navigate('/maintenance-company/create')}
          className='flex w-full justify-center rounded bg-primary p-3 font-medium text-white'>
          Create
        </button>
      </div>

      <div className='rounded-sm border border-stroke bg-white shadow-default'>
        <div className='grid grid-cols-12 border-t-4 border-stroke py-4.5 px-4 md:px-6 '>
          <div className='col-span-2 flex items-center'>
            <p className='font-medium'>Id</p>
          </div>
          <div className='col-span-3 flex items-center'>
            <p className='font-medium'>Name</p>
          </div>
          <div className='col-span-3 flex items-center'>
            <p className='font-medium'>Contact</p>
          </div>
          <div className='col-span-3 flex items-center'>
            <p className='font-medium'>Specialization</p>
          </div>
          <div className='col-span-1 flex items-center'>
            <p className='font-medium'></p>
          </div>
        </div>
        
        {isLoading && (
          <div className='-mt-40'>
            <LoadingSpinner />
          </div>
        )}

        {maintenanceCompanies?.map((company: MaintenanceCompany) => (
            <div
              key={company.id}
              className='grid grid-cols-12 gap-4 border-t border-stroke py-4.5 px-4 md:px-6'
            >
              <div className='col-span-2 items-center'>
                <p className='text-sm text-black'>{company.id}</p>
              </div>              
              
              <div className='col-span-3 items-center'>
                <p className='text-sm text-black'>{company.name}</p>
              </div>

              <div className='col-span-3 items-center'>
                <p className='text-sm text-black'>{company.contact}</p>
              </div>
              <div className='col-span-3 items-center'>
                <p className='text-sm text-black'>{company.specialization}</p>
              </div>
              <div className='col-span-1 ml-auto'>
                <DropdownEditDelete
                  onEdit={() => navigate(`/maintenance-company/${company.id}/edit`)}
                  onDelete={() => {
                    setShowModal(true);
                    setCompanyIdToDelete(company.id);
                  }}
                />
              </div>
            </div>
          ))}
      </div>

      {showModal && (
        <DeleteModal
          onClose={() => setShowModal(false)} 
          onDelete={onDelete} 
        />
      )}
    </div>
  );
};

export default MaintenanceCompanyTable;