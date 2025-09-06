import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { Layout } from '@/components/Layout';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const welcomeMessage: Message = {
  id: 'welcome',
  role: 'assistant',
  content: `Welcome to Monastery360's Buddhist Heritage Guide! 🏔️

I can help you discover Sikkim's sacred monasteries, their history, spiritual significance, and visiting information. I draw from curated knowledge about the twelve most important monasteries in Sikkim.

Ask me about:
• Monastery histories and founding stories
• Buddhist sects and their practices  
• Visiting information and best times to go
• Cultural festivals and ceremonies
• Spiritual significance of different sites
• Architecture and artistic treasures

What would you like to know about Sikkim's monastic heritage?`,
  timestamp: new Date(),
};

const sampleQuestions = [
  "What is the most important monastery in Sikkim?",
  "When is the best time to visit Tashiding Monastery?",
  "Tell me about the different Buddhist sects in Sikkim",
  "What festivals can I attend at Rumtek Monastery?",
  "Which monasteries have the best mountain views?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate AI response - In production, this would call the backend API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on common queries
      let response = generateMockResponse(userMessage.content);
      
      const assistantMessage: Message = {
        id: Date.now().toString() + '_assistant',
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString() + '_error',
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment. This guide focuses on Sikkim\'s monasteries.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const generateMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('rumtek') || lowerQuery.includes('most important')) {
      return `Rumtek Monastery is indeed the most significant monastery in Sikkim. Built in the 1960s by the 16th Karmapa, it serves as the main seat of the Karma Kagyu lineage outside Tibet.

Key highlights:
• **Significance**: Main seat of Karma Kagyu Buddhism outside Tibet
• **Architecture**: Magnificent traditional Tibetan design with golden roofs
• **Location**: 24 km from Gangtok in East Sikkim
• **Best time to visit**: March to May, September to November
• **Sacred items**: Houses many precious relics brought from Tibet

The monastery is renowned for its spiritual importance, stunning architecture, and role as a center for Buddhist learning. Would you like to know more about its history or visiting details?`;
    }
    
    if (lowerQuery.includes('tashiding') || lowerQuery.includes('bhumchu')) {
      return `Tashiding Monastery is one of the most sacred sites in Sikkim, built in 1717 on a heart-shaped hill between two rivers.

**Sacred Significance**:
• Revered by ALL Buddhist sects - unique in Sikkim
• Home to the famous Bhumchu ceremony (February)
• Considered the holiest monastery by many devotees

**Visiting Information**:
• **Best time**: October to March for clear weather
• **Location**: 125 km from Gangtok in West Sikkim  
• **Special events**: Bhumchu Festival (February 14-15)
• **Significance**: The sacred water ceremony predicts Sikkim's year ahead

The monastery's position and the annual Bhumchu ceremony make it a must-visit spiritual destination. The ceremony draws thousands of pilgrims who come to witness the sacred water revelation.`;
    }
    
    if (lowerQuery.includes('sects') || lowerQuery.includes('buddhist') || lowerQuery.includes('tradition')) {
      return `Sikkim's monasteries represent several Buddhist traditions, each with unique practices and teachings:

**Nyingma (Red Hat) - "The Ancient Ones"**:
• Oldest Tibetan Buddhist school
• Monasteries: Pemayangtse, Enchey, Sanga Choeling
• Focus: Dzogchen meditation, Guru Rinpoche lineage

**Kagyu (White Hat) - "Oral Transmission"**:
• Emphasis on meditation and oral teachings
• Monasteries: Rumtek, Ralang, Changey Waterfalls
• Notable: Karma Kagyu and Zurmang Kagyu sub-schools

**Gelug (Yellow Hat) - "Virtuous Ones"**:
• Monastery: Phensang
• Systematic approach to Buddhist philosophy
• Founded by Je Tsongkhapa

Each tradition brings unique wisdom to Sikkim's spiritual landscape, creating a rich tapestry of Buddhist practice in the Himalayas.`;
    }
    
    if (lowerQuery.includes('festival') || lowerQuery.includes('ceremony') || lowerQuery.includes('when')) {
      return `Sikkim's monasteries host incredible festivals throughout the year:

**Major Festivals**:
• **Losar** (February): Tibetan New Year at Rumtek
• **Bhumchu** (February): Sacred water ceremony at Tashiding  
• **Enchey Festival** (August): Cham masked dances
• **Pang Lhabsol** (September): Mount Kanchenjunga worship at Ralang
• **Drubchen** (November): Spiritual intensive at Pemayangtse

**Best Festival Seasons**:
• **Winter** (Feb-Mar): Losar and Bhumchu - most sacred time
• **Summer** (Aug-Sep): Cham dances and harvest celebrations
• **Autumn** (Nov): Spiritual teachings and meditation retreats

Each festival offers unique experiences - from elaborate masked dances to intimate prayer ceremonies. The festivals connect visitors to centuries-old traditions and the deep spiritual heritage of Sikkim.`;
    }
    
    if (lowerQuery.includes('view') || lowerQuery.includes('mountain') || lowerQuery.includes('scenic')) {
      return `For spectacular mountain views, these monasteries offer breathtaking Himalayan panoramas:

**Best Mountain Views**:
• **Sanga Choeling**: Stunning Kanchenjunga range views (2100m elevation)
• **Pemayangtse**: Clear views of sacred peaks from West Sikkim
• **Sang Monastery**: Gateway views to Gurudongmar Lake region
• **Enchey**: Overlooks Gangtok with mountain backdrop
• **Tendong Hill Monastery**: 360° panoramic valley views

**Photography Tips**:
• Early morning (6-8 AM) for clearest mountain views
• October-December: Crystal clear mountain visibility
• March-May: Rhododendron blooms with mountain backdrop

The combination of spiritual architecture against the majestic Himalayan peaks creates some of the most photogenic and spiritually moving scenes in the world.`;
    }
    
    // Default response for other queries
    return `Thank you for your interest in Sikkim's monastic heritage! 

Based on our curated knowledge of Sikkim's twelve most important monasteries, I can provide information about:

🏔️ **Monastery Locations & Access**
📿 **Buddhist Traditions & Practices**  
🎭 **Cultural Festivals & Ceremonies**
🏛️ **Architecture & Sacred Art**
⛰️ **Spiritual Significance & History**

Could you please be more specific about what aspect of Sikkim's monasteries you'd like to explore? For example, you could ask about a specific monastery like Rumtek or Tashiding, or about topics like Buddhist festivals or visiting information.

This guide focuses specifically on Sikkim's monasteries and their rich cultural heritage.`;
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-serif font-bold mb-2">
              Ask About Sikkim's Monasteries
            </h1>
            <p className="text-muted-foreground">
              Get expert guidance on Buddhist heritage, festivals, and visiting information
            </p>
          </div>

          <Card className="flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
            <CardHeader className="flex-shrink-0 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-lg">
                  <Bot className="h-5 w-5 mr-2 text-primary" />
                  Monastery360 Guide
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Messages */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-4 py-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start space-x-3 ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="text-sm whitespace-pre-line break-words">
                            {message.content}
                          </div>
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>

                        {message.role === 'user' && (
                          <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Invisible div to scroll to */}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>

              {/* Sample Questions */}
              {messages.length === 1 && (
                <div className="px-4 py-3 border-t border-border flex-shrink-0">
                  <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {sampleQuestions.slice(0, 3).map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSampleQuestion(question)}
                        className="text-xs h-auto py-1 px-2"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="flex-shrink-0 p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Sikkim's monasteries..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This guide focuses on Sikkim's Buddhist monasteries and cultural heritage.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
