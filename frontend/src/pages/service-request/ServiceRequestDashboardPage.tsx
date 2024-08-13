import Breadcrumb from '../../layout/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import ServiceRequestTable from './ServiceRequestTable';

const ServiceRequestDashboardPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Service requests' />
        <div className='flex flex-col gap-10'>
            <ServiceRequestTable />
        </div>
    </DefaultLayout>
  );
};

export default ServiceRequestDashboardPage;