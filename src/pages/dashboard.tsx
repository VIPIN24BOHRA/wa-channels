'use client';

import DashboardPage from '@/components/dashboard/dashboard';

export default function Home() {
  return (
    <div className="flex">
      <div className="grow">
        <DashboardPage />
      </div>
    </div>
  );
}
