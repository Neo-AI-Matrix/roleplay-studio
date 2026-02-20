import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie } from 'lucide-react';
import { FAQ } from '@/components/FAQ';
import { SchemaScript, getCookiesPageSchema } from '@/lib/schema';

const cookiesFAQs = [
  {
    question: "Can I use Roleplay Studio without cookies?",
    answer: "Some cookies are essential for the Service to function properly, including authentication cookies that keep you logged in. You can disable optional cookies (analytics and marketing), but disabling essential cookies will prevent you from using the platform."
  },
  {
    question: "How do I opt out of analytics tracking?",
    answer: "You can opt out of analytics cookies through your browser settings, use the Google Analytics Opt-out Browser Add-on, or adjust your preferences through the cookie consent banner when you first visit our site. Enterprise customers can request analytics be disabled for their organization."
  },
  {
    question: "Do you use cookies to track me across other websites?",
    answer: "We use marketing cookies from third parties (like Google and Facebook) that may track activity across websites for advertising purposes. You can opt out of these through the Digital Advertising Alliance opt-out tool or by adjusting your ad preferences on those platforms."
  },
  {
    question: "How long do your cookies last?",
    answer: "Cookie duration varies by type. Session cookies expire when you close your browser. Persistent cookies can last from 24 hours (analytics) to 2 years (authentication). See the cookie tables above for specific durations."
  },
  {
    question: "Are cookies the same as tracking pixels?",
    answer: "No, but they serve similar purposes. Cookies are text files stored on your device, while pixels are tiny images embedded in pages or emails that can track views and actions. We use both technologies as described in this policy."
  },
  {
    question: "Will blocking cookies affect my experience?",
    answer: "Yes, blocking cookies may impact your experience. Essential cookies are required for login and security. Blocking functional cookies means we won't remember your preferences. Blocking analytics cookies means we can't improve the product based on usage patterns."
  }
];

const cookieCategories = [
  {
    name: 'Strictly Necessary Cookies',
    description: 'These cookies are essential for you to browse the website and use its features. Without these cookies, services like user authentication and security cannot be provided.',
    canDisable: false,
    cookies: [
      {
        name: '__clerk_db_jwt',
        provider: 'Clerk',
        purpose: 'User authentication and session management',
        duration: 'Session',
      },
      {
        name: '__client_uat',
        provider: 'Clerk',
        purpose: 'User authentication token',
        duration: '1 year',
      },
      {
        name: '__session',
        provider: 'Roleplay Studio',
        purpose: 'Maintains user session state',
        duration: 'Session',
      },
      {
        name: 'csrf_token',
        provider: 'Roleplay Studio',
        purpose: 'Security token to prevent cross-site request forgery',
        duration: 'Session',
      },
    ],
  },
  {
    name: 'Functional Cookies',
    description: 'These cookies allow the website to remember choices you make and provide enhanced, personalized features.',
    canDisable: true,
    cookies: [
      {
        name: 'preferences',
        provider: 'Roleplay Studio',
        purpose: 'Stores user preferences (theme, language, settings)',
        duration: '1 year',
      },
      {
        name: 'recently_viewed',
        provider: 'Roleplay Studio',
        purpose: 'Remembers recently viewed scenarios',
        duration: '30 days',
      },
      {
        name: 'volume_level',
        provider: 'Roleplay Studio',
        purpose: 'Stores audio volume preferences for voice sessions',
        duration: '1 year',
      },
    ],
  },
  {
    name: 'Analytics Cookies',
    description: 'These cookies collect information about how you use our website, such as which pages you visit most often. This data helps us improve our website and your experience.',
    canDisable: true,
    cookies: [
      {
        name: '_ga',
        provider: 'Google Analytics',
        purpose: 'Distinguishes unique users by assigning a randomly generated number',
        duration: '2 years',
      },
      {
        name: '_ga_*',
        provider: 'Google Analytics',
        purpose: 'Used to persist session state',
        duration: '2 years',
      },
      {
        name: '_gid',
        provider: 'Google Analytics',
        purpose: 'Distinguishes users for analytics',
        duration: '24 hours',
      },
      {
        name: '_gat',
        provider: 'Google Analytics',
        purpose: 'Used to throttle request rate',
        duration: '1 minute',
      },
      {
        name: 'mp_*',
        provider: 'Mixpanel',
        purpose: 'Product analytics and user behavior tracking',
        duration: '1 year',
      },
      {
        name: '_hp2_id.*',
        provider: 'Heap Analytics',
        purpose: 'User identification for product analytics',
        duration: '1 year',
      },
    ],
  },
  {
    name: 'Marketing Cookies',
    description: 'These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.',
    canDisable: true,
    cookies: [
      {
        name: '_fbp',
        provider: 'Facebook/Meta',
        purpose: 'Used by Facebook to deliver advertisements',
        duration: '3 months',
      },
      {
        name: '_gcl_au',
        provider: 'Google Ads',
        purpose: 'Used by Google AdSense for advertising efficiency',
        duration: '3 months',
      },
      {
        name: 'li_fat_id',
        provider: 'LinkedIn',
        purpose: 'Member indirect identifier for conversion tracking',
        duration: '30 days',
      },
      {
        name: '_uetsid',
        provider: 'Microsoft/Bing',
        purpose: 'Bing Ads conversion tracking',
        duration: '1 day',
      },
      {
        name: 'hubspotutk',
        provider: 'HubSpot',
        purpose: 'Tracks visitor identity for marketing automation',
        duration: '6 months',
      },
    ],
  },
];

