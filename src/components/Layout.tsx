
import { ReactNode } from 'react';
import Navbar from './Navbar';
import { AuthProvider } from '@/hooks/useAuth';

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
}

const Layout = ({ children, showNavbar = true }: LayoutProps) => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {showNavbar && <Navbar />}
        <main className="flex-grow">{children}</main>
      </div>
    </AuthProvider>
  );
};

export default Layout;
