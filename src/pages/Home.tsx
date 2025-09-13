import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, Wifi, Shield, Globe, Navigation } from 'lucide-react';
import { monasteries } from '@/data/monasteries';
import heroImage from '@/assets/hero-sikkim.jpg';

export default function Home() {
  const featuredMonasteries = monasteries.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero-fullscreen flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg">
            Monastery360
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-light drop-shadow-md">
            Discover Sikkim's Sacred Buddhist Heritage
          </p>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto drop-shadow-md">
            Journey through twelve centuries-old monasteries nestled in the Eastern Himalayas. 
            Experience virtual tours, cultural wisdom, and spiritual traditions of the sacred land.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-lg border-2 border-gold-foreground/20 shuttle-float touch-target">
              <Link to="/map">
                <MapPin className="mr-2 h-5 w-5" />
                Open Interactive Map
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="bg-card/90 text-card-foreground border-2 border-card-foreground/20 hover:bg-card shadow-lg touch-target">
              <Link to="/nearby">
                <Navigation className="mr-2 h-5 w-5" />
                Find Nearby Places
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Rest of the page content */}
      <div className="w-full">
        <div className="wood-separator" />

        {/* Featured Monasteries */}
      <section className="py-8 sm:py-12 lg:py-16 px-4">
        <div className="container-responsive max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-4 text-primary shuttle-glow">
              Sacred Monasteries of Sikkim
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the twelve most significant Buddhist monasteries, each preserving centuries 
              of wisdom, art, and spiritual practice in the heart of the Himalayas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredMonasteries.map((monastery, index) => (
              <Link key={monastery.id} to={`/monasteries/${monastery.slug}`}>
                <Card className={`monastery-card h-full group ${index % 2 === 0 ? 'shuttle-float' : ''}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg sm:text-xl font-serif group-hover:text-primary transition-colors">
                      {monastery.name}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {monastery.district} District • {monastery.sect} • {monastery.founded}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                      {monastery.summary}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {monastery.nearestTown}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Button asChild variant="outline" size="lg" className="touch-target">
              <Link to="/monasteries">
                View All Monasteries
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="wood-separator" />

      {/* Features */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 bg-muted/20">
        <div className="container-responsive max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-8 sm:mb-12 text-primary">
            Why Monastery360?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center group shuttle-float">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-sky/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky/20 transition-colors">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-sky" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Cultural Preservation</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Documenting and preserving Sikkim's Buddhist heritage for future generations 
                through immersive digital experiences.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Tourism Access</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Making Sikkim's remote monasteries accessible to global visitors through 
                detailed guides, maps, and virtual tours.
              </p>
            </div>

            <div className="text-center group shuttle-float">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Navigation className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Get personalized suggestions for nearby hotels and attractions based on 
                your current location in Sikkim.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <Wifi className="h-6 w-6 sm:h-8 sm:w-8 text-gold" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Offline Ready</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Access monastery information, maps, and audio guides even in remote 
                Himalayan locations without internet connectivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="mb-2 font-serif text-lg">Monastery360 — Sikkim Heritage Guide</p>
          <p className="text-sm opacity-80">
            Crafted with reverence by Team Horizon • Preserving Sacred Heritage • རྒྱལ་ཁབ་རི་བོ་རྩེ་ལྔ་
          </p>
        </div>
      </footer>
      
      </div> {/* Close the rest of page content wrapper */}
    </>
  );
}