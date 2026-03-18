import { ReactNode } from "react";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="space-y-3">
    <h2 className="text-xl font-bold text-foreground">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
    <hr className="border-border" />
  </div>
);

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto pb-16"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary mb-6 shadow-inner border border-primary/10">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: March 18, 2026</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl shadow-primary/5 rounded-3xl p-8 md:p-12 space-y-8">
        <p className="text-muted-foreground leading-relaxed">
          This Privacy Policy describes how ToolsAI ("we", "us", or "our") collects, uses, and shares information when you use our website at toolsai.app (the "Service"). By using our Service, you agree to the collection and use of information in accordance with this policy.
        </p>

        <Section title="1. Information We Collect">
          <p><strong className="text-foreground">Usage Data:</strong> We automatically collect certain information when you visit our site, including your IP address, browser type, pages visited, time spent on pages, and referring URLs. This data is used solely for analytics and improving the Service.</p>
          <p><strong className="text-foreground">Content You Enter:</strong> When you use our AI tools, the text you enter (your prompts and inputs) is temporarily processed to generate a response. We do not permanently store or log your tool inputs beyond what is necessary to serve the immediate request.</p>
          <p><strong className="text-foreground">Cookies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
        </Section>

        <Section title="2. Google AdSense and Advertising">
          <p>ToolsAI uses Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to our website or other websites on the internet.</p>
          <p>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>.</p>
          <p>We do not have access to or control over the cookies used by Google AdSense. We encourage you to review Google's <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a> for more information about how Google collects and uses data.</p>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the collected data for various purposes:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide and maintain our Service</li>
            <li>To monitor the usage of our Service and detect technical issues</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To display relevant advertising through Google AdSense</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </Section>

        <Section title="4. Data Retention">
          <p>We retain usage analytics data for up to 26 months to understand long-term usage trends. Input data processed through AI tools is not permanently stored and is discarded immediately after the response is generated.</p>
        </Section>

        <Section title="5. Third-Party Services">
          <p>Our Service may contain links to other sites that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
          <p>We use the following third-party services: Google Analytics (usage analytics), Google AdSense (advertising), and OpenAI API (AI text generation). Each has its own privacy policy governing data use.</p>
        </Section>

        <Section title="6. Children's Privacy">
          <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us so that we can take appropriate action.</p>
        </Section>

        <Section title="7. Your Rights">
          <p>Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete data we hold about you. To exercise these rights, please contact us at <a href="mailto:privacy@toolsai.app" className="text-primary hover:underline">privacy@toolsai.app</a>.</p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date at the top. You are advised to review this Privacy Policy periodically for any changes.</p>
        </Section>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">9. Contact Us</h2>
          <p className="text-muted-foreground">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@toolsai.app" className="text-primary hover:underline font-medium">privacy@toolsai.app</a>.</p>
        </div>
      </div>
    </motion.div>
  );
}
