'use client';

import { useRouter } from 'next/navigation';

export const goToMembershipWithReturn = (
  router: ReturnType<typeof useRouter>
) => {
  const currentPath = window.location.pathname;
  localStorage.setItem('previousPath', currentPath);
  router.push(`/memberships?from=${currentPath}`);
};


