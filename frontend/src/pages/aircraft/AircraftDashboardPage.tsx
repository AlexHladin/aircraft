import AircraftTable from './AircraftTable';
import Breadcrumb from '../../layout/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const AircraftDashboardPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Aircrafts' />
        <div className='flex flex-col gap-10'>
            <AircraftTable />
        </div>
    </DefaultLayout>
  );
};

export default AircraftDashboardPage;