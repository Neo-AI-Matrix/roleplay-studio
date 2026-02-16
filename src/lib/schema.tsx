// SEO Schema (JSON-LD Structured Data) for Roleplay Studio
// https://schema.org

const SITE_URL = 'https://roleplaystudio.ai';
const SITE_NAME = 'Roleplay Studio';
const LOGO_URL = `${SITE_URL}/logo.png`;

// Organization Schema - used across pages
export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: 512,
    height: 512,
  },
  sameAs: [
    'https://twitter.com/roleplaystudio',
    'https://linkedin.com/company/roleplaystudio',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@roleplaystudio.ai',
  },
};

// WebSite Schema - for homepage
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// Software Application Schema - main product
export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Roleplay Studio',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Training Software',
  operatingSystem: 'Web Browser',
  description: 'AI-powered voice training platform for practicing sales calls, customer support, HR conversations, and professional communication skills with realistic AI personas.',
  offers: {
    '@type': 'Offer',
    price: '29.00',
    priceCurrency: 'USD',
    priceValidUntil: '2027-12-31',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '50',
    bestRating: '5',
    worstRating: '1',
  },
  featureList: [
    'Voice-based AI roleplay training',
    'Realistic conversation simulations',
    'Sales training scenarios',
    'Customer support practice',
    'HR conversation training',
    'Leadership communication skills',
    'Real-time feedback and scoring',
    'Progress tracking and achievements',
  ],
  screenshot: `${SITE_URL}/screenshots/voice-session.png`,
  provider: organizationSchema,
};

// Homepage Schema
export function getHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...organizationSchema,
        '@context': 'https://schema.org',
      },
      websiteSchema,
      softwareApplicationSchema,
    ],
  };
}

// Product Page Schema
export function getProductPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      softwareApplicationSchema,
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/product`,
        name: 'Product - Roleplay Studio',
        description: 'Discover how Roleplay Studio uses AI voice technology to help you practice professional conversations and improve your communication skills.',
        url: `${SITE_URL}/product`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does Roleplay Studio work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Roleplay Studio uses advanced AI voice technology to create realistic conversation partners. You practice speaking with AI personas that respond naturally, helping you prepare for sales calls, difficult conversations, and professional situations.',
            },
          },
          {
            '@type': 'Question',
            name: 'What scenarios are available?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We offer 28+ training scenarios across sales, customer support, HR, communication, and leadership categories. Each scenario features unique AI personas with distinct personalities and challenges.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there a free trial?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can try Roleplay Studio free with limited sessions to experience our AI voice training before subscribing to the full plan at $29/month.',
            },
          },
        ],
      },
    ],
  };
}

// About Page Schema
export function getAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/about`,
    name: 'About Roleplay Studio',
    description: 'Learn about Roleplay Studio, our mission to democratize professional training, and how we use AI to help people practice high-stakes conversations.',
    url: `${SITE_URL}/about`,
    mainEntity: organizationSchema,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
}

// Enterprise Page Schema
export function getEnterprisePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/enterprise`,
        name: 'Enterprise Solutions - Roleplay Studio',
        description: 'Scale AI-powered conversation training across your organization. Custom scenarios, team analytics, and enterprise-grade security for sales teams, support centers, and HR departments.',
        url: `${SITE_URL}/enterprise`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'Product',
        name: 'Roleplay Studio Enterprise',
        description: 'Enterprise-grade AI conversation training platform with custom scenarios, team management, analytics dashboards, and SSO integration.',
        brand: organizationSchema,
        category: 'Business Training Software',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Custom pricing based on team size and requirements',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  };
}

// Contact Page Schema
export function getContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact`,
    name: 'Contact Us - Roleplay Studio',
    description: 'Get in touch with the Roleplay Studio team. We\'re here to help with questions about our AI training platform, enterprise solutions, or partnership opportunities.',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      email: 'support@roleplaystudio.ai',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@roleplaystudio.ai',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'sales@roleplaystudio.ai',
        },
      ],
    },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
}

// Privacy Policy Schema
export function getPrivacyPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/privacy`,
    name: 'Privacy Policy - Roleplay Studio',
    description: 'Roleplay Studio privacy policy. Learn how we collect, use, and protect your personal information.',
    url: `${SITE_URL}/privacy`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: 'Privacy Policy',
    },
  };
}

// Terms of Service Schema
export function getTermsPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/terms`,
    name: 'Terms of Service - Roleplay Studio',
    description: 'Roleplay Studio terms of service. Read our terms and conditions for using our AI training platform.',
    url: `${SITE_URL}/terms`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: 'Terms of Service',
    },
  };
}

// Careers Page Schema
export function getCareersPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/careers`,
    name: 'Careers - Roleplay Studio',
    description: 'Join the Roleplay Studio team. We\'re building the future of AI-powered professional training.',
    url: `${SITE_URL}/careers`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: organizationSchema,
  };
}

// Cookie Policy Schema
export function getCookiesPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/cookies`,
    name: 'Cookie Policy - Roleplay Studio',
    description: 'Roleplay Studio cookie policy. Learn about how we use cookies and similar technologies.',
    url: `${SITE_URL}/cookies`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
}

// Reusable Schema Script Component
export function SchemaScript({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
