import { ReactNode, FC } from 'react';

import Sidebar from './Sidebar';

interface Props {
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar />

        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          <main>
            <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;