import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logo from './logo.png';
import { 
  Shield, 
  FileText, 
  Mail, 
  MapPin, 
  ChevronRight, 
  ExternalLink,
  Download,
  Menu,
  X
} from 'lucide-react';

type LegalType = 'terms' | 'privacy';

export default function App() {
  const [activeTab, setActiveTab] = useState<LegalType>('privacy');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle hash navigation if user comes from a direct link like #terms
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'terms' || hash === 'privacy') {
      setActiveTab(hash as LegalType);
    }
  }, []);

  const toggleTab = (tab: LegalType) => {
    setActiveTab(tab);
    window.location.hash = tab;
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Trailero logo" className="w-8 h-8 object-contain" />
              <span className="font-bold text-xl text-ink-primary tracking-tight">Trailero Mobile</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => toggleTab('privacy')}
                className={`text-sm font-medium transition-all pb-1 border-b-2 ${activeTab === 'privacy' ? 'text-ink-primary border-accent' : 'text-ink-secondary border-transparent hover:text-ink-primary'}`}
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => toggleTab('terms')}
                className={`text-sm font-medium transition-all pb-1 border-b-2 ${activeTab === 'terms' ? 'text-ink-primary border-accent' : 'text-ink-secondary border-transparent hover:text-ink-primary'}`}
              >
                Terms of Service
              </button>
              <a 
                href="mailto:trailerodev@gmail.com"
                className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
              >
                Support
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-ink-secondary hover:text-ink-primary"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-surface border-b border-border overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                <button 
                  onClick={() => toggleTab('privacy')}
                  className={`block w-full text-left py-2 text-sm font-medium ${activeTab === 'privacy' ? 'text-accent' : 'text-ink-secondary'}`}
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => toggleTab('terms')}
                  className={`block w-full text-left py-2 text-sm font-medium ${activeTab === 'terms' ? 'text-accent' : 'text-ink-secondary'}`}
                >
                  Terms of Service
                </button>
                <a 
                  href="mailto:trailerodev@gmail.com"
                  className="block w-full text-left py-2 text-sm font-medium text-ink-secondary"
                >
                  Support
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hero"
            >
              <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-ink-primary tracking-tighter">
                {activeTab === 'privacy' ? 'Privacy Center' : 'Terms of Service'}
                <span className="version-badge">v1.0.0</span>
              </h1>
              <p className="text-ink-secondary text-lg md:text-xl max-w-2xl leading-relaxed">
                {activeTab === 'privacy' 
                  ? 'We believe privacy is a fundamental human right. This center details how we handle your data across the Trailero ecosystem.' 
                  : 'These terms govern your use of the Trailero platform and services. Please read them carefully before using our application.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="legal-content bg-surface border border-border p-8 md:p-12 rounded-lg shadow-sm">
              <AnimatePresence mode="wait">
                {activeTab === 'privacy' ? (
                  <motion.div
                    key="privacy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PrivacyPolicyContent />
                  </motion.div>
                ) : (
                  <motion.div
                    key="terms"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TermsContent />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Info */}
            <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-[12px] text-ink-secondary uppercase tracking-wider font-medium">
                Document last updated: April 13, 2026
              </div>
              <a 
                href="mailto:trailerodev@gmail.com" 
                className="bg-ink-primary text-white px-6 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Contact Legal Team
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-bg py-12 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ink-secondary">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-sm opacity-50"></div>
            <span>© {new Date().getFullYear()} Trailero LLC</span>
          </div>
          <div className="flex gap-8">
            <button onClick={() => toggleTab('privacy')} className="hover:text-ink-primary transition-colors">Privacy</button>
            <button onClick={() => toggleTab('terms')} className="hover:text-ink-primary transition-colors">Terms</button>
            <a href="mailto:trailerodev@gmail.com" className="hover:text-ink-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PrivacyPolicyContent() {
  return (
    <>
      <p>Trailero ("we", "our", or "us") operates the Trailero mobile application (the "App"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App.</p>
      
      <h2>1. Information We Collect</h2>
      <h3>1.1 Account Information</h3>
      <p>We may collect the following information when you create an account or use the App:</p>
      <ul>
        <li>email address;</li>
        <li>user ID;</li>
        <li>authentication credentials (securely stored);</li>
        <li>profile or account settings you choose to provide.</li>
      </ul>

      <h3>1.2 Usage Data</h3>
      <p>We automatically collect certain information about how you interact with the App, including:</p>
      <ul>
        <li>vocabulary flashcard progress;</li>
        <li>traffic sign learning progress;</li>
        <li>scenario practice sessions;</li>
        <li>session history and practice records;</li>
        <li>daily activity metrics (e.g., completed goals and streaks).</li>
      </ul>

      <h3>1.3 Technical Data</h3>
      <p>We may collect:</p>
      <ul>
        <li>IP address (for security, abuse prevention, and audit logging);</li>
        <li>device type and operating system;</li>
        <li>app version;</li>
        <li>log data and error reports;</li>
        <li>approximate usage timestamps.</li>
      </ul>

      <h3>1.4 Consent and Compliance Data</h3>
      <p>To comply with legal and platform requirements, we may collect and store:</p>
      <ul>
        <li>Terms of Service version accepted;</li>
        <li>Privacy Policy version accepted;</li>
        <li>timestamp of acceptance;</li>
        <li>IP address and user agent associated with acceptance.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information to:</p>
      <ul>
        <li>provide and maintain the App;</li>
        <li>create and manage your account;</li>
        <li>track learning progress and personalize your experience;</li>
        <li>store session history and practice records;</li>
        <li>maintain user streaks and daily activity tracking;</li>
        <li>improve app performance and features;</li>
        <li>monitor usage patterns and detect abuse;</li>
        <li>comply with legal obligations;</li>
        <li>enforce our Terms of Service.</li>
      </ul>

      <h2>3. How We Share Your Information</h2>
      <p>We do not sell your personal data. We may share your information in the following cases:</p>
      <h3>3.1 Service Providers and Processors</h3>
      <p>We may share data with third-party services that help us operate the App, such as:</p>
      <ul>
        <li>cloud hosting providers;</li>
        <li>authentication providers;</li>
        <li>analytics tools;</li>
        <li>crash reporting tools;</li>
        <li>payment processors;</li>
        <li>AI providers, including Google Gemini or similar services.</li>
      </ul>

      <h2>4. AI Processing</h2>
      <p>Trailero uses third-party artificial intelligence services, including Google Gemini, to power interactive learning features such as scenario-based conversations.</p>
      <p>When you use these features, certain data may be sent to these services, including:</p>
      <ul>
        <li>messages you input during sessions;</li>
        <li>scenario context required to generate responses;</li>
        <li>related prompt data needed to operate the feature.</li>
      </ul>
      <p>This data is processed to generate responses and provide functionality. We do not use AI providers to identify users personally, and we do not sell your data. Third-party providers may process data in accordance with their own privacy policies and terms.</p>

      <h3>4.2 Legal Requirements</h3>
      <p>We may disclose your information if required to:</p>
      <ul>
        <li>comply with applicable laws or regulations;</li>
        <li>respond to lawful requests;</li>
        <li>protect our rights, our users, or the security of the App.</li>
      </ul>

      <h2>5. Data Retention</h2>
      <p>We retain your data only as long as necessary to:</p>
      <ul>
        <li>provide services;</li>
        <li>maintain your account and progress;</li>
        <li>maintain session history and practice records;</li>
        <li>comply with legal obligations;</li>
        <li>resolve disputes;</li>
        <li>enforce our agreements.</li>
      </ul>
      <p>If you delete your account, we will delete or anonymize data associated with your account within a reasonable timeframe unless retention is required by law, legal obligation, fraud prevention, security, or dispute resolution.</p>

      <h2>6. Your Rights</h2>
      <p>Depending on your location, you may have rights under laws such as GDPR or CCPA, including:</p>
      <ul>
        <li>access your data;</li>
        <li>correct inaccurate data;</li>
        <li>request deletion of your data;</li>
        <li>withdraw consent where applicable.</li>
      </ul>
      <p>To exercise these rights, contact us at: <strong>trailerodev@gmail.com</strong></p>

      <h2>7. Data Security</h2>
      <p>We implement reasonable technical and organizational measures to protect your data, including:</p>
      <ul>
        <li>secure authentication systems;</li>
        <li>encrypted data transmission (HTTPS/TLS);</li>
        <li>access control and monitoring;</li>
        <li>limited access to production systems.</li>
      </ul>
      <p>However, no system is completely secure.</p>

      <h2>8. Children's Privacy</h2>
      <p>Trailero is not intended for children under 13 (or the applicable age in your jurisdiction). We do not knowingly collect personal data from children under the age of 13.</p>

      <h2>9. International Data Transfers</h2>
      <p>If you access the App from outside the United States, your data may be transferred to and processed in the United States or other locations where our service providers operate.</p>

      <h2>10. Third-Party Services</h2>
      <p>The App may use third-party services (e.g., analytics, authentication, cloud infrastructure, AI, or payments). These services have their own privacy policies. We are not responsible for the privacy or security practices of third-party services.</p>

      <h2>11. Policy Updates</h2>
      <p>We may update this Privacy Policy from time to time. If we make significant changes, we will notify you in the App or by other reasonable means; you may be required to accept the updated policy before continuing to use the App.</p>

      <h2>12. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, contact us at:</p>
      <p>
        <strong>Trailero LLC</strong><br />
        Email: trailerodev@gmail.com<br />
        Location: Alexandria, Virginia<br />
        Support: trailerodev@gmail.com
      </p>

      <h2>13. Compliance with App Stores</h2>
      <p>This Privacy Policy is intended to support compliance with Apple App Store and Google Play disclosure requirements.</p>

      <h2>14. Consent Summary</h2>
      <p>By using Trailero, you agree to:</p>
      <ul>
        <li>the collection and use of your data as described above;</li>
        <li>the storage of your learning progress and activity;</li>
        <li>the logging of your consent to legal policies.</li>
      </ul>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <p>These Terms and Conditions ("Terms") govern your access to and use of the Trailero mobile application, website, and related services (collectively, the "Service") operated by Trailero LLC ("Trailero," "we," "us," or "our").</p>
      <p>By creating an account, accessing, or using the Service, you agree to these Terms. If you do not agree, do not use the Service.</p>

      <h2>1. Eligibility</h2>
      <p>You must be at least 13 years old, or the minimum age required in your jurisdiction to consent to the use of online services, to use the Service. By using the Service, you represent and warrant that you meet this requirement and that you are legally able to enter into these Terms.</p>
      <p>If you are using the Service on behalf of a company or other organization, you represent that you have authority to bind that organization to these Terms.</p>

      <h2>2. Account Registration</h2>
      <p>To use certain features, you may need to create an account. You agree to:</p>
      <ul>
        <li>provide accurate, current, and complete information;</li>
        <li>keep your account information up to date;</li>
        <li>maintain the security of your login credentials;</li>
        <li>notify us immediately of any unauthorized use of your account.</li>
      </ul>
      <p>You are responsible for all activity that occurs under your account. We may suspend or terminate accounts that provide false information, violate these Terms, or appear to be compromised.</p>

      <h2>3. License to Use the Service</h2>
      <p>Subject to your compliance with these Terms, Trailero grants you a limited, revocable, non-exclusive, non-transferable, non-sublicensable license to access and use the Service for your personal, non-commercial use.</p>
      <p>You may not:</p>
      <ul>
        <li>copy, modify, distribute, sell, lease, or reverse engineer any part of the Service;</li>
        <li>use the Service to build a competing product;</li>
        <li>bypass security or access controls;</li>
        <li>interfere with the operation or performance of the Service;</li>
        <li>use bots, scrapers, or automated systems without our written permission.</li>
      </ul>

      <h2>4. Trailero Content and Educational Use</h2>
      <p>Trailero provides learning and practice tools that may include:</p>
      <ul>
        <li>vocabulary flashcards;</li>
        <li>traffic sign flashcards;</li>
        <li>practice scenarios;</li>
        <li>progress tracking;</li>
        <li>streaks and daily activity tracking;</li>
        <li>session history and related practice records.</li>
      </ul>
      <p>The Service is designed for educational and training purposes only. We do not guarantee that use of the Service will improve your performance, pass any test, satisfy any legal requirement, or produce any particular result.</p>

      <h2>5. User Content and Session Data</h2>
      <p>The Service may allow you to create, store, or interact with content such as session messages, responses, notes, or practice data ("User Content"). You retain ownership of any User Content you submit, subject to the rights you grant us in these Terms.</p>
      <p>By submitting User Content, you grant Trailero a worldwide, royalty-free, sublicensable, and transferable license to host, store, reproduce, process, transmit, display, and use that content solely to operate and improve the Service, maintain history, and comply with law.</p>

      <h2>6. Progress, Streaks, and Daily Goals</h2>
      <p>Trailero may track completed flashcards, traffic sign cards, scenario practice time, daily goals, and streaks. These features are provided as product features only and are not warranties or guarantees of performance.</p>

      <h2>7. Payments, Subscriptions, and Purchases</h2>
      <p>If Trailero offers paid features, additional purchase terms may apply. You are responsible for all applicable fees, taxes, and charges. For purchases made through app stores, the store’s payment and refund policies may also apply.</p>

      <h2>8. AI Features and Third-Party Services</h2>
      <p>The Service may integrate with third-party tools such as authentication providers, cloud hosting, analytics, and AI providers (including Google Gemini). Third-party services are governed by their own terms and privacy policies.</p>

      <h2>9. AI-Generated Content Disclaimer</h2>
      <p>The Service may generate responses using artificial intelligence. You acknowledge that AI-generated content may be inaccurate, incomplete, or inappropriate. You should not rely on AI-generated output as legal, medical, safety, or professional advice.</p>

      <h2>10. Privacy</h2>
      <p>Your use of the Service is also governed by our Privacy Policy. Before using the Service, you may be required to accept our Terms and Privacy Policy.</p>

      <h2>11. Consent Records</h2>
      <p>Where required, we may keep a record of the version of the Terms and Privacy Policy accepted, the timestamp, and related metadata for compliance and audit purposes.</p>

      <h2>12. Acceptable Use</h2>
      <p>You agree not to use the Service to break any law, impersonate others, harass, upload malicious code, or disrupt the Service infrastructure. We may investigate violations and take appropriate action.</p>

      <h2>13. Intellectual Property</h2>
      <p>The Service and all content provided by Trailero are owned by Trailero or its licensors and are protected by intellectual property laws. You receive no ownership rights in the Service.</p>

      <h2>14. Feedback</h2>
      <p>If you submit ideas or feedback, you agree that we may use them without restriction or compensation to you.</p>

      <h2>15. Service Changes</h2>
      <p>We may add, remove, or modify features of the Service at any time. We are not liable for any modification, suspension, or discontinuation of any feature.</p>

      <h2>16. Termination</h2>
      <p>You may stop using the Service at any time. We may suspend or terminate your access if you violate these Terms or if required by law.</p>

      <h2>17. Disclaimers</h2>
      <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Trailero disclaims all warranties, express or implied, including implied warranties of merchantability and fitness for a particular purpose.</p>

      <h2>18. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, Trailero will not be liable for indirect, incidental, or consequential damages. Our total liability will not exceed the greater of the amount you paid in the last 12 months or $50.00 USD.</p>

      <h2>19. Indemnification</h2>
      <p>You agree to indemnify and hold harmless Trailero from any claims arising out of your use of the Service, your User Content, or your violation of these Terms.</p>

      <h2>20. Export and Sanctions Compliance</h2>
      <p>You agree not to use the Service in violation of applicable export control or sanctions laws.</p>

      <h2>21. App Store and Platform Terms</h2>
      <p>If you downloaded the app from the Apple App Store or Google Play, you must also comply with the applicable app store terms and policies.</p>

      <h2>22. Account Deletion</h2>
      <p>You may request deletion of your account at any time by contacting us at <strong>trailerodev@gmail.com</strong>.</p>

      <h2>23. Dispute Resolution</h2>
      <p>Any dispute arising from these Terms will be resolved exclusively in the state or federal courts located in Alexandria, Virginia, United States.</p>

      <h2>24. Governing Law</h2>
      <p>These Terms are governed by the laws of the State of Virginia, without regard to conflict-of-law rules.</p>

      <h2>25. Changes to These Terms</h2>
      <p>We may update these Terms from time to time. Your continued use of the Service after the effective date of updated Terms means you accept them.</p>

      <h2>26. Contact Information</h2>
      <p>
        <strong>Trailero LLC</strong><br />
        Email: trailerodev@gmail.com<br />
        Address: Alexandria, Virginia
      </p>

      <h2>27. Entire Agreement</h2>
      <p>These Terms, together with our Privacy Policy, form the entire agreement between you and Trailero regarding your use of the Service.</p>
    </>
  );
}
