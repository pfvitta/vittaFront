'use client';

import dynamic from 'next/dynamic';

const Memberships = dynamic(() => import('@/components/Memberships/Memberships'), { ssr: false });

export default function MembershipsPage() {
  return <Memberships />;
}
