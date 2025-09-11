import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ne' | 'lep' | 'sik';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.map': 'Map',
    'nav.monasteries': 'Monasteries',
    'nav.calendar': 'Calendar',
    'nav.about': 'About',
    
    // Home page
    'home.title': 'Monastery360',
    'home.subtitle': 'Sikkim Heritage Guide',
    'home.mission': 'Preserving the Sacred Heritage of Sikkim',
    'home.description': 'Journey through ancient monasteries, immersive virtual tours, and rich cultural traditions of the Buddhist kingdom nestled in the Himalayas.',
    'home.cta.map': 'Explore Interactive Map',
    'home.cta.calendar': 'View Cultural Calendar',
    
    // Map page
    'map.title': 'Sikkim Monastery Map',
    'map.description': 'Explore the sacred monasteries across Sikkim\'s four districts. Interact with the real map to discover these ancient centers of Buddhist wisdom nestled in the Himalayas.',
    'map.filter.all': 'All',
    'map.filter.east': 'East',
    'map.filter.west': 'West',
    'map.filter.north': 'North',
    'map.filter.south': 'South',
    
    // Monasteries page
    'monasteries.title': 'Sacred Monasteries of Sikkim',
    'monasteries.description': 'Discover twelve ancient monasteries that preserve centuries of Buddhist wisdom, art, and spiritual practice in the Eastern Himalayas.',
    'monasteries.search': 'Search monasteries, tags, or descriptions...',
    'monasteries.showing': 'Showing',
    'monasteries.of': 'of',
    'monasteries.explore': 'Explore Virtual Tour',
    
    // Calendar page
    'calendar.title': 'Sikkim Cultural Calendar',
    'calendar.description': 'Join the sacred rhythms of Sikkim\'s monastic life. From ancient festivals to spiritual teachings, discover when to visit for the most meaningful experiences.',
    
    // About page
    'about.title': 'About Monastery360',
    'about.description': 'Crafted by Team Horizon to preserve and share the rich Buddhist heritage of Sikkim through immersive digital experiences.',
    
    // Common
    'common.founded': 'Founded',
    'common.elevation': 'elevation',
    'common.district': 'District',
    'common.sect': 'Sect',
    'common.loading': 'Loading...',
    'common.error': 'Error loading content',
  },
  hi: {
    // Navigation
    'nav.home': 'मुख्य',
    'nav.map': 'मानचित्र',
    'nav.monasteries': 'मठ',
    'nav.calendar': 'कैलेंडर',
    'nav.about': 'हमारे बारे में',
    
    // Home page
    'home.title': 'मठ360',
    'home.subtitle': 'सिक्किम विरासत गाइड',
    'home.mission': 'सिक्किम की पवित्र विरासत का संरक्षण',
    'home.description': 'हिमालय में बसे बौद्ध राज्य के प्राचीन मठों, विर्चुअल टूर और समृद्ध सांस्कृतिक परंपराओं की यात्रा करें।',
    'home.cta.map': 'इंटरैक्टिव मानचित्र देखें',
    'home.cta.calendar': 'सांस्कृतिक कैलेंडर देखें',
    
    // Map page
    'map.title': 'सिक्किम मठ मानचित्र',
    'map.description': 'सिक्किम के चार जिलों में फैले पवित्र मठों का अन्वेषण करें। हिमालय में बसे बौद्ध ज्ञान के प्राचीन केंद्रों की खोज करें।',
    'map.filter.all': 'सभी',
    'map.filter.east': 'पूर्व',
    'map.filter.west': 'पश्चिम',
    'map.filter.north': 'उत्तर',
    'map.filter.south': 'दक्षिण',
    
    // Monasteries page
    'monasteries.title': 'सिक्किम के पवित्र मठ',
    'monasteries.description': 'पूर्वी हिमालय में बौद्ध ज्ञान, कला और आध्यात्मिक अभ्यास की सदियों पुरानी परंपराओं को संजोए बारह प्राचीन मठों की खोज करें।',
    'monasteries.search': 'मठ, टैग या विवरण खोजें...',
    'monasteries.showing': 'दिखाया जा रहा',
    'monasteries.of': 'का',
    'monasteries.explore': 'वर्चुअल टूर देखें',
    
    // Calendar page
    'calendar.title': 'सिक्किम सांस्कृतिक कैलेंडर',
    'calendar.description': 'सिक्किम के मठों की पवित्र लय में शामिल हों। प्राचीन त्योहारों से आध्यात्मिक शिक्षाओं तक, सबसे अर्थपूर्ण अनुभवों के लिए यात्रा का समय जानें।',
    
    // About page
    'about.title': 'मठ360 के बारे में',
    'about.description': 'डिजिटल अनुभवों के माध्यम से सिक्किम की समृद्ध बौद्ध विरासत को संरक्षित और साझा करने के लिए टीम होराइजन द्वारा निर्मित।',
    
    // Common
    'common.founded': 'स्थापित',
    'common.elevation': 'ऊंचाई',
    'common.district': 'जिला',
    'common.sect': 'संप्रदाय',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'सामग्री लोड करने में त्रुटि',
  },
  ne: {
    // Navigation
    'nav.home': 'घर',
    'nav.map': 'नक्शा',
    'nav.monasteries': 'गुम्बा',
    'nav.calendar': 'पात्रो',
    'nav.about': 'हाम्रो बारेमा',
    
    // Home page
    'home.title': 'गुम्बा360',
    'home.subtitle': 'सिक्किम सम्पदा गाइड',
    'home.mission': 'सिक्किमको पवित्र सम्पदाको संरक्षण',
    'home.description': 'हिमालयमा बसेको बौद्ध राज्यका पुराना गुम्बाहरू, भर्चुअल टुर र समृद्ध सांस्कृतिक परम्पराहरूको यात्रा गर्नुहोस्।',
    'home.cta.map': 'अन्तरक्रियात्मक नक्शा हेर्नुहोस्',
    'home.cta.calendar': 'सांस्कृतिक पात्रो हेर्नुहोस्',
    
    // Map page
    'map.title': 'सिक्किम गुम्बा नक्शा',
    'map.description': 'सिक्किमका चार जिल्लाहरूमा फैलिएका पवित्र गुम्बाहरूको अन्वेषण गर्नुहोस्। हिमालयमा बसेका बौद्ध ज्ञानका पुराना केन्द्रहरू खोज्नुहोस्।',
    'map.filter.all': 'सबै',
    'map.filter.east': 'पूर्व',
    'map.filter.west': 'पश्चिम',
    'map.filter.north': 'उत्तर',
    'map.filter.south': 'दक्षिण',
    
    // Monasteries page
    'monasteries.title': 'सिक्किमका पवित्र गुम्बाहरू',
    'monasteries.description': 'पूर्वी हिमालयमा बौद्ध ज्ञान, कला र आध्यात्मिक अभ्यासका शताब्दीयौं पुरानो परम्पराहरू सँग्रह गर्ने बाह्र पुराना गुम्बाहरू खोज्नुहोस्।',
    'monasteries.search': 'गुम्बा, ट्याग वा विवरण खोज्नुहोस्...',
    'monasteries.showing': 'देखाइएको',
    'monasteries.of': 'को',
    'monasteries.explore': 'भर्चुअल टुर हेर्नुहोस्',
    
    // Calendar page
    'calendar.title': 'सिक्किम सांस्कृतिक पात्रो',
    'calendar.description': 'सिक्किमका गुम्बाहरूको पवित्र तालमा सामेल हुनुहोस्। पुराना चाडपर्वहरूदेखि आध्यात्मिक शिक्षाहरूसम्म, अर्थपूर्ण अनुभवहरूका लागि यात्राको समय जान्नुहोस्।',
    
    // About page
    'about.title': 'गुम्बा360 बारे',
    'about.description': 'डिजिटल अनुभवहरू मार्फत सिक्किमको समृद्ध बौद्ध सम्पदालाई संरक्षण र साझेदारी गर्न टिम होराइजनद्वारा निर्मित।',
    
    // Common
    'common.founded': 'स्थापना',
    'common.elevation': 'उचाइ',
    'common.district': 'जिल्ला',
    'common.sect': 'सम्प्रदाय',
    'common.loading': 'लोड भइरहेको छ...',
    'common.error': 'सामग्री लोड गर्न त्रुटि',
  },
  lep: {
    // Navigation (Lepcha translations - approximated)
    'nav.home': 'आङ्',
    'nav.map': 'लम्',
    'nav.monasteries': 'गुम्पा',
    'nav.calendar': 'तिथि',
    'nav.about': 'मुयुङ्',
    
    // Home page
    'home.title': 'गुम्पा360',
    'home.subtitle': 'सिक्किम वीरसत गुइड',
    'home.mission': 'सिक्किमना पवित्र वीरसतना संरक्षण',
    'home.description': 'हिमालयमा आयुरे बुद्ध राज्यना पुराण गुम्पाङ, वर्चुयल टुर आदि समृद्ध सांस्कृतिक परम्पराङना यात्रा ल्यो।',
    'home.cta.map': 'इन्टेरैक्टिव लम् मुङ्',
    'home.cta.calendar': 'सांस्कृतिक तिथि मुङ्',
    
    // Common translations for Lepcha
    'map.title': 'सिक्किम गुम्पा लम्',
    'monasteries.title': 'सिक्किमना पवित्र गुम्पाङ',
    'calendar.title': 'सिक्किम सांस्कृतिक तिथि',
    'about.title': 'गुम्पा360 मुयुङ्',
    
    // Common
    'common.founded': 'थापना',
    'common.elevation': 'उचाइ',
    'common.district': 'जिल्ला',
    'common.sect': 'सम्प्रदाय',
    'common.loading': 'लोड ल्याक्पो...',
    'common.error': 'सामग्री लोड ल्यारे त्रुटि',
  },
  sik: {
    // Navigation (Sikkimese/Bhutia translations - approximated)
    'nav.home': 'ཁྱིམ་',
    'nav.map': 'ས་ཁྲ་',
    'nav.monasteries': 'དགོན་པ་',
    'nav.calendar': 'ལོ་ཐོ་',
    'nav.about': 'སྐོར་',
    
    // Home page
    'home.title': 'དགོན་པ་360',
    'home.subtitle': 'འབྲས་ལྗོངས་རིག་གནས་ལམ་སྟོན་',
    'home.mission': 'འབྲས་ལྗོངས་ཀྱི་དམ་པའི་རིག་གནས་སྲུང་སྐྱོབ་',
    'home.description': 'གངས་རི་ནང་གནས་པའི་ནང་པའི་རྒྱལ་ཁབ་ཀྱི་དགོན་པ་རྙིང་པ་དང་། དིགིཊལ་ལྟ་སྐོར། ཡང་དག་སྐྱེས་པའི་རིག་གནས་ལུགས་སྲོལ་གྱི་འགྲུལ་བཞུད་།',
    'home.cta.map': 'འདྲེས་སྦྱོར་ས་ཁྲ་ལྟ་',
    'home.cta.calendar': 'རིག་གནས་ལོ་ཐོ་ལྟ་',
    
    // Common translations for Sikkimese
    'map.title': 'འབྲས་ལྗོངས་དགོན་པ་ས་ཁྲ་',
    'monasteries.title': 'འབྲས་ལྗོངས་ཀྱི་དམ་པའི་དགོན་པ་',
    'calendar.title': 'འབྲས་ལྗོངས་རིག་གནས་ལོ་ཐོ་',
    'about.title': 'དགོན་པ་360 སྐོར་',
    
    // Common
    'common.founded': 'གཞི་བཙུགས་',
    'common.elevation': 'མཐོ་ཚད་',
    'common.district': 'ཁུལ་',
    'common.sect': 'ཆོས་ལུགས་',
    'common.loading': 'སྣོན་འཇུག་བྱེད་བཞིན་...',
    'common.error': 'ནང་དོན་སྣོན་འཇུག་བྱེད་རྒྱུར་ནོར་འཁྲུལ་',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('monastery360-language', language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}