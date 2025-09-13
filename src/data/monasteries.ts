import rumtekImage from '@/assets/monasteries/rumtek.jpg';
import pemayangtseImage from '@/assets/monasteries/pemayangtse.jpg';
import tashidingImage from '@/assets/monasteries/tashiding.jpg';
import encheyImage from '@/assets/monasteries/enchey.jpg';
import gangtokMonasteryImage from '@/assets/monasteries/gangtok-monastery.jpg';
import dodrulImage from '@/assets/monasteries/do-drul-chorten.jpg';

export interface Monastery {
  id: string;
  name: string;
  slug: string;
  district: 'East' | 'South' | 'West' | 'North';
  latitude: number;
  longitude: number;
  elevation: number;
  summary: string;
  description: string;
  sect: string;
  founded: string;
  significance: string;
  visitingHours: string;
  bestTimeToVisit: string;
  nearestTown: string;
  distanceFromCapital: string;
  tags: string[];
  images: {
    hero: string;
    gallery: string[];
    panorama?: string;
  };
  audio: {
    en?: string;
    hi?: string;
    ne?: string;
    lep?: string;
    sik?: string;
  };
}

export const monasteries: Monastery[] = [
  {
    id: '1',
    name: 'Rumtek Monastery',
    slug: 'rumtek-monastery',
    district: 'East',
    latitude: 27.3389,
    longitude: 88.5583,
    elevation: 1550,
    summary: 'The Dharma Chakra Centre, seat of the 16th Karmapa and most significant Kagyu monastery in Sikkim.',
    description: 'Rumtek Monastery, also known as the Dharma Chakra Centre, is one of the most important monasteries in Sikkim. Built in the 1960s by the 16th Karmapa, it serves as the main seat of the Karma Kagyu lineage outside Tibet. The monastery is renowned for its magnificent architecture, ancient relics, and as a center for Buddhist learning and meditation.',
    sect: 'Karma Kagyu',
    founded: '1966',
    significance: 'Main seat of Karma Kagyu lineage outside Tibet',
    visitingHours: '6:00 AM - 6:00 PM',
    bestTimeToVisit: 'March to May, September to November',
    nearestTown: 'Gangtok (24 km)',
    distanceFromCapital: '24 km from Gangtok',
    tags: ['Karma Kagyu', 'Karmapa', 'Pilgrimage', 'Architecture'],
    images: {
    hero: rumtekImage,
    gallery: [rumtekImage],
    panorama: '/images/panoramas/rumtek-360.jpg', // You can add actual 360° images here
  },
    audio: {
      en: '/audio/monasteries/rumtek/english.mp3',
      hi: '/audio/rumtek-hi.mp3',
      ne: '/audio/rumtek-ne.mp3',
      lep: '/audio/rumtek-lep.mp3',
      sik: '/audio/rumtek-sik.mp3',
    },
  },
  {
    id: '2',
    name: 'Pemayangtse Monastery',
    slug: 'pemayangtse-monastery',
    district: 'West',
    latitude: 27.2106,
    longitude: 88.2133,
    elevation: 2085,
    summary: 'The "Perfect Sublime Lotus" - premier monastery of the Nyingma sect in Sikkim.',
    description: 'Pemayangtse Monastery, meaning "Perfect Sublime Lotus," is one of the oldest and most prestigious monasteries in Sikkim. Founded in 1705, it belongs to the Nyingma sect and is known for its intricate woodwork, ancient murals, and a magnificent seven-tiered wooden sculpture depicting the celestial palace of Guru Rinpoche.',
    sect: 'Nyingma',
    founded: '1705',
    significance: 'Premier Nyingma monastery in Sikkim',
    visitingHours: '7:00 AM - 5:00 PM',
    bestTimeToVisit: 'October to December, March to May',
    nearestTown: 'Pelling (2 km)',
    distanceFromCapital: '110 km from Gangtok',
    tags: ['Nyingma', 'Ancient', 'Woodwork', 'Guru Rinpoche'],
    images: {
    hero: pemayangtseImage,
    gallery: [pemayangtseImage],
    panorama: '/images/panoramas/pemayangtse-360.jpg',
  },
    audio: {
      en: '/audio/pemayangtse-en.mp3',
      hi: '/audio/pemayangtse-hi.mp3',
      ne: '/audio/pemayangtse-ne.mp3',
      lep: '/audio/pemayangtse-lep.mp3',
      sik: '/audio/pemayangtse-sik.mp3',
    },
  },
  {
    id: '3',
    name: 'Tashiding Monastery',
    slug: 'tashiding-monastery',
    district: 'West',
    latitude: 27.2167,
    longitude: 88.2667,
    elevation: 1465,
    summary: 'The "Devoted Central Glory" monastery, sacred to all Buddhist sects in Sikkim.',
    description: 'Tashiding Monastery, built in 1717, holds a unique position as it is revered by all Buddhist sects in Sikkim. Located on a heart-shaped hill between the Rathong and Rangeet rivers, it is famous for the sacred Bhumchu ceremony and is considered the holiest monastery in Sikkim by many devotees.',
    sect: 'Nyingma',
    founded: '1717',
    significance: 'Sacred to all Buddhist sects in Sikkim',
    visitingHours: '6:00 AM - 6:00 PM',
    bestTimeToVisit: 'October to March',
    nearestTown: 'Yuksom (19 km)',
    distanceFromCapital: '125 km from Gangtok',
    tags: ['Nyingma', 'Sacred', 'Bhumchu', 'Pilgrimage'],
    images: {
      hero: tashidingImage,
      gallery: [tashidingImage],
      panorama: tashidingImage,
    },
    audio: {
      en: '/audio/tashiding-en.mp3',
      hi: '/audio/tashiding-hi.mp3',
      ne: '/audio/tashiding-ne.mp3',
      lep: '/audio/tashiding-lep.mp3',
      sik: '/audio/tashiding-sik.mp3',
    },
  },
  {
    id: '4',
    name: 'Enchey Monastery',
    slug: 'enchey-monastery',
    district: 'East',
    latitude: 27.3433,
    longitude: 88.6167,
    elevation: 1675,
    summary: 'The "Solitary Temple" overlooking Gangtok, famous for its annual Cham dance.',
    description: 'Enchey Monastery, meaning "Solitary Temple," was established in 1909 and belongs to the Nyingma sect. Perched on a ridge overlooking Gangtok, it is renowned for its annual Cham dance during the Enchey festival and houses several important Buddhist relics and scriptures.',
    sect: 'Nyingma',
    founded: '1909',
    significance: 'Guardian deity Mahakala temple',
    visitingHours: '5:00 AM - 7:00 PM',
    bestTimeToVisit: 'Year-round',
    nearestTown: 'Gangtok (3 km)',
    distanceFromCapital: '3 km from Gangtok',
    tags: ['Nyingma', 'Cham Dance', 'Gangtok', 'Mahakala'],
    images: {
      hero: encheyImage,
      gallery: [encheyImage],
      panorama: encheyImage,
    },
    audio: {
      en: '/audio/enchey-en.mp3',
      hi: '/audio/enchey-hi.mp3',
      ne: '/audio/enchey-ne.mp3',
      lep: '/audio/enchey-lep.mp3',
      sik: '/audio/enchey-sik.mp3',
    },
  },
  {
    id: '5',
    name: 'Ralang Monastery',
    slug: 'ralang-monastery',
    district: 'South',
    latitude: 27.2833,
    longitude: 88.5167,
    elevation: 1200,
    summary: 'The "Small Heaven" monastery, second most important Kagyu monastery in Sikkim.',
    description: 'Ralang Monastery, also known as Ralung Monastery, is considered the second most important monastery of the Kagyu sect in Sikkim after Rumtek. Founded in 1768, it is famous for its annual Pang Lhabsol festival and houses many sacred relics brought from Tibet.',
    sect: 'Kagyu',
    founded: '1768',
    significance: 'Second most important Kagyu monastery',
    visitingHours: '6:00 AM - 6:00 PM',
    bestTimeToVisit: 'October to March',
    nearestTown: 'Ravangla (10 km)',
    distanceFromCapital: '65 km from Gangtok',
    tags: ['Kagyu', 'Pang Lhabsol', 'Sacred Relics'],
    images: {
      hero: '/images/ralang-hero.jpg',
      gallery: ['/images/ralang-1.jpg'],
    },
    audio: {},
  },
  {
    id: '6',
    name: 'Sang Monastery',
    slug: 'sang-monastery',
    district: 'North',
    latitude: 27.4167,
    longitude: 88.5833,
    elevation: 2000,
    summary: 'Ancient monastery near Lachen, gateway to the sacred Gurudongmar Lake.',
    description: 'Sang Monastery is an ancient monastery located near Lachen in North Sikkim. It serves as an important spiritual center for the local community and is often visited by pilgrims on their way to the sacred Gurudongmar Lake. The monastery offers stunning views of the surrounding Himalayan peaks.',
    sect: 'Nyingma',
    founded: '1912',
    significance: 'Gateway monastery to Gurudongmar Lake',
    visitingHours: '6:00 AM - 5:00 PM',
    bestTimeToVisit: 'April to October',
    nearestTown: 'Lachen (5 km)',
    distanceFromCapital: '125 km from Gangtok',
    tags: ['Nyingma', 'Himalayan', 'Gurudongmar', 'High Altitude'],
    images: {
      hero: '/images/sang-hero.jpg',
      gallery: ['/images/sang-1.jpg'],
    },
    audio: {},
  },
  {
    id: '7',
    name: 'Phensang Monastery',
    slug: 'phensang-monastery',
    district: 'North',
    latitude: 27.4500,
    longitude: 88.6000,
    elevation: 2200,
    summary: 'Remote monastery in North Sikkim, known for its meditation retreats.',
    description: 'Phensang Monastery is a remote and peaceful monastery located in the pristine landscapes of North Sikkim. Known for its intensive meditation retreats and traditional Buddhist teachings, it attracts serious practitioners seeking spiritual solitude away from the bustling world.',
    sect: 'Gelug',
    founded: '1947',
    significance: 'Meditation and retreat center',
    visitingHours: '7:00 AM - 4:00 PM',
    bestTimeToVisit: 'May to September',
    nearestTown: 'Lachung (12 km)',
    distanceFromCapital: '140 km from Gangtok',
    tags: ['Gelug', 'Meditation', 'Retreat', 'Remote'],
    images: {
      hero: '/images/phensang-hero.jpg',
      gallery: ['/images/phensang-1.jpg'],
    },
    audio: {},
  },
  {
    id: '8',
    name: 'Sanga Choeling Monastery',
    slug: 'sanga-choeling-monastery',
    district: 'West',
    latitude: 27.2083,
    longitude: 88.2083,
    elevation: 2100,
    summary: 'The "Island of Esoteric Teaching" - oldest monastery in Sikkim.',
    description: 'Sanga Choeling Monastery, meaning "Island of Esoteric Teaching," is the oldest monastery in Sikkim, built in 1697. Located on a ridge above Pelling, it offers breathtaking views of the Kanchenjunga range and houses ancient murals and sculptures that are considered invaluable treasures of Buddhist art.',
    sect: 'Nyingma',
    founded: '1697',
    significance: 'Oldest monastery in Sikkim',
    visitingHours: '6:00 AM - 5:00 PM',
    bestTimeToVisit: 'October to May',
    nearestTown: 'Pelling (7 km)',
    distanceFromCapital: '115 km from Gangtok',
    tags: ['Nyingma', 'Oldest', 'Kanchenjunga View', 'Ancient Art'],
    images: {
      hero: '/images/sanga-hero.jpg',
      gallery: ['/images/sanga-1.jpg'],
    },
    audio: {},
  },
  {
    id: '9',
    name: 'Changey Waterfalls Monastery',
    slug: 'changey-waterfalls-monastery',
    district: 'South',
    latitude: 27.2500,
    longitude: 88.4833,
    elevation: 1800,
    summary: 'Serene monastery near the beautiful Changey Waterfalls.',
    description: 'Located near the spectacular Changey Waterfalls, this monastery offers a unique combination of spiritual serenity and natural beauty. The sound of cascading water provides a natural soundtrack for meditation and prayer, making it a favored spot for both monks and visitors seeking peace.',
    sect: 'Kagyu',
    founded: '1920',
    significance: 'Monastery with natural meditation sounds',
    visitingHours: '6:00 AM - 6:00 PM',
    bestTimeToVisit: 'March to November',
    nearestTown: 'Namchi (15 km)',
    distanceFromCapital: '75 km from Gangtok',
    tags: ['Kagyu', 'Waterfall', 'Natural Beauty', 'Meditation'],
    images: {
      hero: '/images/changey-hero.jpg',
      gallery: ['/images/changey-1.jpg'],
    },
    audio: {},
  },
  {
    id: '10',
    name: 'Yuksom Monastery',
    slug: 'yuksom-monastery',
    district: 'West',
    latitude: 27.1833,
    longitude: 88.2167,
    elevation: 1780,
    summary: 'Monastery in the historic first capital of Sikkim.',
    description: 'Yuksom Monastery is located in the historically significant town of Yuksom, the first capital of Sikkim where the first Chogyal was crowned in 1642. The monastery serves as a testament to Sikkim\'s rich Buddhist heritage and royal history, housing important historical artifacts and scriptures.',
    sect: 'Nyingma',
    founded: '1642',
    significance: 'Located in first capital of Sikkim',
    visitingHours: '6:00 AM - 6:00 PM',
    bestTimeToVisit: 'March to May, September to November',
    nearestTown: 'Yuksom (1 km)',
    distanceFromCapital: '140 km from Gangtok',
    tags: ['Nyingma', 'Historical', 'First Capital', 'Royal Heritage'],
    images: {
      hero: '/images/yuksom-hero.jpg',
      gallery: ['/images/yuksom-1.jpg'],
    },
    audio: {},
  },
  {
    id: '11',
    name: 'Lingdum Monastery',
    slug: 'lingdum-monastery',
    district: 'East',
    latitude: 27.2833,
    longitude: 88.5667,
    elevation: 1600,
    summary: 'The "Sacred Enclave" - a modern monastery with traditional values.',
    description: 'Lingdum Monastery, meaning "Sacred Enclave," is a relatively modern monastery built in 1999. Despite its recent construction, it follows traditional Buddhist architecture and practices. The monastery is known for its peaceful environment, well-maintained gardens, and its role in preserving traditional Buddhist teachings for future generations.',
    sect: 'Zurmang Kagyu',
    founded: '1999',
    significance: 'Modern monastery with traditional practices',
    visitingHours: '6:00 AM - 7:00 PM',
    bestTimeToVisit: 'Year-round',
    nearestTown: 'Ranka (2 km)',
    distanceFromCapital: '17 km from Gangtok',
    tags: ['Zurmang Kagyu', 'Modern', 'Traditional', 'Gardens'],
    images: {
      hero: '/images/lingdum-hero.jpg',
      gallery: ['/images/lingdum-1.jpg'],
    },
    audio: {},
  },
  {
    id: '12',
    name: 'Tendong Hill Monastery',
    slug: 'tendong-hill-monastery',
    district: 'South',
    latitude: 27.2667,
    longitude: 88.4667,
    elevation: 2600,
    summary: 'Monastery atop sacred Tendong Hill, protector of Sikkim.',
    description: 'Perched atop the sacred Tendong Hill, this monastery holds special significance in Sikkimese folklore as the hill that saved the people during the great flood. The monastery offers panoramic views of the surrounding valleys and is considered a powerful spiritual site for protection and blessings.',
    sect: 'Bon/Buddhist Syncretism',
    founded: '1880',
    significance: 'Built on sacred protective hill',
    visitingHours: '6:00 AM - 5:00 PM',
    bestTimeToVisit: 'October to March',
    nearestTown: 'Damthang (8 km)',
    distanceFromCapital: '58 km from Gangtok',
    tags: ['Bon', 'Sacred Hill', 'Folklore', 'Protection'],
    images: {
      hero: '/images/tendong-hero.jpg',
      gallery: ['/images/tendong-1.jpg'],
    },
    audio: {},
  },
];

export const getMonasteryBySlug = (slug: string): Monastery | undefined => {
  return monasteries.find(monastery => monastery.slug === slug);
};

export const getMonasteriesByDistrict = (district: string): Monastery[] => {
  return monasteries.filter(monastery => monastery.district === district);
};