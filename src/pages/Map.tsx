import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter } from 'lucide-react';
import { monasteries, getMonasteriesByDistrict } from '@/data/monasteries';
import { Layout } from '@/components/Layout';

const districts = ['All', 'East', 'South', 'West', 'North'] as const;

// Simplified SVG map of Sikkim with district boundaries
function SikkimMap({ selectedDistrict, onMarkerClick }: { 
  selectedDistrict: string; 
  onMarkerClick: (monastery: any) => void;
}) {
  const filteredMonasteries = selectedDistrict === 'All' 
    ? monasteries 
    : getMonasteriesByDistrict(selectedDistrict);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <svg
        width="100%"
        height="600"
        viewBox="0 0 400 500"
        className="border border-border rounded-lg bg-sky/5"
      >
        {/* Sikkim outline - simplified shape */}
        <path
          d="M100 50 L300 50 L320 100 L310 200 L300 350 L250 450 L150 450 L80 350 L70 200 L80 100 Z"
          fill="hsl(var(--muted))"
          stroke="hsl(var(--border))"
          strokeWidth="2"
        />
        
        {/* District boundaries */}
        <g stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3,3" fill="none">
          {/* East-West divide */}
          <line x1="200" y1="50" x2="200" y2="450" />
          {/* North-South divide */}
          <line x1="100" y1="200" x2="300" y2="200" />
          <line x1="150" y1="350" x2="250" y2="350" />
        </g>

        {/* District labels */}
        <text x="250" y="125" textAnchor="middle" className="text-xs fill-muted-foreground font-medium">NORTH</text>
        <text x="250" y="275" textAnchor="middle" className="text-xs fill-muted-foreground font-medium">EAST</text>
        <text x="150" y="125" textAnchor="middle" className="text-xs fill-muted-foreground font-medium">WEST</text>
        <text x="200" y="400" textAnchor="middle" className="text-xs fill-muted-foreground font-medium">SOUTH</text>

        {/* Monastery markers */}
        {filteredMonasteries.map((monastery, index) => {
          // Approximate positions based on districts
          const positions: Record<string, [number, number]> = {
            'East': [250, 275],
            'West': [150, 175],
            'North': [250, 125],
            'South': [200, 375],
          };
          
          // Add some offset for multiple monasteries in same district
          const basePos = positions[monastery.district];
          const offsetX = (index % 3 - 1) * 20;
          const offsetY = (Math.floor(index / 3) % 2) * 15;
          const [x, y] = [basePos[0] + offsetX, basePos[1] + offsetY];

          return (
            <g key={monastery.id}>
              <circle
                cx={x}
                cy={y}
                r="8"
                fill="hsl(var(--gold))"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="cursor-pointer hover:r-10 transition-all"
                onClick={() => onMarkerClick(monastery)}
              />
              <text
                x={x}
                y={y + 20}
                textAnchor="middle"
                className="text-xs fill-foreground font-medium cursor-pointer"
                onClick={() => onMarkerClick(monastery)}
              >
                {monastery.name.split(' ')[0]}
              </text>
            </g>
          );
        })}

        {/* Compass */}
        <g transform="translate(350, 70)">
          <circle cx="0" cy="0" r="25" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="0" y="-15" textAnchor="middle" className="text-xs fill-foreground font-bold">N</text>
          <line x1="0" y1="-20" x2="0" y2="-10" stroke="hsl(var(--primary))" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

export default function Map() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedMonastery, setSelectedMonastery] = useState<any>(null);

  const filteredMonasteries = selectedDistrict === 'All' 
    ? monasteries 
    : getMonasteriesByDistrict(selectedDistrict);

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Interactive Monastery Map
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the sacred monasteries across Sikkim's four districts. Click on the golden markers 
              or select from the list below to learn more about each monastery.
            </p>
          </div>

          {/* District Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Filter className="h-5 w-5 text-muted-foreground mt-2 mr-2" />
            {districts.map((district) => (
              <Button
                key={district}
                variant={selectedDistrict === district ? "default" : "outline"}
                onClick={() => setSelectedDistrict(district)}
                size="sm"
              >
                {district} {district !== 'All' && `(${getMonasteriesByDistrict(district).length})`}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="order-2 lg:order-1">
              <Card className="p-4">
                <SikkimMap 
                  selectedDistrict={selectedDistrict} 
                  onMarkerClick={setSelectedMonastery}
                />
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Click on monastery markers to view details
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