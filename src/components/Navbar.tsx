import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { Menu, Search, Plus } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">ThoughtCanvas</span>
            </Link>
            
            {user && (
              <div className="hidden md:ml-10 md:flex md:space-x-4">
                <Link to="/dashboard" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary">
                  Dashboard
                </Link>
                <Link to="/summaries" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary">
                  Summaries
                </Link>
              </div>
            )}
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="outline" size="icon" className="hidden md:flex">
                  <Search className="h-4 w-4" />
                </Button>
                
                <Button asChild variant="default" size="sm" className="hidden md:flex gap-2">
                  <Link to="/dashboard/new">
                    <Plus className="h-4 w-4" /> New Note
                  </Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="font-medium">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex md:space-x-4">
                <Button variant="ghost" asChild>
                  <Link to="/auth?mode=signin">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth?mode=signup">Sign up</Link>
                </Button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <Link 
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/dashboard/summaries"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Summaries
                </Link>
                <Link 
                  to="/dashboard/new"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  New Note
                </Link>
                <button 
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/auth?mode=signin"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link 
                  to="/auth?mode=signup"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
