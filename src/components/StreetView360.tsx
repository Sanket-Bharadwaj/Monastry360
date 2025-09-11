import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Eye, EyeOff, RotateCcw } from 'lucide-react';

interface StreetView360Props {
  latitude: number;
  longitude: number;
  name: string;
  className?: string;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Type declaration for Google Maps (fallback if types aren't available)
declare global {
  interface Window {
    google: any;
  }
}

export default function StreetView360({ latitude, longitude, name, className }: StreetView360Props) {
  const streetViewRef = useRef<HTMLDivElement>(null);
  const [streetView, setStreetView] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const initializeStreetView = async () => {
      if (!GOOGLE_MAPS_API_KEY) {
        setError('Google Maps API key not configured');
        setIsLoading(false);
        return;
      }

      try {
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['geometry']
        });

        await loader.load();

        if (streetViewRef.current && window.google) {
          const streetViewPanorama = new window.google.maps.StreetViewPanorama(
            streetViewRef.current,
            {
              position: { lat: latitude, lng: longitude },
              pov: { heading: 0, pitch: 0 },
              zoom: 1,
              addressControl: false,
              linksControl: true,
              panControl: true,
              enableCloseButton: false,
              fullscreenControl: true,
              motionTracking: true,
              motionTrackingControl: true,
              showRoadLabels: false,
            }
          );

          // Check if Street View is available at this location
          const streetViewService = new window.google.maps.StreetViewService();
          streetViewService.getPanorama(
            {
              location: { lat: latitude, lng: longitude },
              radius: 1000, // Search within 1km radius
              source: window.google.maps.StreetViewSource.OUTDOOR
            },
            (data: any, status: any) => {
              if (status === window.google.maps.StreetViewStatus.OK && data) {
                streetViewPanorama.setPano(data.location?.pano || '');
                setStreetView(streetViewPanorama);
                setError(null);
              } else {
                setError('Street View not available for this location');
              }
              setIsLoading(false);
            }
          );
        }
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Street View');
        setIsLoading(false);
      }
    };

    if (isVisible) {
      initializeStreetView();
    }
  }, [latitude, longitude, isVisible]);

  const resetView = () => {
    if (streetView) {
      streetView.setPov({ heading: 0, pitch: 0 });
      streetView.setZoom(1);
    }
  };

  const toggleStreetView = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              360° Street View
            </span>
            <Button onClick={toggleStreetView} variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Load Street View
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Explore the surroundings of {name} with Google Street View
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            360° Street View - {name}
          </span>
          <div className="flex gap-2">
            <Button onClick={resetView} variant="outline" size="sm" disabled={!streetView}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset View
            </Button>
            <Button onClick={toggleStreetView} variant="outline" size="sm">
              <EyeOff className="h-4 w-4 mr-2" />
              Hide
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading && (
          <div className="h-96 flex items-center justify-center bg-muted">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading Street View...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="h-96 flex items-center justify-center bg-muted">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">{error}</p>
              <p className="text-xs text-muted-foreground mt-2">
                This location might be in a remote area where Street View is not available.
              </p>
            </div>
          </div>
        )}
        <div
          ref={streetViewRef}
          className="h-96 w-full"
          style={{ display: isLoading || error ? 'none' : 'block' }}
        />
        {streetView && (
          <div className="p-4 bg-muted/50 text-xs text-muted-foreground">
            <p>Use mouse to look around • Scroll to zoom • Click arrows to move</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
