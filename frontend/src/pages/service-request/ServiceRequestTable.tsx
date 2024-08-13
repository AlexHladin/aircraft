import { useCallback, useState } from 'react';
import LoadingSpinner from '../../layout/LoadingSpinner';
import DropdownEditDelete from '../../components/DropdownEditDelete';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal';
import { ServiceRequest, useServiceRequests } from '../../hooks/use-service-request';
import { formatDate } from '../../utils';

const ServiceRequestTable = () => {
  const { serviceRequests, isLoading, deleteServiceRequest } = useServiceRequests();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [serviceRequestIdToDelete, setServiceRequestIdToDelete] = useState<number | null>(null);

  const onDelete = useCallback(() => {
    if (serviceRequestIdToDelete) {
      deleteServiceRequest(serviceRequestIdToDelete);
      setShowModal(false);
    }
  }, [serviceRequestIdToDelete, deleteServiceRequest, setShowModal]);

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex w-1/4 ml-auto">
      <button 
          onClick={() => navigate('/service-request/create')}
          className='flex w-full justify-center rounded bg-primary p-3 font-medium text-white'>
          Create
        </button>
      </div>

      <div className='rounded-sm border border-stroke bg-white shadow-default'>
        <div className='grid grid-cols-12 border-t-4 border-stroke py-4.5 px-4 md:px-6 '>
          <div className='col-span-1 flex items-center'>
            <p className='font-medium'>Id</p>
          </div>
          <div className='col-span-2 flex items-center'>
            <p className='font-medium'>Aircraft</p>
          </div>          
          <div className='col-span-2 flex items-center'>
            <p className='font-medium'>Maintenance company</p>
          </div>
          <div className='col-span-1 flex items-center'>
            <p className='font-medium'>Priority</p>
          </div>
          <div className='col-span-1 flex items-center'>
            <p className='font-medium'>Status</p>
          </div>
          <div className='col-span-2 flex items-center'>
            <p className='font-medium'>Start date</p>
          </div>
          <div className='col-span-2 flex items-center'>
            <p className='font-medium'>Due date</p>
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

        {serviceRequests?.map((serviceRequest: ServiceRequest) => (
            <div
              key={serviceRequest.id}
              className='grid grid-cols-12 gap-4 border-t border-stroke py-4.5 px-4 md:px-6'
            >
              <div className='col-span-1 items-center'>
                <p className='text-sm text-black'>{serviceRequest.id}</p>
              </div>  

              <div className='col-span-2 items-center'>
                <p className='text-sm text-black'>{serviceRequest.aircraft.model}</p>
              </div>     
              
              <div className='col-span-2 items-center'>
                <p className='text-sm text-black'>{serviceRequest.maintenance_company.name}</p>
              </div>              
              
              <div className='col-span-1 items-center'>
                <p className='text-sm text-black'>{serviceRequest.priority}</p>
              </div>

              <div className='col-span-1 items-center'>
                <p className='text-sm text-black'>{serviceRequest.status}</p>
              </div>
              
              <div className='col-span-2 items-center'>
                <p className='text-sm text-black'>{formatDate(serviceRequest.start_date)}</p>
              </div> 

              <div className='col-span-2 items-center'>
                <p className='text-sm text-black'>{formatDate(serviceRequest.due_date)}</p>
              </div>
              
              <div className='col-span-1 ml-auto'>
                <DropdownEditDelete
                  onEdit={() => navigate(`/service-request/${serviceRequest.id}/edit`)}
                  onDelete={() => {
                    setShowModal(true);
                    setServiceRequestIdToDelete(serviceRequest.id);
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

export default ServiceRequestTable;