import Breadcrumb from '../../layout/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import MaintenanceCompanyTable from './MaintenanceCompanyTable';

const MaintenanceCompanyDashboardPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Maintenance companies' />
        <div className='flex flex-col gap-10'>
            <MaintenanceCompanyTable />
        </div>
    </DefaultLayout>
  );
};

export default MaintenanceCompanyDashboardPage;