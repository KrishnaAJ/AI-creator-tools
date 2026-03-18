import { Link } from "wouter";
import { Sparkles, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-white/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground hover:opacity-80 transition-opacity mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow">
                <Sparkles className="w-4 h-4" />
              </div>
              ToolsAI
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Free AI-powered tools for content creators. Generate titles, captions, hashtags, ad copy, and more — instantly and for free.
            </p>
            <a href="mailto:support@toolsai.app" className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              support@toolsai.app
            </a>
            <p className="mt-5 text-xs text-muted-foreground flex items-center gap-1.5">
              Made with <Heart className="w-3 h-3 text-accent fill-accent" /> for Creators
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">AI Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools/ai/youtube-titles" className="hover:text-primary transition-colors">YouTube Title Generator</Link></li>
              <li><Link href="/tools/ai/instagram-bio" className="hover:text-primary transition-colors">Instagram Bio Generator</Link></li>
              <li><Link href="/tools/ai/hashtags" className="hover:text-primary transition-colors">Hashtag Generator</Link></li>
              <li><Link href="/tools/ai/caption" className="hover:text-primary transition-colors">Caption Generator</Link></li>
              <li><Link href="/tools/ai/blog-ideas" className="hover:text-primary transition-colors">Blog Post Ideas</Link></li>
              <li><Link href="/tools/ai/grammar-check" className="hover:text-primary transition-colors">Grammar Checker</Link></li>
              <li><Link href="/tools/ai/seo-meta" className="hover:text-primary transition-colors">SEO Meta Tags</Link></li>
              <li><Link href="/tools/ai/ad-copy" className="hover:text-primary transition-colors">Ad Copy Generator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">More Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools/ai/paraphrase" className="hover:text-primary transition-colors">Paraphrase Text</Link></li>
              <li><Link href="/tools/ai/summarize" className="hover:text-primary transition-colors">Text Summarizer</Link></li>
              <li><Link href="/tools/ai/email-subject" className="hover:text-primary transition-colors">Email Subject Lines</Link></li>
              <li><Link href="/tools/ai/product-description" className="hover:text-primary transition-colors">Product Descriptions</Link></li>
              <li><Link href="/tools/utility/word-counter" className="hover:text-primary transition-colors">Word Counter</Link></li>
              <li><Link href="/tools/utility/password-generator" className="hover:text-primary transition-colors">Password Generator</Link></li>
              <li><Link href="/tools/utility/color-palette" className="hover:text-primary transition-colors">Color Palette</Link></li>
              <li><Link href="/tools/utility/base64" className="hover:text-primary transition-colors">Base64 Encoder</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} ToolsAI. All rights reserved. Free AI tools for content creators.
          </p>
          <p className="text-xs text-muted-foreground">
            AI content is generated automatically and may require review before use.
          </p>
        </div>
      </div>
    </footer>
  );
}
