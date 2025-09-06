import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, MapPin, Clock, Users } from 'lucide-react';
import { Layout } from '@/components/Layout';

interface CulturalEvent {
  id: string;
  name: string;
  date: string;
  month: number;
  monastery: string;
  monasterySlug: string;
  district: string;
  type: 'Festival' | 'Ceremony' | 'Teaching' | 'Pilgrimage';
  description: string;
  significance: string;
  duration: string;
  participants: string;
  bestTimeToAttend: string;
}

const culturalEvents: CulturalEvent[] = [
  {
    id: '1',
    name: 'Losar (Tibetan New Year)',
    date: 'February 10-12, 2024',
    month: 2,
    monastery: 'Rumtek Monastery',
    monasterySlug: 'rumtek-monastery',
    district: 'East',
    type: 'Festival',
    description: 'The most important festival in the Tibetan Buddhist calendar, celebrating the new year with elaborate rituals, masked dances, and community feasts.',
    significance: 'Marks the beginning of the new year and renewal of spiritual commitments',
    duration: '3 days',
    participants: 'All community members and visitors welcome',
    bestTimeToAttend: 'Morning ceremonies and evening masked dances',
  },
  {
    id: '2',
    name: 'Bhumchu Festival',
    date: 'February 14-15, 2024',
    month: 2,
    monastery: 'Tashiding Monastery',
    monasterySlug: 'tashiding-monastery',
    district: 'West',
    type: 'Ceremony',
    description: 'Sacred water ceremony where holy water is revealed from a sealed pot, believed to predict the year ahead for Sikkim.',
    significance: 'Most sacred ceremony in Sikkim, attended by thousands of pilgrims',
    duration: '2 days',
    participants: 'Open to all devotees and pilgrims',
    bestTimeToAttend: 'Dawn ceremony on main day',
  },
  {
    id: '3',
    name: 'Enchey Festival (Cham Dance)',
    date: 'August 15-16, 2024',
    month: 8,
    monastery: 'Enchey Monastery',
    monasterySlug: 'enchey-monastery',
    district: 'East',
    type: 'Festival',
    description: 'Annual masked dance festival featuring elaborate costumes and traditional Tibetan Buddhist ritual dances.',
    significance: 'Honors the protective deity Mahakala and brings blessings to the community',
    duration: '2 days',
    participants: 'Local community and tourists',
    bestTimeToAttend: 'Afternoon dance performances',
  },
  {
    id: '4',
    name: 'Pang Lhabsol',
    date: 'September 1, 2024',
    month: 9,
    monastery: 'Ralang Monastery',
    monasterySlug: 'ralang-monastery',
    district: 'South',
    type: 'Ceremony',
    description: 'Unique festival dedicated to Mount Kanchenjunga, the guardian deity of Sikkim, featuring traditional warrior dances.',
    significance: 'Sacred bond between the people of Sikkim and their protective mountain deity',
    duration: '1 day',
    participants: 'Traditional celebration with local families',
    bestTimeToAttend: 'Morning mountain worship ceremony',
  },
  {
    id: '5',
    name: 'Drubchen Festival',
    date: 'November 5-6, 2024',
    month: 11,
    monastery: 'Pemayangtse Monastery',
    monasterySlug: 'pemayangtse-monastery',
    district: 'West',
    type: 'Festival',
    description: 'Nine-day spiritual intensive culminating in sacred mask dances and the destruction of evil spirits.',
    significance: 'Spiritual cleansing and protection for the coming year',
    duration: '2 days (public ceremonies)',
    participants: 'Monks, nuns, and devoted practitioners',
    bestTimeToAttend: 'Final day mask dance ceremony',
  },
  {
    id: '6',
    name: 'Buddha Purnima',
    date: 'May 23, 2024',
    month: 5,
    monastery: 'Sang Monastery',
    monasterySlug: 'sang-monastery',
    district: 'North',
    type: 'Teaching',
    description: 'Celebration of Buddha\'s birth, enlightenment, and passing, with special teachings and meditation sessions.',
    significance: 'Triple anniversary of Buddha\'s most important life events',
    duration: '1 day',
    participants: 'All Buddhist practitioners and interested visitors',
    bestTimeToAttend: 'Dawn meditation and evening teaching',
  },
  {
    id: '7',
    name: 'Dakini Day Teaching',
    date: 'December 10, 2024',
    month: 12,
    monastery: 'Sanga Choeling Monastery',
    monasterySlug: 'sanga-choeling-monastery',
    district: 'West',
    type: 'Teaching',
    description: 'Special teaching on the feminine principle in Tibetan Buddhism, honoring the wisdom dakinis.',
    significance: 'Honoring the feminine aspect of enlightenment and wisdom',
    duration: 'Half day',
    participants: 'Practitioners interested in advanced teachings',
    bestTimeToAttend: 'Morning teaching session',
  },
];

