import { useState, useEffect } from 'react';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface LocationError {
  code: number;
  message: string;
}

interface UseLocationReturn {
  location: LocationCoords | null;
  error: LocationError | null;
  loading: boolean;
  requestLocation: () => void;
  clearLocation: () => void;
  hasPermission: boolean;
}

export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationCoords | null>(() => {
    // Check localStorage for saved location
    const savedLocation = localStorage.getItem('userLocation');
    return savedLocation ? JSON.parse(savedLocation) : null;
  });
  const [error, setError] = useState<LocationError | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(() => {
    // Check localStorage for saved permission state
    return localStorage.getItem('locationPermissionGranted') === 'true';
  });

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported by this browser.'
      });
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        
        setLocation(newLocation);
        setHasPermission(true);
        setLoading(false);
        
        // Save to localStorage
        localStorage.setItem('userLocation', JSON.stringify(newLocation));
        localStorage.setItem('locationPermissionGranted', 'true');
        localStorage.setItem('locationTimestamp', Date.now().toString());
      },
      (error) => {
        setError({
          code: error.code,
          message: error.message
        });
        setHasPermission(false);
        setLoading(false);
        
        // Clear localStorage on error
        localStorage.removeItem('userLocation');
        localStorage.removeItem('locationPermissionGranted');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      }
    );
  };

  const clearLocation = () => {
    setLocation(null);
    setHasPermission(false);
    setError(null);
    
    // Clear localStorage
    localStorage.removeItem('userLocation');
    localStorage.removeItem('locationPermissionGranted');
    localStorage.removeItem('locationTimestamp');
  };

  useEffect(() => {
    // Check if we have saved location and it's not too old (1 hour)
    const savedTimestamp = localStorage.getItem('locationTimestamp');
    const oneHour = 60 * 60 * 1000;
    
    if (savedTimestamp && (Date.now() - parseInt(savedTimestamp)) < oneHour) {
      // Use saved location if it's recent
      return;
    }

    // Check browser permission state
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((permission) => {
        if (permission.state === 'granted' && !location) {
          // Auto-request location if permission is granted but we don't have location
          requestLocation();
        }
      });
    }
  }, [location]);

  return {
    location,
    error,
    loading,
    requestLocation,
    clearLocation,
    hasPermission
  };
};