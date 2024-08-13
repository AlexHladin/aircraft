import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../cn';

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  const menuItems = [
    {
        label: 'Aircraft',
        url: '/aircraft',
    },
    {
        label: 'Maintenance company',
        url: '/maintenance-company',
    },
    {
        label: 'Service request',
        url: '/service-request',
    }
  ].map((item) => ({ ...item, isActive: pathname === item.url }));

  return (
    <aside className='absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-gray-800 duration-300 ease-linear lg:static'>
      <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
        <nav className='py-4 px-2'>
            <ul className='mb-6 flex flex-col gap-1.5'>
                {menuItems.map((item, key) => (
                  <li key={key}>
                    <NavLink 
                        to={item.url} 
                        className={cn(
                                'group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-gray-700',
                                {
                                    'bg-gray-700': item.isActive,
                                }
                            )}
                    >{item.label}</NavLink>
                  </li>
                ))}
            </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;