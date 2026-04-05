import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Clipboard,
  Search,
  Wand2,
  FolderOpen,
  RefreshCw,
  Globe,
  Pin,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Clipboard,
    title: "Persistent Queue",
    description:
      "Every copy is saved automatically. Never overwrite an item again — your entire clipboard history is one click away.",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950",
  },
  {
    icon: Search,
    title: "Instant Search",
    description:
      "Full-text search across every item you've ever copied. Filter by type: text, URLs, code, or images.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    icon: Wand2,
    title: "Smart Transforms",
    description:
      "Strip formatting, extract all URLs, prettify JSON, convert to Markdown — one click to reshape any content.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950",
  },
  {
    icon: FolderOpen,
    title: "Collections",
    description:
      "Organize items into named collections. Group by project, topic, or anything. Export as Markdown in one click.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950",
  },
  {
    icon: RefreshCw,
    title: "Cross-Device Sync",
    description:
      "Sign in on any device and your full queue is there instantly. Copy on your phone, paste on your laptop.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950",
  },
  {
    icon: Pin,
    title: "Pin & Prioritize",
    description:
      "Pin important items so they always stay at the top of your queue. Perfect for frequently reused snippets.",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950",
  },
];

const steps = [
  {
    step: "1",
    title: "Sign up for free",
    description: "Create your account with Google or email in under 30 seconds.",
  },
  {
    step: "2",
    title: "Install the extension",
    description: "Add PasteQueue to Chrome. It starts capturing copies immediately.",
  },
  {
    step: "3",
    title: "Copy as normal",
    description:
      "Every Ctrl+C is saved to your queue. Access any item from the extension popup or dashboard.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Clipboard className="h-5 w-5 text-indigo-500" />
            PasteQueue
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-indigo-50/50 to-background dark:from-indigo-950/20">
        <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-sm font-medium px-3 py-1 rounded-full mb-6">
          <Globe className="h-3.5 w-3.5" />
          Chrome Extension Available
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight max-w-3xl mb-6 text-balance">
          Never lose a{" "}
          <span className="text-indigo-500">copied item</span> again
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl mb-10 text-balance">
          PasteQueue captures everything you copy into a persistent, searchable
          queue — with transforms, collections, and real-time cross-device sync.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="gap-2 px-8">
              Start for Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="px-8">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Fake dashboard preview */}
        <div className="mt-16 w-full max-w-3xl rounded-xl border shadow-2xl overflow-hidden bg-card">
          <div className="h-8 bg-muted flex items-center gap-1.5 px-3">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <div className="ml-4 flex-1 h-4 bg-background rounded text-xs text-muted-foreground flex items-center px-2">
              pastequeue.app/dashboard
            </div>
          </div>
          <div className="p-4 space-y-2 bg-background">
            {[
              { type: "url", content: "https://github.com/anthropics/claude-code", time: "just now" },
              { type: "code", content: 'const q = await supabase.from("items").select("*")', time: "2m ago" },
              { type: "text", content: "Meeting notes: Review auth flow, deploy to Vercel, check Sentry alerts...", time: "15m ago", pinned: true },
              { type: "url", content: "https://tailwindcss.com/docs/installation", time: "1h ago" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg border text-sm ${item.pinned ? "border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/20" : "bg-card"}`}
              >
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                    item.type === "url"
                      ? "bg-green-100 text-green-700"
                      : item.type === "code"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {item.type}
                </span>
                {item.pinned && <Pin className="h-3 w-3 text-indigo-500 shrink-0" />}
                <span className="truncate text-muted-foreground">{item.content}</span>
                <span className="ml-auto text-xs text-muted-foreground shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything your clipboard should be
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built for developers, writers, and anyone who copies more than
              one thing at a time.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex p-2.5 rounded-lg ${feature.bg} mb-4`}>
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Up and running in 60 seconds</h2>
            <p className="text-muted-foreground">
              No configuration. No learning curve. Just install and copy.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="h-12 w-12 rounded-full bg-indigo-500 text-white text-lg font-bold flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-indigo-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Your clipboard, finally under control
        </h2>
        <p className="text-indigo-100 max-w-md mx-auto mb-8">
          Join developers and knowledge workers who never lose a copied item.
          Free to start, no credit card required.
        </p>
        <Link href="/signup">
          <Button size="lg" variant="secondary" className="px-10 gap-2">
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm font-bold">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600">
              <Clipboard className="h-3.5 w-3.5 text-white" />
            </div>
            PasteQueue
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="mailto:support@pastequeue.app" className="hover:text-foreground transition-colors">Support</Link>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} PasteQueue. All rights reserved.<br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>Built with Next.js &amp; Supabase.
          </p>
        </div>
      </footer>
    </div>
  );
}
