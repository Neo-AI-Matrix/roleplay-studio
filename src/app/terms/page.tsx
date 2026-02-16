import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { FAQ } from '@/components/FAQ';
import { SchemaScript, getTermsPageSchema } from '@/lib/schema';

const termsFAQs = [
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, you can cancel your subscription at any time through your account settings. Your access will continue until the end of your current billing period. We do not provide prorated refunds for partial months."
  },
  {
    question: "What happens when my free trial ends?",
    answer: "Your trial automatically converts to a paid subscription at the end of the 7-day period. You'll be charged the plan rate you selected during signup. You can cancel anytime before the trial ends to avoid charges."
  },
  {
    question: "Can I use Roleplay Studio for commercial training purposes?",
    answer: "Yes, our Business and Enterprise plans are designed for commercial use, including training employees, consultants, and clients. Individual plans are for personal professional development only. Contact sales if you need a reseller or white-label arrangement."
  },
  {
    question: "Who owns the content I create on the platform?",
    answer: "You retain ownership of all content you create or upload (custom scenarios, conversation transcripts, etc.). You grant us a license to use this content solely to provide the Service to you. We do not claim ownership of your content."
  },
  {
    question: "What are the age requirements to use Roleplay Studio?",
    answer: "You must be at least 16 years old to create an account and use Roleplay Studio. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms."
  },
  {
    question: "How do you handle disputes?",
    answer: "Any disputes are resolved through binding arbitration in San Francisco, California. By using the Service, you agree to waive your right to a jury trial or to participate in a class action lawsuit. Please see Section 14 of our Terms for full details."
  }
];