const thirdPartyServices = [
  {
    name: 'Clerk',
    purpose: 'User authentication and identity management',
    privacyUrl: 'https://clerk.com/privacy',
  },
  {
    name: 'Vercel',
    purpose: 'Website hosting and analytics',
    privacyUrl: 'https://vercel.com/legal/privacy-policy',
  },
  {
    name: 'Google Analytics',
    purpose: 'Website traffic and usage analytics',
    privacyUrl: 'https://policies.google.com/privacy',
  },
  {
    name: 'OpenAI',
    purpose: 'AI conversation processing',
    privacyUrl: 'https://openai.com/privacy',
  },
  {
    name: 'ElevenLabs',
    purpose: 'Voice synthesis for AI agents',
    privacyUrl: 'https://elevenlabs.io/privacy',
  },
  {
    name: 'Stripe',
    purpose: 'Payment processing',
    privacyUrl: 'https://stripe.com/privacy',
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="relative overflow-hidden">
      <SchemaScript schema={getCookiesPageSchema()} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet/20 via-transparent to-transparent" />

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-gradient-to-r from-violet to-cyan text-white border-0">
              <Cookie className="w-3 h-3 mr-1" />
              Legal
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: February 14, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
              <p className="text-muted-foreground mb-4">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is being used.
              </p>
              <p className="text-muted-foreground">
                We use cookies and similar technologies (such as web beacons, pixels, and local storage) to operate our Service, analyze usage, personalize your experience, and deliver relevant advertising.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">How We Use Cookies</h2>
              <p className="text-muted-foreground mb-4">We use cookies for the following purposes:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong className="text-white">Authentication:</strong> To recognize you when you sign in and keep you logged in</li>
                <li><strong className="text-white">Security:</strong> To protect your account and prevent fraud</li>
                <li><strong className="text-white">Preferences:</strong> To remember your settings and preferences</li>
                <li><strong className="text-white">Analytics:</strong> To understand how you use our Service and improve it</li>
                <li><strong className="text-white">Performance:</strong> To monitor and optimize site performance</li>
                <li><strong className="text-white">Marketing:</strong> To deliver relevant advertisements and measure campaign effectiveness</li>
              </ul>
            </div>

            {/* Cookie Categories */}
            {cookieCategories.map((category, i) => (
              <div key={i} className="glass-card p-8 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-2xl font-bold text-white">{category.name}</h2>
                  <Badge className={category.canDisable ? 'bg-yellow-500/20 text-yellow-400 border-0' : 'bg-cyan/20 text-cyan border-0'}>
                    {category.canDisable ? 'Optional' : 'Required'}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-violet/20">
                        <th className="text-left py-3 px-4 text-white font-semibold">Cookie Name</th>
                        <th className="text-left py-3 px-4 text-white font-semibold">Provider</th>
                        <th className="text-left py-3 px-4 text-white font-semibold">Purpose</th>
                        <th className="text-left py-3 px-4 text-white font-semibold">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.cookies.map((cookie, j) => (
                        <tr key={j} className="border-b border-violet/10">
                          <td className="py-3 px-4 text-cyan font-mono text-xs">{cookie.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{cookie.provider}</td>
                          <td className="py-3 px-4 text-muted-foreground">{cookie.purpose}</td>
                          <td className="py-3 px-4 text-muted-foreground">{cookie.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground mb-6">
                We use the following third-party services that may set cookies or collect data:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {thirdPartyServices.map((service, i) => (
                  <Card key={i} className="bg-navy/50 border-violet/20">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-white mb-1">{service.name}</h4>
                      <p className="text-muted-foreground text-sm mb-2">{service.purpose}</p>
                      <a 
                        href={service.privacyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan text-sm hover:underline"
                      >
                        View Privacy Policy →
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Managing Cookies</h2>
              
              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">Browser Settings</h3>
              <p className="text-muted-foreground mb-4">
                Most web browsers allow you to control cookies through their settings. You can typically find these settings in the &quot;Options&quot; or &quot;Preferences&quot; menu of your browser. The following links may help:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">Microsoft Edge</a></li>
              </ul>

              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">Opt-Out Links</h3>
              <p className="text-muted-foreground mb-4">
                You can opt out of certain third-party cookies using the following tools:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
                <li><a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">Facebook Ad Preferences</a></li>
                <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">Digital Advertising Alliance Opt-Out</a></li>
                <li><a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">European Interactive Digital Advertising Alliance</a></li>
              </ul>

              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">Impact of Disabling Cookies</h3>
              <p className="text-muted-foreground">
                Please note that if you disable or decline cookies, some features of our Service may not function properly. For example, you may not be able to stay logged in, and some personalization features may not work.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Do Not Track</h2>
              <p className="text-muted-foreground">
                Some browsers include a &quot;Do Not Track&quot; (DNT) feature that signals to websites that you do not want your online activity tracked. Currently, there is no universally accepted standard for how to respond to DNT signals. We do not currently respond to DNT signals, but you can use the cookie management options described above to control tracking.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. When we make changes, we will update the &quot;Last updated&quot; date at the top of this page. We encourage you to review this policy periodically.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
              </p>
              <div className="text-muted-foreground">
                <p><strong className="text-white">Email:</strong> privacy@roleplaystudio.ai</p>
                <p><strong className="text-white">Address:</strong> Roleplay Studio, Inc.</p>
                <p>San Francisco, CA</p>
              </div>
            </div>
          </div>
          
          {/* Cookies FAQ */}
          <FAQ 
            faqs={cookiesFAQs}
            title="Cookie FAQ"
            subtitle="Common questions about our use of cookies"
          />
        </div>
      </div>
    </div>
  );
}
