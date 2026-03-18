import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { ToastProvider } from "@/contexts/ToastContext";
import Home from "@/pages/Home";

// AI Tools
import YoutubeTitles from "@/pages/ai/YoutubeTitles";
import InstagramBio from "@/pages/ai/InstagramBio";
import Hashtags from "@/pages/ai/Hashtags";
import Caption from "@/pages/ai/Caption";
import Tweet from "@/pages/ai/Tweet";
import BlogIdeas from "@/pages/ai/BlogIdeas";
import Paraphrase from "@/pages/ai/Paraphrase";
import GrammarCheck from "@/pages/ai/GrammarCheck";
import Summarize from "@/pages/ai/Summarize";
import EmailSubject from "@/pages/ai/EmailSubject";
import ProductDescription from "@/pages/ai/ProductDescription";
import AdCopy from "@/pages/ai/AdCopy";
import SeoMeta from "@/pages/ai/SeoMeta";
import TextToEmoji from "@/pages/ai/TextToEmoji";

// Utility Tools
import WordCounter from "@/pages/utility/WordCounter";
import PasswordGenerator from "@/pages/utility/PasswordGenerator";
import ColorPalette from "@/pages/utility/ColorPalette";
import LoremIpsum from "@/pages/utility/LoremIpsum";
import CaseConverter from "@/pages/utility/CaseConverter";
import Base64 from "@/pages/utility/Base64";

// Legal Pages
import AboutUs from "@/pages/legal/AboutUs";
import ContactUs from "@/pages/legal/ContactUs";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";
import TermsOfService from "@/pages/legal/TermsOfService";
import Disclaimer from "@/pages/legal/Disclaimer";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        
        {/* AI Tools Routes */}
        <Route path="/tools/ai/youtube-titles" component={YoutubeTitles} />
        <Route path="/tools/ai/instagram-bio" component={InstagramBio} />
        <Route path="/tools/ai/hashtags" component={Hashtags} />
        <Route path="/tools/ai/caption" component={Caption} />
        <Route path="/tools/ai/tweet" component={Tweet} />
        <Route path="/tools/ai/blog-ideas" component={BlogIdeas} />
        <Route path="/tools/ai/paraphrase" component={Paraphrase} />
        <Route path="/tools/ai/grammar-check" component={GrammarCheck} />
        <Route path="/tools/ai/summarize" component={Summarize} />
        <Route path="/tools/ai/email-subject" component={EmailSubject} />
        <Route path="/tools/ai/product-description" component={ProductDescription} />
        <Route path="/tools/ai/ad-copy" component={AdCopy} />
        <Route path="/tools/ai/seo-meta" component={SeoMeta} />
        <Route path="/tools/ai/text-to-emoji" component={TextToEmoji} />

        {/* Utility Tools Routes */}
        <Route path="/tools/utility/word-counter" component={WordCounter} />
        <Route path="/tools/utility/password-generator" component={PasswordGenerator} />
        <Route path="/tools/utility/color-palette" component={ColorPalette} />
        <Route path="/tools/utility/lorem-ipsum" component={LoremIpsum} />
        <Route path="/tools/utility/case-converter" component={CaseConverter} />
        <Route path="/tools/utility/base64" component={Base64} />

        {/* Legal & Company Pages */}
        <Route path="/about" component={AboutUs} />
        <Route path="/contact" component={ContactUs} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/disclaimer" component={Disclaimer} />

        <Route>
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-muted-foreground">The page you are looking for doesn't exist.</p>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
