import { Sparkles, Zap, Shield, Users, Target, Heart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Results in seconds powered by state-of-the-art GPT models — no waiting, no queues." },
  { icon: Shield, title: "Completely Free", desc: "Every tool on ToolsAI is free to use with no account, no credit card, and no hidden limits." },
  { icon: Users, title: "Built for Creators", desc: "Every tool is purpose-built for the exact workflows content creators, marketers, and writers deal with every day." },
  { icon: Target, title: "SEO-Optimized Output", desc: "Our AI doesn't just generate text — it generates strategically crafted content designed to rank and convert." },
  { icon: Heart, title: "No Signup Required", desc: "We believe great tools should be accessible. Open any tool and start creating immediately — it's that simple." },
  { icon: Sparkles, title: "Always Improving", desc: "We regularly add new tools and improve existing ones based on creator feedback and the latest AI advancements." },
];

export default function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-16"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary mb-6 shadow-inner border border-primary/10">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About ToolsAI</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The free, all-in-one AI toolkit built for modern content creators.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl shadow-primary/5 rounded-3xl p-8 md:p-12 mb-10 space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground font-medium">
          ToolsAI was born from a simple frustration: content creators waste hours every week on repetitive writing tasks that AI could handle in seconds.
        </p>
        <p>
          We built ToolsAI to give every creator — from solo bloggers and freelance copywriters to social media managers and eCommerce entrepreneurs — access to powerful, production-ready AI tools without the enterprise price tag. Whether you need to brainstorm 10 YouTube video title ideas, write a professional Instagram bio, generate trending hashtags for your niche, or craft high-converting ad copy for your Facebook campaign, ToolsAI has you covered with a single click.
        </p>
        <p>
          Our platform currently features over 20 purpose-built tools across five core categories: Social Media, Writing & Editing, Marketing & SEO, Fun & Creative, and Utility Tools. Every AI tool is powered by the latest large language models and fine-tuned with creator-specific prompts to deliver output that feels genuinely human and immediately usable — not generic AI filler.
        </p>
        <p>
          We're a small, passionate team of developers, copywriters, and content creators ourselves. We use these tools in our own workflows every single day. That means we understand exactly what quality looks like and we hold our AI outputs to that standard. We obsess over every prompt, test every result, and continuously iterate based on real creator feedback.
        </p>
        <p>
          Our mission is straightforward: help creators spend less time staring at a blank page and more time doing the creative work they actually love. We believe AI should be an accelerator, not a replacement — a co-pilot that makes your work faster, sharper, and more consistent.
        </p>
        <p>
          ToolsAI will always be free for core features. We believe that access to smart tools shouldn't be gated behind expensive subscriptions, especially for independent creators just starting out. This platform is ad-supported, which is what allows us to keep the lights on and keep every tool free for everyone.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-6">Why Creators Choose ToolsAI</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <f.icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 md:p-12 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Create Faster?</h2>
        <p className="text-white/80 mb-6 text-lg">Join thousands of creators who use ToolsAI to produce better content in less time.</p>
        <a href="/" className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-xl shadow-lg hover:opacity-90 transition-opacity">
          Explore All Tools
        </a>
      </div>
    </motion.div>
  );
}
