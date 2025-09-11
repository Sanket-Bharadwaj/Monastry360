import { useState } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/components/LanguageContext';

const languages = [
  { code: 'en' as const, name: 'English', nativeName: 'English' },
  { code: 'hi' as const, name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ne' as const, name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'lep' as const, name: 'Lepcha', nativeName: 'རོང་' },
  { code: 'sik' as const, name: 'Sikkimese', nativeName: 'འབྲས་ལྗོངས་སྐད་' },
];

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="language-selector touch-target">
          <Globe className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">{currentLang.nativeName}</span>
          <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="language-selector">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={`${
              currentLanguage === language.code ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.nativeName}</span>
              <span className="text-xs text-muted-foreground">{language.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}