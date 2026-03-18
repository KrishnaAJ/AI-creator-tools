import { Mail, MessageSquare, Clock, HelpCircle, Bug, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const topics = [
  { icon: HelpCircle, title: "General Questions", desc: "Questions about how a tool works or what it can do." },
  { icon: Bug, title: "Report a Bug", desc: "Found something broken? Let us know so we can fix it fast." },
  { icon: Lightbulb, title: "Feature Requests", desc: "Have an idea for a new tool or improvement? We'd love to hear it." },
  { icon: MessageSquare, title: "Content Feedback", desc: "Issues with AI output quality or relevance on any tool." },
];

export default function ContactUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-16"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary mb-6 shadow-inner border border-primary/10">
          <Mail className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you. Reach out with questions, feedback, or tool suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl shadow-primary/5 rounded-3xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Send Us a Message</h2>
          <p className="text-muted-foreground">
            Have a question, found a bug, or want to suggest a new tool? Fill out the form below and our team will get back to you within 24–48 hours.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Jane Smith"
                className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Subject</label>
              <select className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                <option value="">Select a topic...</option>
                <option value="general">General Question</option>
                <option value="bug">Report a Bug</option>
                <option value="feature">Feature Request</option>
                <option value="feedback">Feedback / Suggestion</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Message</label>
              <textarea
                placeholder="Describe your question or feedback in detail..."
                rows={5}
                className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 hover:opacity-90 transition-all duration-200 active:scale-[0.98]">
              Send Message
            </button>
            <p className="text-xs text-muted-foreground text-center">
              This form is for feedback. For fastest response, email us directly at{" "}
              <a href="mailto:support@toolsai.app" className="text-primary hover:underline font-medium">
                support@toolsai.app
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl shadow-primary/5 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Direct Support</h2>
            <div className="space-y-4">
              <a href="mailto:support@toolsai.app" className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/10 rounded-2xl hover:bg-primary/10 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@toolsai.app</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 bg-muted/50 border border-border rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Response Time</p>
                  <p className="text-sm text-muted-foreground">Typically within 24–48 business hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl shadow-primary/5 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-foreground mb-4">What Can We Help With?</h2>
            <div className="space-y-4">
              {topics.map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <t.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
