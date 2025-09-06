import { useState } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your Sikkim monasteries guide. Ask me anything about the Buddhist heritage sites in Sikkim.',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for your question about Sikkim\'s monasteries. This guide focuses on the Buddhist heritage sites of Sikkim. Could you please be more specific about which monastery or aspect you\'d like to know about?',
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg shuttle-float touch-target"
        size="sm"
      >
        <MessageCircle className="h-6 w-6 text-primary-foreground shuttle-glow" />
      </Button>
    );
  }

  return (
    <div className={`chat-popup ${isMinimized ? 'minimized' : ''}`}>
      {!isMinimized ? (
        <Card className="h-full border-0 shadow-none">
          <CardHeader className="pb-2 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Ask about Sikkim's Monasteries
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                  className="h-6 w-6 p-0 touch-target"
                >
                  <Minimize2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0 touch-target"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-72 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 text-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about monasteries..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="touch-target"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-full h-full rounded-full bg-primary hover:bg-primary/90 shadow-lg"
        >
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        </Button>
      )}
    </div>
  );
}