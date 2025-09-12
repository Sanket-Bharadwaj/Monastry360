import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter } from 'lucide-react';
import { monasteries, getMonasteriesByDistrict } from '@/data/monasteries';
import { Layout } from '@/components/Layout';
import { RealSikkimMap } from '@/components/RealSikkimMap';

const districts = ['All', 'East', 'South', 'West', 'North'] as const;

export default function Map() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedMonastery, setSelectedMonastery] = useState<any>(null);

  const filteredMonasteries = selectedDistrict === 'All' 
    ? monasteries 
    : getMonasteriesByDistrict(selectedDistrict);

  return (
    <Layout>
      <div className="page-wrapper py-8 pt-12">
        <div className="container-responsive">
          <div className="text-center mb-8 mt-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4">
              Sikkim Monastery Map
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore the sacred monasteries across Sikkim's four districts. Interact with the real map
              to discover these ancient centers of Buddhist wisdom nestled in the Himalayas.
            </p>
          </div>

          {/* District Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Filter className="h-4 w-4 text-muted-foreground mt-2 mr-2" />
            {districts.map((district) => (
              <Button
                key={district}
                variant={selectedDistrict === district ? "default" : "outline"}
                onClick={() => setSelectedDistrict(district)}
                size="sm"
                className="touch-target"
              >
                {district} {district !== 'All' && `(${getMonasteriesByDistrict(district).length})`}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Real Map */}
            <div className="order-2 lg:order-1">
              <Card className="p-4">
                <RealSikkimMap 
                  selectedDistrict={selectedDistrict} 
                  onMarkerClick={setSelectedMonastery}
                />
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Click on monastery markers to view details. Zoom and pan to explore.
                </p>
              </Card>
            </div>

            {/* Monastery List / Details */}
            <div className="order-1 lg:order-2">
              {selectedMonastery ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-serif">{selectedMonastery.name}</CardTitle>
                        <CardDescription>
                          {selectedMonastery.district} District • {selectedMonastery.sect}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedMonastery(null)}
                      >
                        ×
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {selectedMonastery.summary}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {selectedMonastery.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedMonastery.nearestTown}</span>
                      </div>
                      <div>
                        <strong>Founded:</strong> {selectedMonastery.founded}
                      </div>
                      <div>
                        <strong>Elevation:</strong> {selectedMonastery.elevation}m
                      </div>
                      <div>
                        <strong>Best Time:</strong> {selectedMonastery.bestTimeToVisit}
                      </div>
                    </div>

                    <Button asChild className="w-full">
                      <Link to={`/monasteries/${selectedMonastery.slug}`}>
                        Explore Virtual Tour
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-semibold">
                    {selectedDistrict === 'All' ? 'All Monasteries' : `${selectedDistrict} District Monasteries`}
                  </h3>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredMonasteries.map((monastery) => (
                      <Card
                        key={monastery.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedMonastery(monastery)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-serif">
                            {monastery.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {monastery.sect} • Founded {monastery.founded}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground mb-2">
                            {monastery.summary.slice(0, 100)}...
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {monastery.nearestTown}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}