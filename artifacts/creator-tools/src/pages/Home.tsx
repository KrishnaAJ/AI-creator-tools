import { useState } from "react";
import { Link } from "wouter";
import { Search, ArrowRight, Zap, Shield, Star, Clock } from "lucide-react";
import { ALL_TOOLS, TOOL_CATEGORIES } from "@/lib/navigation";
import { AdBanner } from "@/components/AdBanner";
import { motion } from "framer-motion";

const stats = [
  { icon: Zap, label: "AI Tools", value: "20+" },
  { icon: Star, label: "Free to Use", value: "100%" },
  { icon: Clock, label: "Avg. Generation", value: "<3s" },
  { icon: Shield, label: "No Signup Needed", value: "Ever" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = TOOL_CATEGORIES.map(cat => ({
    ...cat,
    tools: cat.tools.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.tools.length > 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-foreground text-white p-8 md:p-16 mb-12 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Abstract Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            The Ultimate Toolkit for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-orange-400">Content Creators</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 mb-8"
          >
            Generate titles, write engaging bios, plan content, and boost your productivity with our suite of 20+ free AI and utility tools.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-xl"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
            <input 
              type="text" 
              placeholder="Search for a tool... (e.g. YouTube Titles)" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-md transition-all text-lg"
            />
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="bg-white border border-border rounded-2xl p-5 flex items-center gap-4 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <AdBanner />

      {/* Tools Grid */}
      <div className="space-y-16 mt-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-xl">No tools found matching "{searchQuery}"</p>
          </div>
        ) : (
          filteredCategories.map((category, catIdx) => (
            <div key={category.name}>
              {catIdx === 2 && <AdBanner size="leaderboard" className="mb-10" />}
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {category.tools.map((tool, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (catIdx * 0.1) + (idx * 0.05) }}
                    key={tool.id}
                  >
                    <Link 
                      href={tool.path}
                      className="group block h-full bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform duration-500" />
                      <div className="w-12 h-12 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center text-foreground group-hover:text-primary transition-colors mb-5">
                        <tool.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2 flex items-center justify-between">
                        {tool.name}
                        <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                      </h3>
                      <p className="text-muted-foreground">{tool.desc}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      
      <AdBanner className="mt-16" />

      {/* SEO Content Section */}
      <div className="mt-20 border-t border-border pt-16 space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Free AI Toolkit Built for Modern Content Creators
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            ToolsAI brings together 20+ powerful AI and utility tools under one roof, completely free and without requiring any account or sign-up. Whether you're a YouTube creator, Instagram influencer, blogger, copywriter, marketer, or eCommerce entrepreneur, ToolsAI has a tool built specifically for your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-3">
              <span className="w-6 h-1 bg-primary rounded-full"></span>
              What Is ToolsAI?
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                ToolsAI is a comprehensive suite of AI-powered content creation tools designed to help creators produce high-quality, engaging content in seconds rather than hours. Powered by advanced large language models, each tool is optimized with carefully crafted prompts to deliver results that are professional, relevant, and immediately usable.
              </p>
              <p>
                Our platform was built with one mission in mind: to eliminate the blank-page problem for creators. Whether you need five YouTube video title ideas, a punchy Instagram bio that reflects your brand, trending hashtags to boost your reach, or a complete set of SEO meta tags for your latest blog post — ToolsAI generates them all instantly.
              </p>
              <p>
                Unlike subscription-based AI writing tools that charge $30–$100 per month, ToolsAI is and always will be free for core usage. We're an ad-supported platform, which means you get full access to powerful AI without spending a dime.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-3">
              <span className="w-6 h-1 bg-accent rounded-full"></span>
              How to Use ToolsAI
            </h3>
            <div className="space-y-4">
              {[
                { n: "1", title: "Choose a Tool", desc: "Browse by category or search for the exact tool you need. We have tools for social media, writing, SEO, marketing, and more." },
                { n: "2", title: "Enter Your Details", desc: "Fill in the input fields with relevant information about your topic, brand, or content. The more specific you are, the better the results." },
                { n: "3", title: "Generate Instantly", desc: "Click generate and our AI will process your request in seconds, delivering multiple high-quality options to choose from." },
                { n: "4", title: "Copy & Use", desc: "Click the copy button on any result and paste it directly into your platform, document, or CMS — no editing required." },
              ].map(({ n, title, desc }) => (
                <div key={n} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center border border-primary/20">
                    {n}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-6 h-1 bg-primary rounded-full"></span>
            Who Is ToolsAI For?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[
              { title: "YouTube Creators", desc: "Generate click-worthy video titles, compelling descriptions, and engagement-boosting captions that help your videos rank and get more clicks." },
              { title: "Instagram Influencers", desc: "Craft a professional bio that converts visitors to followers, generate niche hashtags that expand reach, and write captions that drive engagement." },
              { title: "Bloggers & Writers", desc: "Never run out of content ideas again. Generate blog post topics, paraphrase existing content, summarize research, and check grammar instantly." },
              { title: "Digital Marketers", desc: "Create high-converting ad copy for Facebook, Instagram, and Google Ads. Write email subject lines that skyrocket open rates and SEO meta tags that rank." },
              { title: "eCommerce Sellers", desc: "Write persuasive product descriptions that highlight benefits, drive conversions, and improve your store's search engine visibility without the copywriting fees." },
              { title: "Developers & Designers", desc: "Use our utility tools for quick Base64 encoding, Lorem Ipsum placeholder text generation, random color palette creation, and secure password generation." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white border border-border rounded-2xl p-5 hover:border-primary/20 hover:shadow-md transition-all">
                <h4 className="font-bold text-foreground mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">Why ToolsAI is Different</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Most AI writing tools are generic — they give you a text box, a single prompt, and a wall of output. ToolsAI is different because every single tool is purpose-built for a specific content creation use case. Our YouTube Title Generator knows what makes a title clickable. Our Hashtag Generator understands platform-specific strategies. Our Grammar Checker doesn't just fix typos — it shows you exactly what changed and why.
              </p>
              <p>
                We also believe in transparency and speed. Every tool on ToolsAI shows you results in under 3 seconds with no loading screens, no upsells, and no "upgrade to see more" gates. What you see is what you get, and what you get is genuinely useful.
              </p>
              <p>
                Our tools are updated regularly as AI technology improves and as we gather feedback from our community of creators. We're committed to making ToolsAI the most complete, most reliable, and most creator-friendly AI toolkit available — for free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
