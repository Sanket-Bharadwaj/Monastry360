import { useParams, Navigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, MapPin, Clock, Mountain, Calendar, Thermometer, Wind, CloudRain, Volume2, Languages } from 'lucide-react';
import { getMonasteryBySlug } from '@/data/monasteries';
import { useWeather } from '@/hooks/useWeather';
import monasteryPanorama from '@/assets/monastery-panorama.jpg';
import { Layout } from '@/components/Layout';
import { AudioPlayer } from '@/components/AudioPlayer';
import StreetView360 from '@/components/StreetView360';
import ThreePanoramaViewer from '@/components/ThreePanoramaViewer';

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
      <Card className="w-full min-h-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-foreground">
            <Thermometer className="h-4 w-4 text-primary" />
            <span>Current Weather</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-sm text-foreground font-medium">Loading weather data...</div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="w-full min-h-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-foreground">
            <Thermometer className="h-4 w-4 text-primary" />
            <span>Weather</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-sm text-foreground font-medium">Weather data unavailable</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full min-h-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2 text-foreground">
          <Thermometer className="h-4 w-4 text-primary" />
          <span>Current Weather</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-foreground">{Math.round(weather.temperature)}°C</span>
          <CloudRain className="h-8 w-8 text-blue-500" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm font-medium text-foreground">Wind: {weather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-2">
            <CloudRain className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm font-medium text-foreground">Condition: {weather.condition}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AudioGuides({ audioFiles }: { audioFiles: Record<string, string> }) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get all possible languages, not just available ones
  const allLanguages = ['en', 'hi', 'ne', 'lep', 'sik'];
  const availableLanguages = Object.keys(audioFiles).filter(lang => audioFiles[lang]);

  useEffect(() => {
    if (allLanguages.length > 0 && !selectedLanguage) {
      setSelectedLanguage(allLanguages[0]); // Default to first language
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || !selectedLanguage || !audioFiles[selectedLanguage]) return;
    
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

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleLanguageChange = (language: string) => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
    setSelectedLanguage(language);
    setCurrentTime(0);
  };

  const hasCurrentAudio = selectedLanguage && audioFiles[selectedLanguage];

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-primary" />
          <span>Audio Guides</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language Selection */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Select Language:</label>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose language" />
            </SelectTrigger>
            <SelectContent>
              {allLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">
                        {languageNames[lang as keyof typeof languageNames]?.native || lang}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({languageNames[lang as keyof typeof languageNames]?.name || lang})
                      </span>
                    </div>
                    {!audioFiles[lang] && (
                      <span className="text-xs text-orange-500 font-medium">Coming Soon</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Language Display */}
        <div className="text-center p-2 bg-muted/20 rounded">
          <p className="text-sm font-medium">
            {languageNames[selectedLanguage as keyof typeof languageNames]?.native || selectedLanguage}
          </p>
          <p className="text-xs text-muted-foreground">
            {languageNames[selectedLanguage as keyof typeof languageNames]?.name || selectedLanguage}
          </p>
        </div>

        {/* Audio Player or Coming Soon Message */}
        {hasCurrentAudio ? (
          <div className="space-y-3">
            <audio
              ref={audioRef}
              src={audioFiles[selectedLanguage]}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Play Button */}
            <div className="flex justify-center">
              <Button
                onClick={togglePlay}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Play Guide</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center p-6 bg-muted/30 rounded-lg border-dashed border">
            <Languages className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground mb-2">Audio Guide Coming Soon</h3>
            <p className="text-xs text-muted-foreground mb-3">
              We're working on creating high-quality audio content for this language.
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-orange-600">
              <Clock className="h-3 w-3" />
              <span>Expected soon</span>
            </div>
          </div>
        )}
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
        <section className="bg-card border-b overflow-hidden pt-12 md:pt-16 pb-8">
          <div className="container-responsive">
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
              <div className="space-y-4 mt-4 md:mt-0">
                {/* Weather Widget */}
                <div className="mt-2">
                  <WeatherWidget 
                    lat={monastery.latitude}
                    lon={monastery.longitude}
                    name={monastery.name}
                  />
                </div>

                {/* Audio Guides */}
                <AudioGuides audioFiles={monastery.audio} />
              </div>
            </div>
          </div>
        </section>

        {/* Panorama Section */}
        <section className="py-6 sm:py-8">
          <div className="container-responsive">
            <h2 className="text-xl sm:text-2xl font-serif font-bold mb-4">360° Virtual Experience</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Three.js Panorama Viewer */}
              <ThreePanoramaViewer 
                imageUrl={monastery.images.panorama || monastery.images.hero}
                title={monastery.name}
                className="w-full"
              />
              
              {/* Google Street View */}
              <StreetView360 
                latitude={monastery.latitude}
                longitude={monastery.longitude}
                name={monastery.name}
                className="w-full"
              />
            </div>
          </div>
        </section>

        <div className="wood-separator" />

        {/* Description */}
        <section className="py-12">
          <div className="container-responsive max-w-4xl mx-auto">
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