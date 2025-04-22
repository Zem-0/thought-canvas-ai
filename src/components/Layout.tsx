
import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
}

const Layout = ({ children, showNavbar = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
