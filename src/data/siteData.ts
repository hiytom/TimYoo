export type IconKey =
  | 'dollarSign'
  | 'factory'
  | 'shieldCheck'
  | 'fileCheck'
  | 'users'
  | 'trendingUp'
  | 'settings'
  | 'repeat'
  | 'briefcase'
  | 'handshake'
  | 'mapPin'
  | 'box'
  | 'activity'
  | 'calendar';

export interface NavItem {
  name: string;
  path: string;
}

export interface HeroFeature {
  title: string;
  descriptionLines: string[];
  icon: IconKey;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: IconKey;
  details: string[];
}

export interface ProductItem {
  id: number;
  category: string;
  name: string;
  descriptionLines: string[];
  image: string;
}

export interface CaseStudySection {
  title: string;
  content: string[];
}

export interface CaseStudyItem {
  id: number;
  client: string;
  image: string;
  imagePosition?: 'center' | 'top';
  tags: string[];
  reverseLayout: boolean;
  sections: CaseStudySection[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface TeamMember {
  role: string;
  image: string;
}

export interface IconTextItem {
  text: string;
  icon: IconKey;
}

export interface FacilityItem {
  name: string;
  icon: IconKey;
}

export const siteData = {
  navItems: [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/#products' },
    { name: 'Case Studies', path: '/#case-studies' },
    { name: 'About Us', path: '/#about' },
  ] satisfies NavItem[],

  hero: {
    backgroundImage: '/assets/hero-factory-background.jpg',
    heading: {
      title: 'Reduce Apparel Sourcing Costs',
      accent: 'Without Losing Control',
    },
    subtitle: 'Cambodia-based apparel manufacturing for repeat programs.',
    features: [
      {
        title: 'Cost Advantage',
        descriptionLines: ['Lower landed cost', 'EU duty-free under EBA', 'No US tariffs'],
        icon: 'dollarSign',
      },
      {
        title: 'Stable Capacity',
        descriptionLines: ['Dual factories', '150,000+ pcs/month'],
        icon: 'factory',
      },
      {
        title: 'Global Track Record',
        descriptionLines: ['A supplier you do not replace', '10M+ units delivered'],
        icon: 'users',
      },
      {
        title: 'Quality Control',
        descriptionLines: ['Trusted for brand inspections in Cambodia'],
        icon: 'shieldCheck',
      },
      {
        title: 'Compliance Ready',
        descriptionLines: ['Audit-ready, stress-free'],
        icon: 'fileCheck',
      },
    ] satisfies HeroFeature[],
    endorsement: 'Trusted by European hospitality brands and international fashion partners',
  },

  featuresSection: {
    title: 'Why Choose Us',
    description:
      'We combine cost efficiency with premium quality to deliver exceptional value for global brands.',
    items: [
      {
        title: 'Cost Advantage',
        description: 'Maximize your margins with our strategic location and direct sourcing model.',
        icon: 'dollarSign',
        details: [
          '0% Duty to EU (EBA)',
          'No additional US tariffs',
          'Factory direct pricing (No middleman)',
          'Save 15-27% on annual sourcing costs',
        ],
      },
      {
        title: 'Stable Capacity',
        description: 'Reliable production capabilities to meet your growing demands.',
        icon: 'factory',
        details: [
          'Dual factory sites (~12,000 m2)',
          '50+ Advanced JUKI machines',
          'Monthly output: 150,000+ pcs',
          '20-30% capacity reserved for partners',
        ],
      },
      {
        title: 'Quality Control',
        description: 'Uncompromising quality standards at every stage of production.',
        icon: 'shieldCheck',
        details: [
          'Rigorous in-line inspections',
          'Final AQL quality checks',
          'Experienced QC team',
          'Zero-defect policy',
        ],
      },
      {
        title: 'Compliance Ready',
        description: 'Fully certified and ready for international brand audits.',
        icon: 'fileCheck',
        details: [
          'BSCI / GRS / OEKO-TEX 100 Certified',
          'Supports international brand audits',
          'Complete compliance documentation',
          'Transparent test reports',
        ],
      },
      {
        title: 'Proven by Global Brands',
        description: 'Trusted partner for major international retailers and brands.',
        icon: 'users',
        details: [
          '12+ years with European F&B giants',
          'SE Asia knitwear hub for fast fashion',
          'Delivered 8M+ chef uniforms & workwear',
          'Long-term strategic partnerships',
        ],
      },
    ] satisfies FeatureItem[],
  },

  productsSection: {
    title: 'Our Products',
    description: 'Core categories we produce for repeat programs',
    items: [
      {
        id: 1,
        category: 'Chef Wear',
        name: 'For restaurant groups and catering brands',
        descriptionLines: ['Durable, wash-resistant workwear', 'Stable sizing for long-term supply'],
        image: '/assets/chef-wear-user-upload.jpg',
      },
      {
        id: 2,
        category: 'Casuals',
        name: 'For global lifestyle and fashion brands',
        descriptionLines: ['Seasonal and repeat apparel programs', 'Reliable quality for every collection'],
        image: '/assets/casuals-replacement.jpg',
      },
      {
        id: 3,
        category: 'Aprons',
        name: 'For hospitality and professional kitchens',
        descriptionLines: ['Built for daily commercial use', 'Fully customizable for repeat programs'],
        image: '/assets/apron.jpg',
      },
    ] satisfies ProductItem[],
  },

  caseStudiesSection: {
    title: 'Why Brands Stay With Us',
    description: 'Long-term partnerships built on reliability, consistency, and trust.',
    items: [
      {
        id: 1,
        client: 'UK Hospitality Industry Leader',
        image: '/assets/uk-hospitality-case-study.jpg',
        tags: ['Catering Equipment', 'UK Market'],
        reverseLayout: false,
        sections: [
          {
            title: 'Background',
            content: ['A leading UK hospitality supply group serving professional kitchens across Europe.'],
          },
          {
            title: 'Why they stayed',
            content: ['Program-based production with predictable delivery and consistent quality.'],
          },
          {
            title: 'Outcome',
            content: [
              'An 18+ year partnership delivering over 8 million units.',
              "Supporting the client's growth into a leading hospitality supplier in the UK.",
            ],
          },
        ],
      },
      {
        id: 2,
        client: 'Global Fashion Brand (Confidential)',
        image: '/assets/global-fashion-case-study.jpg',
        imagePosition: 'top',
        tags: ['Fast Fashion', 'Global Market'],
        reverseLayout: true,
        sections: [
          {
            title: 'Background',
            content: ['A leading international fashion brand running fast-paced, multi-market apparel programs.'],
          },
          {
            title: 'Why they stayed',
            content: ['Stable capacity, built-in quality controls, and audit-ready execution across repeat styles.'],
          },
          {
            title: 'Outcome',
            content: ['Ongoing approved-supplier status, repeat seasonal production, consistent on-time delivery.'],
          },
        ],
      },
    ] satisfies CaseStudyItem[],
  },

  aboutSection: {
    header: {
      title: 'About Us',
      description: 'A Manufacturing Partner Buyers Can Rely On',
    },
    timeline: {
      title: 'Our Journey',
      description: 'Rooted in China, growing across Southeast Asia.',
      events: [
        {
          year: 'Before 2018',
          title: '',
          description: 'Manufacturing Roots in China',
        },
        {
          year: '2018-2024',
          title: '',
          description: 'First Cambodia factory established, with six years of stable operations.',
        },
        {
          year: '2025',
          title: '',
          description: 'Second Cambodia factory launched.',
        },
      ] satisfies TimelineEvent[],
    },
    teams: {
      title: 'The Teams Behind Every Program',
      description: 'Clear roles. Accountable execution.',
      members: [
        {
          role: 'Production Team',
          image:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.1.0&q=75&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max',
        },
        {
          role: 'Merchandising Team',
          image:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.1.0&q=75&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max',
        },
        {
          role: 'Operations & Support Team',
          image:
            'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.1.0&q=75&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max',
        },
      ] satisfies TeamMember[],
    },
    facilities: {
      title: 'Our Facilities & Capacity',
      description: 'Two factories in Cambodia, ensuring stable capacity for repeat programs.',
      items: [
        { name: '2 Factories in Cambodia', icon: 'mapPin' },
        { name: '300+ Skilled Local Workers', icon: 'users' },
        { name: '12 Program-Based Production Lines', icon: 'activity' },
        { name: '150,000+ Units Monthly Capacity', icon: 'box' },
        { name: '20+ Units Specialized Machines In-House', icon: 'settings' },
        { name: '6+ Years Operating in Cambodia', icon: 'calendar' },
      ] satisfies FacilityItem[],
    },
  },

  homeAboutSection: {
    value: {
      title: 'The Value We Bring to Your Business',
      items: [
        { text: 'More Predictable Growth', icon: 'trendingUp' },
        { text: 'Lower Supply Chain Costs', icon: 'dollarSign' },
        { text: 'Less Operational Friction', icon: 'settings' },
        { text: 'Stronger Support for Repeat Programs', icon: 'repeat' },
      ] satisfies IconTextItem[],
    },
    whoWeWorkWith: {
      title: 'Who We Work With Best',
      items: [
        { text: 'Brands running repeat programs', icon: 'briefcase' },
        { text: 'Buyers who need stable capacity', icon: 'users' },
        { text: 'Teams seeking long-term partners', icon: 'handshake' },
      ] satisfies IconTextItem[],
    },
    cta: {
      title: 'Start Your Next Program With Less Risk',
      description: "Share your product and timeline. We'll review and respond within 24 hours.",
      email: 'huiwang@starrystraind.com',
      buttonLabel: 'Discuss Your Program',
    },
  },

  footer: {
    summary:
      'Helping global brands reduce sourcing costs while keeping quality and delivery under control.',
    quickLinks: [
      { name: 'Home', path: '#' },
      { name: 'Products', path: '#products' },
      { name: 'Case Studies', path: '#case-studies' },
      { name: 'About Us', path: '#about' },
    ] satisfies Array<{ name: string; path: string }>,
    contact: {
      addressLines: ['123 Manufacturing Zone,', 'Industrial District, Southeast Asia'],
      phone: '+1 (555) 123-4567',
      email: 'huiwang@starrystraind.com',
    },
    companyName: 'TIMYOO',
  },
} as const;
