import { useState, useEffect } from 'react';

interface Hotel {
  id: string;
  name: string;
  rating: number;
  price: string;
  distance: number;
  address: string;
  image: string;
  amenities: string[];
}

interface Attraction {
  id: string;
  name: string;
  type: string;
  rating: number;
  distance: number;
  address: string;
  image: string;
  description: string;
}

interface NearbyRecommendations {
  hotels: Hotel[];
  attractions: Attraction[];
}

interface UseNearbyRecommendationsReturn {
  recommendations: NearbyRecommendations;
  loading: boolean;
  error: string | null;
  fetchRecommendations: (latitude: number, longitude: number) => void;
}

export const useNearbyRecommendations = (): UseNearbyRecommendationsReturn => {
  const [recommendations, setRecommendations] = useState<NearbyRecommendations>({
    hotels: [],
    attractions: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration (in real app, this would come from Google Places API)
  const generateMockRecommendations = (lat: number, lng: number): NearbyRecommendations => {
    const mockHotels: Hotel[] = [
      {
        id: '1',
        name: 'Hotel Tibet',
        rating: 4.2,
        price: '₹2,500/night',
        distance: 1.2,
        address: 'MG Road, Gangtok',
        image: '/images/hotels/hotel-tibet.jpg',
        amenities: ['WiFi', 'Restaurant', 'Mountain View']
      },
      {
        id: '2',
        name: 'The Elgin Nor-Khill',
        rating: 4.5,
        price: '₹8,500/night',
        distance: 2.1,
        address: 'The Ridge, Gangtok',
        image: '/images/hotels/elgin-nor-khill.jpg',
        amenities: ['Spa', 'Restaurant', 'Heritage Property', 'Garden']
      },
      {
        id: '3',
        name: 'Summit Norbiling Resort',
        rating: 4.1,
        price: '₹3,200/night',
        distance: 3.5,
        address: 'Upper Syari, Gangtok',
        image: '/images/hotels/summit-norbiling.jpg',
        amenities: ['WiFi', 'Restaurant', 'Parking', 'Spa']
      },
      {
        id: '4',
        name: 'Hotel Sonam Delek',
        rating: 3.8,
        price: '₹1,800/night',
        distance: 0.8,
        address: 'Tibet Road, Gangtok',
        image: '/images/hotels/sonam-delek.jpg',
        amenities: ['WiFi', 'Restaurant', 'Travel Desk']
      }
    ];

    const mockAttractions: Attraction[] = [
      {
        id: '1',
        name: 'Tsomgo Lake',
        type: 'Natural Wonder',
        rating: 4.6,
        distance: 38.0,
        address: 'East Sikkim',
        image: '/images/attractions/tsomgo-lake.jpg',
        description: 'Sacred glacial lake surrounded by snow-capped mountains'
      },
      {
        id: '2',
        name: 'Nathula Pass',
        type: 'Historical Site',
        rating: 4.4,
        distance: 54.0,
        address: 'Indo-China Border',
        image: '/images/attractions/nathula-pass.jpg',
        description: 'Historic trade route between India and Tibet'
      },
      {
        id: '3',
        name: 'Ganesh Tok',
        type: 'Viewpoint',
        rating: 4.1,
        distance: 4.2,
        address: 'Gangtok',
        image: '/images/attractions/ganesh-tok.jpg',
        description: 'Temple with panoramic views of Gangtok and Kanchenjunga'
      },
      {
        id: '4',
        name: 'MG Marg',
        type: 'Shopping & Entertainment',
        rating: 4.3,
        distance: 1.0,
        address: 'Gangtok',
        image: '/images/attractions/mg-marg.jpg',
        description: 'Pedestrian-only shopping street with cafes and shops'
      },
      {
        id: '5',
        name: 'Hanuman Tok',
        type: 'Religious Site',
        rating: 4.2,
        distance: 7.8,
        address: 'Gangtok',
        image: '/images/attractions/hanuman-tok.jpg',
        description: 'Temple dedicated to Lord Hanuman with scenic views'
      }
    ];

    return {
      hotels: mockHotels,
      attractions: mockAttractions
    };
  };

  const fetchRecommendations = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData = generateMockRecommendations(latitude, longitude);
      setRecommendations(mockData);
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    recommendations,
    loading,
    error,
    fetchRecommendations
  };
};