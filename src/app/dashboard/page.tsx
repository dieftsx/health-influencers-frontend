// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { InfluencerTable } from '@/components/shared/InfluencerTable';
import { VerificationPanel } from '@/components/shared/VerificationPanel';
import { SearchConfig } from '@/components/shared/SearchConfig';

export default function DashboardPage() {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const fetchInfluencers = async () => {
    try {
      const response = await fetch('/api/influencers');
      const data = await response.json();
      setInfluencers(data);
    } catch (error) {
      console.error('Error fetching influencers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Health Influencers Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          {/* Add quick stats components */}
        </Card>
        
        <Card className="p-4">
          <SearchConfig />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-4">
          <InfluencerTable data={influencers} loading={loading} />
        </Card>

        <Card className="p-4">
          <VerificationPanel />
        </Card>
      </div>
    </div>
  );
}
