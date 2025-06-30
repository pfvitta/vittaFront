// app/auth/login/page.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const LoginRedirect = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard/user';
    const encoded = encodeURIComponent(callbackUrl);
    window.location.href = `http://localhost:4000/auth/login?callbackUrl=${encoded}`;
  }, [searchParams]);

  return <p>Redirigiendo al login...</p>;
};

export default LoginRedirect;

