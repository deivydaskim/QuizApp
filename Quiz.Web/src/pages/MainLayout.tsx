import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <>
      <header className="flex h-14 items-center border-b">Header</header>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
