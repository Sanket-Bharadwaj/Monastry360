import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Filter, Navigation } from 'lucide-react';
import { monasteries, getMonasteriesByDistrict } from '@/data/monasteries';
import { Layout } from '@/components/Layout';
import { RealSikkimMap } from '@/components/RealSikkimMap';
import { useLocation } from '@/hooks/useLocation';

const districts = ['All', 'East', 'South', 'West', 'North'] as const;

export default function Map() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedMonastery, setSelectedMonastery] = useState<any>(null);
  const { location, error, loading, requestLocation, clearLocation } = useLocation();

  const filteredMonasteries = selectedDistrict === 'All' 
    ? monasteries 
    : getMonasteriesByDistrict(selectedDistrict);

  return (
    <Layout>
      <div className="page-wrapper py-8 pt-12 bg-gradient-to-br from-background via-background to-muted/10 min-h-screen">
        <div className="container-responsive">
          <div className="text-center mb-8 mt-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Sikkim Monastery Map
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore the sacred monasteries across Sikkim's four districts. Interact with the real map
              to discover these ancient centers of Buddhist wisdom nestled in the Himalayas.
            </p>
            
            {/* Location Button */}
            <div className="mt-6 flex justify-center gap-3">
              <Button
                onClick={requestLocation}
                disabled={loading}
                variant="outline"
                className="flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                    Getting Location...
                  </>
                ) : location ? (
                  <>
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span>Location Enabled</span>
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4" />
                    <span>Show My Location on Map</span>
                  </>
                )}
              </Button>
              
              {location && (
                <Button
                  onClick={clearLocation}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  Clear Location
                </Button>
              )}
            </div>

            {/* Location Status */}
            {error && (
              <Alert className="mt-4 max-w-md mx-auto">
                <AlertDescription className="text-center">
                  {error.message}. Enable location access to see your position on the map.
                </AlertDescription>
              </Alert>
            )}

            {location && (
              <div className="mt-4 text-sm text-muted-foreground">
                📍 Your location will appear as a blue ping on the map below
              </div>
            )}
          </div>

          {/* District Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 p-4 bg-card/50 rounded-lg border border-border/50 backdrop-blur-sm">
            <Filter className="h-4 w-4 text-muted-foreground mt-2 mr-2" />
            {districts.map((district) => (
              <Button
                key={district}
                variant={selectedDistrict === district ? "default" : "outline"}
                onClick={() => setSelectedDistrict(district)}
                size="sm"
                className="touch-target shadow-sm"
              >
                {district} {district !== 'All' && `(${getMonasteriesByDistrict(district).length})`}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Real Map */}
            <div className="order-2 lg:order-1">
              <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
                <div className="p-6">
                  <div className="aspect-[4/3] min-h-[400px] bg-muted/30 rounded-lg overflow-hidden shadow-inner border border-border/50">
                    <RealSikkimMap 
                      selectedDistrict={selectedDistrict} 
                      onMarkerClick={setSelectedMonastery}
                      userLocation={location}
                    />
                  </div>
                  <div className="mt-4 p-3 bg-muted/40 rounded-md border border-border/30">
                    <p className="text-xs text-muted-foreground text-center">
                      <MapPin className="h-3 w-3 inline mr-1" />
                      Click on monastery markers to view details. Zoom and pan to explore.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Monastery List / Details */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-24">
                {selectedMonastery ? (
                  <Card className="h-fit shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="font-serif text-lg">{selectedMonastery.name}</CardTitle>
                          <CardDescription>
                            {selectedMonastery.district} District • {selectedMonastery.sect}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedMonastery(null)}
                          className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        >
                          ×
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedMonastery.summary}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {selectedMonastery.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs shadow-sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-3 p-4 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border border-border/30">
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                            <span>{selectedMonastery.nearestTown}</span>
                          </div>
                          <div className="flex">
                            <span className="font-medium w-20 flex-shrink-0">Founded:</span>
                            <span>{selectedMonastery.founded}</span>
                          </div>
                          <div className="flex">
                            <span className="font-medium w-20 flex-shrink-0">Elevation:</span>
                            <span>{selectedMonastery.elevation}m</span>
                          </div>
                          <div className="flex">
                            <span className="font-medium w-20 flex-shrink-0">Best Time:</span>
                            <span>{selectedMonastery.bestTimeToVisit}</span>
                          </div>
                        </div>
                      </div>

                      <Button asChild className="w-full shadow-md">
                        <Link to={`/monasteries/${selectedMonastery.slug}`}>
                          Explore Virtual Tour →
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-fit shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50">
                      <CardTitle className="text-lg font-serif">
                        {selectedDistrict === 'All' ? 'All Monasteries' : `${selectedDistrict} District Monasteries`}
                      </CardTitle>
                      <CardDescription>
                        Click any monastery below or on the map to view details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {filteredMonasteries.map((monastery) => (
                          <Card
                            key={monastery.id}
                            className="cursor-pointer hover:shadow-md hover:border-primary/50 transition-all duration-200 bg-gradient-to-r from-card/80 to-card/60 hover:from-card hover:to-card border border-border/30"
                            onClick={() => setSelectedMonastery(monastery)}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-sm font-serif font-medium">
                                    {monastery.name}
                                  </CardTitle>
                                  <CardDescription className="text-xs">
                                    {monastery.sect} • Founded {monastery.founded}
                                  </CardDescription>
                                </div>
                                <Badge variant="outline" className="text-xs ml-2 flex-shrink-0 shadow-sm">
                                  {monastery.district}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                {monastery.summary}
                              </p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                                <span className="truncate">{monastery.nearestTown}</span>
                                <span className="ml-auto text-xs font-medium">
                                  {monastery.elevation}m
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}