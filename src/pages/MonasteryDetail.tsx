import { useParams, Navigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, MapPin, Clock, Mountain, Calendar, Thermometer, Wind, CloudRain } from 'lucide-react';
import { getMonasteryBySlug } from '@/data/monasteries';
import { useWeather } from '@/hooks/useWeather';
import monasteryPanorama from '@/assets/monastery-panorama.jpg';
import { Layout } from '@/components/Layout';
import { AudioPlayer } from '@/components/AudioPlayer';

const languageNames = {
  en: { name: 'English', native: 'English' },
  hi: { name: 'Hindi', native: 'हिन्दी' },
  ne: { name: 'Nepali', native: 'नेपाली' },
  lep: { name: 'Lepcha', native: 'རོང་' },
  sik: { name: 'Sikkimese', native: 'འབྲས་ལྗོངས་སྐད་' },
};

interface AudioPlayerProps {
  src?: string;
  language: string;
}

function AudioPlayerLocal({ src, language }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current || !src) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  if (!src) {
    return (
      <div className="p-3 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/30">
        <p className="text-xs text-muted-foreground text-center">
          {language} Audio Guide - Awaiting Curated Content
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 bg-card rounded-lg border">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlay}
          className="h-8 w-8 p-0"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <span className="text-xs text-muted-foreground">{language}</span>
      </div>
    </div>
  );
}

function PanoramaViewer({ src }: { src: string }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStart;
    setOffset(prev => Math.max(-50, Math.min(0, prev + diff * 0.1)));
    setDragStart(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className="panorama-container h-64 md:h-80"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img
        src={src}
        alt="360° Monastery View"
        className="panorama-image"
        style={{ transform: `translateX(${offset}%)` }}
        draggable={false}
      />
      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        Drag to explore 360° view
      </div>
    </div>
  );
}

function WeatherWidget({ lat, lon, name }: { lat: number; lon: number; name: string }) {
  const { weather, loading, error } = useWeather(lat, lon);

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">Loading weather data...</div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">Weather data unavailable</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Thermometer className="h-4 w-4 mr-1" />
          Current Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{Math.round(weather.temperature)}°C</span>
          <CloudRain className="h-6 w-6 text-sky" />
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center">
            <Wind className="h-3 w-3 mr-1" />
            Wind: {weather.windSpeed} km/h
          </div>
          <div>Condition: {weather.condition}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MonasteryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const monastery = slug ? getMonasteryBySlug(slug) : undefined;

  if (!monastery) {
    return <Navigate to="/monasteries" replace />;
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-card border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <Badge variant="outline" className="mb-2">
                    {monastery.district} District
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                    {monastery.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-4">
                    {monastery.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">{monastery.sect}</Badge>
                  <Badge variant="secondary">Founded {monastery.founded}</Badge>
                  {monastery.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{monastery.visitingHours}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{monastery.bestTimeToVisit}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{monastery.nearestTown}</span>
                  </div>
                  <div className="flex items-center">
                    <Mountain className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{monastery.elevation}m elevation</span>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Weather Widget */}
                <WeatherWidget 
                  lat={monastery.latitude}
                  lon={monastery.longitude}
                  name={monastery.name}
                />

                {/* Audio Guides */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Audio Guides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(monastery.audio).map(([lang, src]) => (
                      <AudioPlayer 
                        key={lang}
                        src={src} 
                        language={languageNames[lang as keyof typeof languageNames]?.name || lang}
                        nativeLanguage={languageNames[lang as keyof typeof languageNames]?.native || lang}
                      />
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Panorama Section */}
        <section className="py-6 sm:py-8">
          <div className="container-responsive">
            <h2 className="text-xl sm:text-2xl font-serif font-bold mb-4">360° Virtual Experience</h2>
            <PanoramaViewer src={monastery.images.panorama || monastery.images.hero} />
          </div>
        </section>

        <div className="wood-separator" />

        {/* Description */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-serif font-bold mb-4">About {monastery.name}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {monastery.description}
              </p>
              
              <h3 className="text-xl font-serif font-semibold mb-3">Historical Significance</h3>
              <p className="text-muted-foreground leading-relaxed">
                {monastery.significance}
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}