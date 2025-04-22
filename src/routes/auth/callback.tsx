import { useEffect } from 'react';
import { BASE_URL } from '@/lib/constants';

export default function AuthCallback() {
  useEffect(() => {
    // Force redirect using window.location if we have an access token
    if (window.location.hash.includes('access_token')) {
      window.location.href = `${BASE_URL}/dashboard`;
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
} 