const months = [
  'All Months', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
] as const;

const eventTypes = ['All Types', 'Festival', 'Ceremony', 'Teaching', 'Pilgrimage'] as const;

export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState<string>('All Months');
  const [selectedType, setSelectedType] = useState<string>('All Types');

  const filteredEvents = culturalEvents.filter(event => {
    const matchesMonth = selectedMonth === 'All Months' || 
                        months[event.month] === selectedMonth;
    const matchesType = selectedType === 'All Types' || event.type === selectedType;
    
    return matchesMonth && matchesType;
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Festival': return 'bg-gold/10 text-gold-foreground border-gold/20';
      case 'Ceremony': return 'bg-sky/10 text-sky-foreground border-sky/20';
      case 'Teaching': return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'Pilgrimage': return 'bg-prayer-green/10 text-foreground border-prayer-green/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Sikkim Cultural Calendar
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the sacred rhythms of Sikkim's monastic life. From ancient festivals to 
              spiritual teachings, discover when to visit for the most meaningful experiences.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {/* Month Filter */}
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Month:</span>
              <div className="flex gap-1 flex-wrap">
                {['All Months', 'February', 'May', 'August', 'September', 'November', 'December'].map((month) => (
                  <Button
                    key={month}
                    variant={selectedMonth === month ? "default" : "outline"}
                    onClick={() => setSelectedMonth(month)}
                    size="sm"
                    className="text-xs"
                  >
                    {month}
                  </Button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Type:</span>
              <div className="flex gap-1">
                {eventTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    onClick={() => setSelectedType(type)}
                    size="sm"
                    className="text-xs"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredEvents.length} cultural events
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="monastery-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-serif mb-1">
                        {event.name}
                      </CardTitle>
                      <CardDescription className="flex items-center text-sm mb-2">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {event.date}
                      </CardDescription>
                    </div>
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    <Link 
                      to={`/monasteries/${event.monasterySlug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {event.monastery}
                    </Link>
                    <span className="mx-2">•</span>
                    <span>{event.district} District</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div>
                      <strong className="text-foreground">Significance:</strong>
                      <p className="text-muted-foreground">{event.significance}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{event.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{event.participants}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">
                      <strong>Best time to attend:</strong> {event.bestTimeToAttend}
                    </p>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link to={`/monasteries/${event.monasterySlug}`}>
                        Visit {event.monastery} →
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                Try selecting different months or event types
              </p>
              <Button 
                onClick={() => {
                  setSelectedMonth('All Months');
                  setSelectedType('All Types');
                }}
                variant="outline"
              >
                Show All Events
              </Button>
            </div>
          )}

          {/* Planning Note */}
          <div className="mt-12 p-6 bg-muted/20 rounded-lg border border-dashed border-muted-foreground/30">
            <h3 className="text-lg font-serif font-semibold mb-3 text-center">
              Planning Your Visit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-1">Weather Considerations</h4>
                <p>February-May and September-November offer the clearest mountain views and most comfortable temperatures for festival attendance.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Cultural Etiquette</h4>
                <p>Dress modestly, remove shoes when entering sacred spaces, and maintain respectful silence during ceremonies unless invited to participate.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}