export default function TermsOfServicePage() {
  return (
    <div className="relative overflow-hidden">
      <SchemaScript schema={getTermsPageSchema()} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet/20 via-transparent to-transparent" />

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-violet/30 text-white border-violet/50">
              <FileText className="w-3 h-3 mr-1" />
              Legal
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: February 14, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground mb-4">
                These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and Roleplay Studio, Inc. (&quot;Roleplay Studio,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use of the Roleplay Studio platform, including our website, applications, and services (collectively, the &quot;Service&quot;).
              </p>
              <p className="text-muted-foreground mb-4">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Service.
              </p>
              <p className="text-muted-foreground">
                If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms, and &quot;you&quot; refers to both you individually and that organization.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                Roleplay Studio is an AI-powered training platform that enables users to practice sales, customer support, and other professional conversations through simulated roleplay scenarios. The Service includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>AI-powered conversation simulations</li>
                <li>Voice and text-based roleplay scenarios</li>
                <li>Performance feedback and analytics</li>
                <li>Custom scenario creation tools</li>
                <li>Team management and reporting features</li>
                <li>Integration capabilities with third-party services</li>
              </ul>
              <p className="text-muted-foreground">
                We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, with or without notice.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">3. Account Registration</h2>
              <p className="text-muted-foreground mb-4">
                To access certain features of the Service, you must create an account. When creating an account, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
              <p className="text-muted-foreground">
                You must be at least 16 years old to create an account. We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">4. Subscription and Payment</h2>
              
              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">4.1 Subscription Plans</h3>
              <p className="text-muted-foreground mb-4">
                The Service is offered through various subscription plans, including free trials and paid subscriptions. Details of each plan, including features and pricing, are available on our website.
              </p>

              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">4.2 Free Trials</h3>
              <p className="text-muted-foreground mb-4">
                We may offer free trials for a limited period. At the end of the trial, your subscription will automatically convert to a paid subscription unless you cancel before the trial ends.
              </p>

              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">4.3 Billing</h3>
              <p className="text-muted-foreground mb-4">
                Paid subscriptions are billed in advance on a monthly or annual basis. By providing payment information, you authorize us to charge the applicable fees to your payment method.
              </p>

              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">4.4 Cancellation and Refunds</h3>
              <p className="text-muted-foreground">
                You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of the current billing period. We do not provide refunds for partial subscription periods, except as required by law or at our sole discretion.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">5. Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">
                You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Upload or transmit malicious code, viruses, or harmful data</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use automated tools to access the Service without permission</li>
                <li>Impersonate any person or entity</li>
                <li>Harass, abuse, or harm others through the Service</li>
                <li>Use the Service to generate content that is illegal, harmful, threatening, abusive, defamatory, or otherwise objectionable</li>
                <li>Reverse engineer or attempt to extract source code from the Service</li>
                <li>Resell, sublicense, or commercially exploit the Service without authorization</li>
                <li>Use the Service to train competing AI models without explicit permission</li>
              </ul>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
              
              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">6.1 Our Intellectual Property</h3>
              <p className="text-muted-foreground mb-4">
                The Service, including its original content, features, functionality, and underlying technology, is owned by Roleplay Studio and protected by copyright, trademark, and other intellectual property laws. Our trademarks and trade dress may not be used without our prior written consent.
              </p>

              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">6.2 Your Content</h3>
              <p className="text-muted-foreground mb-4">
                You retain ownership of any content you create or upload to the Service (&quot;User Content&quot;). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content solely for the purpose of providing and improving the Service.
              </p>

              <h3 className="font-heading text-xl font-semibold text-white mt-6 mb-3">6.3 Feedback</h3>
              <p className="text-muted-foreground">
                If you provide feedback, suggestions, or ideas about the Service, you grant us the right to use such feedback without restriction or compensation to you.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">7. AI-Generated Content</h2>
              <p className="text-muted-foreground mb-4">
                The Service uses artificial intelligence to generate conversational responses and feedback. You acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>AI-generated content is for training and educational purposes only</li>
                <li>AI responses may not always be accurate, complete, or appropriate</li>
                <li>You should not rely on AI-generated content for professional, legal, medical, or financial advice</li>
                <li>We do not guarantee any specific outcomes from using the Service</li>
                <li>AI personas are fictional and do not represent real individuals or organizations</li>
              </ul>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">8. Privacy and Data Protection</h2>
              <p className="text-muted-foreground mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our <a href="/privacy" className="text-cyan hover:underline">Privacy Policy</a>, which is incorporated into these Terms by reference.
              </p>
              <p className="text-muted-foreground">
                By using the Service, you consent to the collection and use of your information as described in our Privacy Policy.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">9. Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                The Service may integrate with or contain links to third-party services. We are not responsible for the content, privacy policies, or practices of third-party services. Your use of third-party services is at your own risk and subject to their respective terms and conditions.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">10. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground mb-4">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
              </p>
              <p className="text-muted-foreground">
                We do not warrant that the Service will be uninterrupted, secure, or error-free, that defects will be corrected, or that the Service is free of viruses or other harmful components.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">11. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ROLEPLAY STUDIO AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR YOUR USE OF THE SERVICE.
              </p>
              <p className="text-muted-foreground">
                OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING UNDER THESE TERMS SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">12. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify, defend, and hold harmless Roleplay Studio and its affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys&apos; fees) arising out of or related to your use of the Service, your violation of these Terms, or your violation of any rights of a third party.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">13. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
              </p>
              <p className="text-muted-foreground">
                Upon termination, your right to use the Service will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnification, and limitations of liability.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">14. Governing Law and Dispute Resolution</h2>
              <p className="text-muted-foreground mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
              </p>
              <p className="text-muted-foreground">
                Any dispute arising from these Terms or your use of the Service shall be resolved through binding arbitration in San Francisco, California, in accordance with the rules of the American Arbitration Association. You agree to waive any right to a jury trial or to participate in a class action.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">15. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website and updating the &quot;Last updated&quot; date.
              </p>
              <p className="text-muted-foreground">
                Your continued use of the Service after changes become effective constitutes your acceptance of the revised Terms. If you do not agree to the new Terms, you must stop using the Service.
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">16. General Provisions</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong className="text-white">Entire Agreement:</strong> These Terms constitute the entire agreement between you and Roleplay Studio regarding the Service.</li>
                <li><strong className="text-white">Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in effect.</li>
                <li><strong className="text-white">Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</li>
                <li><strong className="text-white">Assignment:</strong> You may not assign or transfer these Terms without our prior written consent. We may assign our rights and obligations without restriction.</li>
                <li><strong className="text-white">Notices:</strong> We may provide notices to you via email, posting on the Service, or other reasonable means.</li>
              </ul>
            </div>

            <div className="glass-card p-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">17. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="text-muted-foreground">
                <p><strong className="text-white">Email:</strong> legal@roleplaystudio.ai</p>
                <p><strong className="text-white">Address:</strong> Roleplay Studio, Inc.</p>
                <p>San Francisco, CA</p>
              </div>
            </div>
          </div>
          
          {/* Terms FAQ */}
          <FAQ 
            faqs={termsFAQs}
            title="Terms FAQ"
            subtitle="Common questions about our terms of service"
          />
        </div>
      </div>
    </div>
  );
}
