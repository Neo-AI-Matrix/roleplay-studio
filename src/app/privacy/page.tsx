import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet/20 via-transparent to-transparent" />

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-violet/30 text-white border-violet/50">
              <Shield className="w-3 h-3 mr-1" />
              Legal
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: February 14, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4">
                Roleplay Studio (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered training platform.
              </p>
              <p className="text-muted-foreground">
                Please read this privacy policy carefully. By using Roleplay Studio, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Information We Collect</h2>
              
              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">Personal Information</h3>
              <p className="text-muted-foreground mb-4">When you register for an account, we may collect:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Name and email address</li>
                <li>Company name and job title</li>
                <li>Billing information (processed securely by our payment provider)</li>
                <li>Profile information you choose to provide</li>
              </ul>

              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">Usage Information</h3>
              <p className="text-muted-foreground mb-4">We automatically collect certain information when you use our platform:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Training session data (scenarios practiced, scores, duration)</li>
                <li>Device and browser information</li>
                <li>IP address and general location</li>
                <li>Pages visited and features used</li>
              </ul>

              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">Training Session Data</h3>
              <p className="text-muted-foreground">
                When you use our AI roleplay features, we process conversation transcripts and voice data to provide the service. This data is used to generate feedback and track your progress. Voice recordings are processed in real-time and are not permanently stored unless you explicitly choose to save a session for review.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions and abuse</li>
                <li>Personalize and improve your experience</li>
                <li>Develop new products, services, and features</li>
              </ul>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground mb-4">We do not sell your personal information. We may share your information in the following situations:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong className="text-white">Service Providers:</strong> With third-party vendors who perform services on our behalf (hosting, analytics, payment processing)</li>
                <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong className="text-white">With Your Consent:</strong> When you have given us permission to share your information</li>
              </ul>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Encryption of data in transit (TLS 1.3) and at rest (AES-256)</li>
                <li>Regular security assessments and monitoring</li>
                <li>Access controls and authentication requirements</li>
                <li>Employee training on data protection</li>
              </ul>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Your Rights and Choices</h2>
              
              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">For All Users</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Access and update your account information at any time</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>

              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">For California Residents (CCPA)</h3>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Know what personal information is being collected</li>
                <li>Know whether your personal information is sold or disclosed and to whom</li>
                <li>Say no to the sale of personal information (we do not sell your data)</li>
                <li>Access your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Not be discriminated against for exercising your privacy rights</li>
              </ul>

              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">For EU/EEA Residents (GDPR)</h3>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Restrict processing of your personal data</li>
                <li>Data portability</li>
                <li>Object to processing of your personal data</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal information for as long as your account is active or as needed to provide you services. We may retain certain information for legitimate business purposes or as required by law. When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legal or regulatory purposes.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">Our platform uses the following third-party services:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong className="text-white">Clerk:</strong> Authentication and user management</li>
                <li><strong className="text-white">Vercel:</strong> Hosting and infrastructure</li>
                <li><strong className="text-white">OpenAI:</strong> AI conversation processing</li>
                <li><strong className="text-white">ElevenLabs:</strong> Voice synthesis and processing</li>
                <li><strong className="text-white">Stripe:</strong> Payment processing (when applicable)</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Each of these services has their own privacy policies governing their use of your data.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Children&apos;s Privacy</h2>
              <p className="text-muted-foreground">
                Our service is not directed to children under 16. We do not knowingly collect personal information from children under 16. If you become aware that a child has provided us with personal information, please contact us and we will take steps to delete such information.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this privacy policy periodically for any changes.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="text-muted-foreground">
                <p><strong className="text-white">Email:</strong> privacy@roleplaystudio.ai</p>
                <p><strong className="text-white">Address:</strong> Roleplay Studio</p>
                <p className="mt-4">
                  For GDPR-related inquiries, you may also contact our Data Protection contact at the email address above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
