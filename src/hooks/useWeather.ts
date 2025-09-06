import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
}

export function useWeather(lat: number, lon: number) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lon) {
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // For now, we'll use mock data since we don't have the backend API running
        // In production, this would call: `/api/weather?lat=${lat}&lon=${lon}`
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock weather data based on elevation and location
        const mockWeather: WeatherData = {
          temperature: Math.round(15 - (lat - 27) * 10 + Math.random() * 10),
          condition: Math.random() > 0.5 ? 'Partly Cloudy' : 'Clear',
          windSpeed: Math.round(5 + Math.random() * 15),
          humidity: Math.round(60 + Math.random() * 30),
        };
        
        setWeather(mockWeather);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { weather, loading, error };
}