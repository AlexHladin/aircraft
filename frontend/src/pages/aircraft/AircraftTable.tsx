import { useCallback, useState } from 'react';
import LoadingSpinner from '../../layout/LoadingSpinner';
import DropdownEditDelete from '../../components/DropdownEditDelete';
import { Aircraft, useAircrafts } from '../../hooks/use-aircrafts';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal';

const AircraftTable = () => {
  const { aircrafts, isLoading, deleteAircraft } = useAircrafts();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [aircraftIdToDelete, setAircraftIdToDelete] = useState<number | null>(null);

  const onDelete = useCallback(() => {
    if (aircraftIdToDelete) {
      deleteAircraft(aircraftIdToDelete);
      setShowModal(false);
    }
  }, [aircraftIdToDelete, deleteAircraft, setShowModal]);

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex w-1/4 ml-auto">
        <button 
          onClick={() => navigate('/aircraft/create')}
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
            <p className='font-medium'>Model</p>
          </div>
          <div className='col-span-3 flex items-center'>
            <p className='font-medium'>Registration</p>
          </div>
          <div className='col-span-3 flex items-center'>
            <p className='font-medium'>Serial number</p>
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

        {aircrafts?.map((aircraft: Aircraft) => (
            <div
              key={aircraft.id}
              className='grid grid-cols-12 gap-4 border-t border-stroke py-4.5 px-4 md:px-6'
            >
              <div className='col-span-2 items-center'>
                <p className='text-sm text-black'>{aircraft.id}</p>
              </div>              
              
              <div className='col-span-3 items-center'>
                <p className='text-sm text-black'>{aircraft.model}</p>
              </div>

              <div className='col-span-3 items-center'>
                <p className='text-sm text-black'>{aircraft.registration}</p>
              </div>
              <div className='col-span-3 items-center'>
                <p className='text-sm text-black'>{aircraft.serial_number}</p>
              </div>
              <div className='col-span-1 ml-auto'>
                <DropdownEditDelete
                  onEdit={() => navigate(`/aircraft/${aircraft.id}/edit`)}
                  onDelete={() => {
                    setShowModal(true);
                    setAircraftIdToDelete(aircraft.id);
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

export default AircraftTable;