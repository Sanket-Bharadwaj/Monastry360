import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Mountain, Calendar, Filter } from 'lucide-react';
import { monasteries, getMonasteriesByDistrict } from '@/data/monasteries';
import { Layout } from '@/components/Layout';

const districts = ['All', 'East', 'South', 'West', 'North'] as const;
const sects = ['All', 'Nyingma', 'Kagyu', 'Gelug', 'Bon/Buddhist Syncretism', 'Zurmang Kagyu'] as const;

export default function Monasteries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedSect, setSelectedSect] = useState<string>('All');

  const filteredMonasteries = monasteries.filter(monastery => {
    const matchesSearch = monastery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         monastery.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         monastery.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDistrict = selectedDistrict === 'All' || monastery.district === selectedDistrict;
    const matchesSect = selectedSect === 'All' || monastery.sect === selectedSect;

    return matchesSearch && matchesDistrict && matchesSect;
  });

  return (
    <Layout>
      <div className="page-wrapper py-8 pt-12">
        <div className="container-responsive">
          <div className="text-center mb-8 mt-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Sacred Monasteries of Sikkim
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover twelve ancient monasteries that preserve centuries of Buddhist wisdom, 
              art, and spiritual practice in the Eastern Himalayas.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-8">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search monasteries, tags, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {/* District Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">District:</span>
                <div className="flex gap-1">
                  {districts.map((district) => (
                    <Button
                      key={district}
                      variant={selectedDistrict === district ? "default" : "outline"}
                      onClick={() => setSelectedDistrict(district)}
                      size="sm"
                      className="text-xs"
                    >
                      {district}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sect Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sect:</span>
                <div className="flex gap-1 flex-wrap">
                  {sects.map((sect) => (
                    <Button
                      key={sect}
                      variant={selectedSect === sect ? "default" : "outline"}
                      onClick={() => setSelectedSect(sect)}
                      size="sm"
                      className="text-xs"
                    >
                      {sect === 'All' ? 'All' : sect.split(' ')[0]}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredMonasteries.length} of {monasteries.length} monasteries
            </p>
          </div>

          {/* Monastery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMonasteries.map((monastery) => (
              <Link key={monastery.id} to={`/monasteries/${monastery.slug}`}>
                <Card className="monastery-card h-full group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-serif group-hover:text-primary transition-colors">
                          {monastery.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {monastery.district} District
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs ml-2">
                        {monastery.sect.split(' ')[0]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-4">
                    <img 
                      src={monastery.images.hero} 
                      alt={`${monastery.name} exterior view`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {monastery.summary}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {monastery.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {monastery.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{monastery.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span>{monastery.nearestTown}</span>
                      </div>
                      <div className="flex items-center">
                        <Mountain className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span>{monastery.elevation}m elevation</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span>Founded {monastery.founded}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Explore Virtual Tour →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredMonasteries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏔️</div>
              <h3 className="text-xl font-semibold mb-2">No monasteries found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDistrict('All');
                  setSelectedSect('All');
                }}
                variant="outline"
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Call to Action */}
          {filteredMonasteries.length > 0 && (
            <div className="text-center mt-12 py-8 border-t border-border">
              <h3 className="text-xl font-serif font-semibold mb-4">
                Plan Your Spiritual Journey
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Use our interactive map to plan visits to these sacred sites, 
                or explore our cultural calendar to time your journey with festivals and ceremonies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/map">View Interactive Map</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/calendar">Cultural Calendar</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}