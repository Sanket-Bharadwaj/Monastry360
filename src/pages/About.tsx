import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Mountain, Users, Globe, Github, Mail } from 'lucide-react';
import { Layout } from '@/components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              About Monastery360
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Preserving and sharing the sacred Buddhist heritage of Sikkim through 
              immersive digital experiences and cultural storytelling.
            </p>
          </div>

          {/* Mission */}
          <section className="mb-12">
            <Card className="monastery-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-serif mb-2">Our Sacred Mission</CardTitle>
                <CardDescription className="text-base">
                  རྒྱལ་ཁབ་རི་བོ་རྩེ་ལྔ་ • "In the Land of Five Peaks"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mountain className="h-8 w-8 text-gold" />
                    </div>
                    <h3 className="font-semibold mb-2">Cultural Preservation</h3>
                    <p className="text-sm text-muted-foreground">
                      Documenting and preserving Sikkim's Buddhist heritage through digital archiving, 
                      virtual tours, and immersive storytelling for future generations.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-sky/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-sky" />
                    </div>
                    <h3 className="font-semibold mb-2">Global Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Making Sikkim's remote sacred sites accessible to a global audience while 
                      promoting responsible cultural tourism and spiritual understanding.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">Respectful Sharing</h3>
                    <p className="text-sm text-muted-foreground">
                      Presenting Buddhist culture with deep respect, authenticity, and cultural 
                      sensitivity, guided by local communities and monastic traditions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="wood-separator mb-12" />

          {/* Team Horizon */}
          <section className="mb-12">
            <Card className="monastery-card">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-center mb-2">
                  Team Horizon
                </CardTitle>
                <CardDescription className="text-center">
                  Crafting digital experiences that honor sacred traditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    We are a dedicated team of developers, designers, and cultural enthusiasts 
                    committed to bridging ancient wisdom with modern technology. Our approach 
                    combines technical excellence with deep cultural respect.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Our Values</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Cultural authenticity and respect</li>
                      <li>• Community-driven development</li>
                      <li>• Open-source collaboration</li>
                      <li>• Sustainable digital preservation</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Our Approach</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Research-based content curation</li>
                      <li>• Collaborative storytelling</li>
                      <li>• Progressive web technology</li>
                      <li>• Multilingual accessibility</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Technology & Features */}
          <section className="mb-12">
            <Card className="monastery-card">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-center mb-2">
                  Technology & Features
                </CardTitle>
                <CardDescription className="text-center">
                  Modern technology serving ancient wisdom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Progressive Web App</h4>
                    <p className="text-xs text-muted-foreground">
                      Offline-ready with service workers for access in remote Himalayan locations
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">360° Virtual Tours</h4>
                    <p className="text-xs text-muted-foreground">
                      Immersive panoramic experiences of sacred spaces and mountain views
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Interactive Maps</h4>
                    <p className="text-xs text-muted-foreground">
                      Custom SVG maps with district filtering and monastery markers
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Cultural Calendar</h4>
                    <p className="text-xs text-muted-foreground">
                      Real festival and ceremony dates with visiting information
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">AI Heritage Guide</h4>
                    <p className="text-xs text-muted-foreground">
                      Grounded AI responses based on curated monastery knowledge
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Multilingual Support</h4>
                    <p className="text-xs text-muted-foreground">
                      Prepared for Lepcha, Sikkimese, Nepali, and Hindi localization
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Tailwind CSS</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Express</Badge>
                    <Badge variant="outline">SQLite</Badge>
                    <Badge variant="outline">PWA</Badge>
                    <Badge variant="outline">Gemini AI</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Acknowledgments */}
          <section className="mb-12">
            <Card className="monastery-card">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-center mb-2">
                  Acknowledgments
                </CardTitle>
                <CardDescription className="text-center">
                  གདིན་གང་སྒམ་སྤྱན་ • "With gratitude and respect"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  We extend our deepest gratitude to the monastic communities of Sikkim who 
                  have preserved these sacred traditions for centuries. This project exists 
                  to honor their dedication and share their wisdom respectfully with the world.
                </p>
                
                <p>
                  Special thanks to the cultural historians, local guides, and community 
                  members who provided authentic insights and ensured our content reflects 
                  the true spirit of Sikkim's Buddhist heritage.
                </p>
                
                <p>
                  We acknowledge that this digital representation, while created with care, 
                  cannot replace the transformative experience of visiting these sacred spaces 
                  in person and engaging with living traditions.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Contact */}
          <section>
            <Card className="monastery-card text-center">
              <CardContent className="pt-6">
                <h3 className="text-xl font-serif font-semibold mb-4">
                  Connect with Team Horizon
                </h3>
                <p className="text-muted-foreground mb-6">
                  Questions, suggestions, or collaboration opportunities? We'd love to hear from you.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    hello@teamhorizon.dev
                  </Button>
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub Repository
                  </Button>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Built with ❤️ for the preservation of Sikkim's sacred heritage<br />
                    བྱམས་པ་ཞིང་གུས་པས། • "With loving kindness and respect"
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
}