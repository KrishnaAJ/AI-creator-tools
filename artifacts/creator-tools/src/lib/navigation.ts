import { 
  Youtube, Instagram, Hash, MessageSquare, Twitter,
  FileText, RefreshCw, CheckCircle, AlignLeft,
  Mail, ShoppingBag, Megaphone, Search,
  Smile, Type, Key, Palette, FileCode, Edit3, Code
} from "lucide-react";

export const TOOL_CATEGORIES = [
  {
    name: "Social Media",
    tools: [
      { id: "youtube-titles", name: "YouTube Titles", path: "/tools/ai/youtube-titles", icon: Youtube, desc: "Generate catchy, click-worthy titles for your videos." },
      { id: "instagram-bio", name: "Instagram Bio", path: "/tools/ai/instagram-bio", icon: Instagram, desc: "Craft the perfect Instagram bio for your profile." },
      { id: "hashtags", name: "Hashtags Generator", path: "/tools/ai/hashtags", icon: Hash, desc: "Find trending hashtags to boost your reach." },
      { id: "caption", name: "Caption Generator", path: "/tools/ai/caption", icon: MessageSquare, desc: "Write engaging captions for your posts." },
      { id: "tweet", name: "Tweet Generator", path: "/tools/ai/tweet", icon: Twitter, desc: "Create viral tweets and threads instantly." }
    ]
  },
  {
    name: "Writing & Editing",
    tools: [
      { id: "blog-ideas", name: "Blog Post Ideas", path: "/tools/ai/blog-ideas", icon: FileText, desc: "Never run out of content ideas for your blog." },
      { id: "paraphrase", name: "Paraphrase Text", path: "/tools/ai/paraphrase", icon: RefreshCw, desc: "Rewrite your sentences for better flow." },
      { id: "grammar-check", name: "Grammar Check", path: "/tools/ai/grammar-check", icon: CheckCircle, desc: "Ensure your writing is perfectly polished." },
      { id: "summarize", name: "Text Summarizer", path: "/tools/ai/summarize", icon: AlignLeft, desc: "Condense long articles into key points." }
    ]
  },
  {
    name: "Marketing & SEO",
    tools: [
      { id: "email-subject", name: "Email Subjects", path: "/tools/ai/email-subject", icon: Mail, desc: "Write subject lines that guarantee opens." },
      { id: "product-description", name: "Product Descriptions", path: "/tools/ai/product-description", icon: ShoppingBag, desc: "Sell more with persuasive descriptions." },
      { id: "ad-copy", name: "Ad Copy Generator", path: "/tools/ai/ad-copy", icon: Megaphone, desc: "High-converting copy for your campaigns." },
      { id: "seo-meta", name: "SEO Meta Tags", path: "/tools/ai/seo-meta", icon: Search, desc: "Optimize your pages for search engines." }
    ]
  },
  {
    name: "Fun & Creative",
    tools: [
      { id: "text-to-emoji", name: "Text to Emoji", path: "/tools/ai/text-to-emoji", icon: Smile, desc: "Translate your plain text into fun emojis." }
    ]
  },
  {
    name: "Utility Tools",
    tools: [
      { id: "word-counter", name: "Word Counter", path: "/tools/utility/word-counter", icon: Type, desc: "Count words, characters, and sentences." },
      { id: "password-generator", name: "Password Generator", path: "/tools/utility/password-generator", icon: Key, desc: "Create secure, randomized passwords." },
      { id: "color-palette", name: "Color Palette", path: "/tools/utility/color-palette", icon: Palette, desc: "Generate beautiful color schemes." },
      { id: "lorem-ipsum", name: "Lorem Ipsum", path: "/tools/utility/lorem-ipsum", icon: FileCode, desc: "Generate placeholder text for designs." },
      { id: "case-converter", name: "Case Converter", path: "/tools/utility/case-converter", icon: Edit3, desc: "Convert text to UPPER, lower, title case." },
      { id: "base64", name: "Base64 Encode", path: "/tools/utility/base64", icon: Code, desc: "Encode or decode Base64 strings safely." }
    ]
  }
];

export const ALL_TOOLS = TOOL_CATEGORIES.flatMap(c => c.tools);
