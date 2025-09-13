import React from 'react';
import LocationRecommendations from '@/components/LocationRecommendations';
import { Layout } from '@/components/Layout';

const NearbyPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-muted/20">
        <LocationRecommendations />
      </div>
    </Layout>
  );
};

export default NearbyPage;