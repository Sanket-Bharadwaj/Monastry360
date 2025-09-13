import React, { useState } from 'react';
import { MapPin, Star, Navigation, Hotel, Camera, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation } from '@/hooks/useLocation';
import { useNearbyRecommendations } from '@/hooks/useNearbyRecommendations';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LocationRecommendations: React.FC = () => {
  const { location, error, loading, requestLocation, hasPermission } = useLocation();
  const { recommendations, loading: recommendationsLoading, error: recommendationsError, fetchRecommendations } = useNearbyRecommendations();
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleLocationRequest = () => {
    requestLocation();
  };

  React.useEffect(() => {
    if (location && !showRecommendations) {
      fetchRecommendations(location.latitude, location.longitude);
      setShowRecommendations(true);
    }
  }, [location]);

  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 pt-8 space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary font-serif">Discover Nearby Places</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Allow location access to discover amazing hotels and attractions near you in Sikkim
        </p>
      </div>

      {/* Location Request Section */}
      {!location && (
        <Card className="border-2 border-dashed border-border">
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <MapPin className="h-16 w-16 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Enable Location Access</h3>
            <p className="text-muted-foreground text-center max-w-md">
              We need your location to show you the best hotels and attractions nearby
            </p>
            <Button 
              onClick={handleLocationRequest} 
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Getting Location...
                </>
              ) : (
                <>
                  <Navigation className="mr-2 h-4 w-4" />
                  Allow Location Access
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            {error.message}. Please enable location access in your browser settings and try again.
          </AlertDescription>
        </Alert>
      )}

      {/* Current Location Display */}
      {location && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="flex items-center space-x-4 py-4">
            <div className="bg-green-500 rounded-full p-2">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Location Detected</h4>
              <p className="text-green-700 text-sm">
                Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations Loading */}
      {recommendationsLoading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-600">Finding the best places near you...</p>
          </CardContent>
        </Card>
      )}

      {/* Recommendations Display */}
      {showRecommendations && !recommendationsLoading && (
        <Tabs defaultValue="hotels" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hotels" className="flex items-center space-x-2">
              <Hotel className="h-4 w-4" />
              <span>Hotels ({recommendations.hotels.length})</span>
            </TabsTrigger>
            <TabsTrigger value="attractions" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Attractions ({recommendations.attractions.length})</span>
            </TabsTrigger>
          </TabsList>

          {/* Hotels Tab */}
          <TabsContent value="hotels" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.hotels.map((hotel) => (
                <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{hotel.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{hotel.address}</p>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {formatDistance(hotel.distance)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{hotel.rating}</span>
                      </div>
                      <span className="font-semibold text-green-600">{hotel.price}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {hotel.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Attractions Tab */}
          <TabsContent value="attractions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.attractions.map((attraction) => (
                <Card key={attraction.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{attraction.name}</CardTitle>
                        <Badge variant="outline" className="mt-1 w-fit">
                          {attraction.type}
                        </Badge>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {formatDistance(attraction.distance)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{attraction.rating}</span>
                      <span className="text-sm text-gray-600">• {attraction.address}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {attraction.description}
                    </p>
                    <Button className="w-full" variant="outline">
                      <Navigation className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Error in Recommendations */}
      {recommendationsError && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            {recommendationsError}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default LocationRecommendations;