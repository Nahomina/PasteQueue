/**
 * Copyright © 2026 PasteQueue. All rights reserved.
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Clipboard,
  Search,
  Wand2,
  FolderOpen,
  RefreshCw,
  Pin,
  ArrowRight,
  Zap,
  ChevronDown,
} from "lucide-react";

const YEAR = new Date().getFullYear();

const features = [
  {
    icon: Clipboard,
    title: "Nothing gets lost",
    description:
      "Copy 50 things in a row. Every single one is waiting for you — searchable, in order, forever. Your clipboard finally has memory.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "group-hover:border-indigo-200",
  },
  {
    icon: Search,
    title: "Find anything in under a second",
    description:
      "Search that URL you copied three weeks ago. It's there. Full-text search across your entire history — filtered by type, date, or source.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200",
  },
  {
    icon: Wand2,
    title: "Stop reformatting manually",
    description:
      "One click turns raw HTML into clean text, extracts every URL, prettifies JSON, or converts to Markdown. Your clipboard, transformed.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "group-hover:border-amber-200",
  },
  {
    icon: FolderOpen,
    title: "Your clipboard, finally organized",
    description:
      "Group copies by project, client, or topic. Export a whole collection as Markdown in one click. Organized the way your brain works.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "group-hover:border-emerald-200",
  },
  {
    icon: RefreshCw,
    title: "Copy on your phone, paste on your laptop",
    description:
      "Your queue follows you everywhere. Sign in on any device and everything is already there. Zero setup. Always in sync.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "group-hover:border-purple-200",
  },
  {
    icon: Pin,
    title: "Keep your best snippets always on top",
    description:
      "Pin your boilerplate, your address, your templates. They never scroll away. The things you use daily are always one click away.",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "group-hover:border-rose-200",
  },
];

const steps = [
  {
    step: "1",
    title: "Sign up free",
    description: "Create your account with email or Google in under 30 seconds. No credit card.",
  },
  {
    step: "2",
    title: "Install the extension",
    description: "Add PasteQueue to Chrome. It silently captures copies in the background.",
  },
  {
    step: "3",
    title: "Copy as normal — we handle the rest",
    description: "Every Ctrl+C lands in your queue. Search, transform, and reuse anything instantly.",
  },
];

const stats = [
  { value: "∞", label: "Clipboard history" },
  { value: "<1s", label: "Search speed" },
  { value: "0", label: "Config required" },
  { value: "100%", label: "Privacy-first" },
];

const faqs = [
  {
    q: "What exactly is PasteQueue?",
    a: "PasteQueue is a clipboard manager that lives in your browser. Every time you copy something — a URL, a code snippet, a paragraph, an image — PasteQueue quietly saves it to a persistent, searchable queue. You can access it from any device, search through your entire history, apply one-click transforms, and organise items into collections. Think of it as an upgrade to the single-item clipboard your OS gives you.",
  },
  {
    q: "How does PasteQueue capture clipboard data?",
    a: "PasteQueue uses a Chrome extension with the clipboardRead permission. When you press Ctrl+C (or Cmd+C on Mac) on any webpage, the extension intercepts the copy event, reads the selected content, and securely sends it to your personal queue via our API. The extension only activates on copy events — it never reads your clipboard in the background or without you actively copying something.",
  },
  {
    q: "Is my clipboard data private and secure?",
    a: "Yes. All data is stored in a database with Row-Level Security — meaning the database itself enforces that you can only ever read your own items, even if our application code had a bug. Data is encrypted in transit (HTTPS) and at rest. We do not sell, share, or analyse your clipboard content. You can delete individual items or your entire history at any time.",
  },
  {
    q: "Will PasteQueue capture my passwords or sensitive data?",
    a: "PasteQueue captures everything you copy — so yes, if you copy a password, it will appear in your queue. We strongly recommend pinning a reminder to clear sensitive items after use, or using the built-in delete function immediately. A future Pro feature will let you set up keyword-based auto-exclusion rules (e.g. anything matching a password manager pattern is never saved).",
  },
  {
    q: "What's free and what will cost money?",
    a: "PasteQueue is free to get started with a generous free tier that includes your full clipboard history, search, transforms, and cross-device sync. As we grow, we'll introduce a Pro plan for power users and teams — with features like higher storage limits, advanced transforms, team-shared collections, priority support, and integrations. Early users who sign up now will receive a discounted rate when Pro launches.",
  },
  {
    q: "When will Pro launch, and how much will it cost?",
    a: "We're aiming to launch Pro within the next few months. Pricing will be competitive — expect something in the range of $5–9/month for individuals and team plans for larger groups. Everyone who signs up during our early access phase will be grandfathered into a lower rate. We'll email you before any paid features go live, with plenty of notice.",
  },
  {
    q: "Does cross-device sync work in real time?",
    a: "Yes. Copy something on your work laptop, open PasteQueue on your phone, and it's already there — usually within a second. Sync is powered by Supabase Realtime over WebSockets, so there's no polling or manual refresh needed.",
  },
  {
    q: "Which browsers are supported?",
    a: "The Chrome extension (Manifest V3) works on Chrome, Brave, Edge, Arc, and any other Chromium-based browser. The web dashboard works in every modern browser — Safari, Firefox, Chrome — so you can always view and manage your queue even without the extension installed.",
  },
  {
    q: "Does PasteQueue work offline?",
    a: "The web dashboard requires an internet connection to sync and search. However, a future version of the extension will cache your most recent items locally so you can access them even without a connection, syncing changes when you're back online.",
  },
  {
    q: "How is PasteQueue different from my OS clipboard history (Windows + V or macOS clipboard)?",
    a: "Your OS clipboard history is local-only, limited in size, wiped on restart, and has no search or organisation. PasteQueue is persistent across restarts and devices, unlimited in size, fully searchable, supports transforms (strip formatting, extract URLs, prettify JSON), and lets you organise items into collections. It also works across every device you own — your phone, tablet, and multiple computers.",
  },
  {
    q: "What are Transforms?",
    a: "Transforms are one-click operations that modify your copied content. Current transforms include: Strip formatting (HTML → plain text), Extract all URLs from a block of text, Prettify JSON, Convert to Markdown, Trim & clean whitespace, and UPPERCASE / lowercase. Select any item in your queue, click the transform icon, and the result replaces or is added as a new item. More transforms are coming based on user requests.",
  },
  {
    q: "Can I export my clipboard history?",
    a: "Yes. You can export individual collections as a Markdown or plain-text file with one click. Bulk export of your entire history is coming soon. Your data always belongs to you — we'll never hold it hostage.",
  },
  {
    q: "What happens to my data if I delete my account?",
    a: "All your clipboard items, collections, and account data are permanently deleted from our database within 30 days of account deletion, as per our Terms of Service. We do not keep backups of deleted user data beyond that window.",
  },
  {
    q: "Can I use PasteQueue on mobile?",
    a: "The web dashboard is fully mobile-responsive, so you can browse, search, and re-copy items from your phone's browser. A native mobile app (iOS & Android) is on our roadmap — it will allow you to copy on your phone and have it instantly appear on your desktop queue.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ── Nav ─────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-base tracking-tight">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 shadow-sm shadow-indigo-200">
              <Clipboard className="h-4 w-4 text-white" />
            </div>
            PasteQueue
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 rounded-lg">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-5 pt-24 pb-20 overflow-hidden">
        {/* Background radial glow */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
          <div className="h-[600px] w-[900px] rounded-full bg-indigo-100/60 blur-3xl -translate-y-1/3 opacity-70" />
        </div>

        {/* Badge */}
        <div className="relative inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide shadow-sm">
          <Zap className="h-3 w-3 fill-indigo-500 text-indigo-500" />
          Chrome Extension — Free to Get Started
        </div>

        {/* Headline */}
        <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1.06] max-w-3xl mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 bg-clip-text text-transparent text-balance">
          The clipboard manager{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            built for professionals.
          </span>
        </h1>

        <p className="relative text-lg md:text-xl text-gray-500 max-w-xl mb-10 leading-relaxed font-[450] text-balance">
          PasteQueue captures every copy into a persistent, searchable queue —
          with smart transforms, organized collections, and seamless cross-device
          sync. One install. Zero friction. Complete control.
        </p>

        <div className="relative flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Link href="/signup">
            <Button
              size="lg"
              className="gap-2 px-8 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-200 text-base font-semibold"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              size="lg"
              className="px-8 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 text-base"
            >
              Sign In
            </Button>
          </Link>
        </div>

        {/* Stats strip */}
        <div className="relative flex flex-wrap items-center justify-center gap-8 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-extrabold tracking-tight text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div className="relative w-full max-w-3xl rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/80 overflow-hidden ring-1 ring-black/5">
          <div className="h-9 bg-gray-100 flex items-center gap-1.5 px-4 border-b border-gray-200">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <div className="ml-4 flex-1 h-5 bg-white rounded-md border border-gray-200 text-xs text-gray-400 flex items-center px-2.5 shadow-sm">
              paste-queue.vercel.app/dashboard
            </div>
          </div>
          <div className="p-4 space-y-2 bg-white">
            {[
              { type: "url",  content: "https://github.com/anthropics/claude-code",             time: "just now", pinned: false },
              { type: "code", content: 'const q = await supabase.from("items").select("*")',    time: "2m ago",   pinned: false },
              { type: "text", content: "Meeting notes: Review auth flow, deploy to Vercel…",    time: "15m ago",  pinned: true  },
              { type: "url",  content: "https://tailwindcss.com/docs/installation",              time: "1h ago",   pinned: false },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-xl border text-sm transition-colors ${
                  item.pinned
                    ? "border-indigo-100 bg-indigo-50/60"
                    : "border-gray-100 bg-white hover:bg-gray-50"
                }`}
              >
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md tracking-wide ${
                  item.type === "url"  ? "bg-emerald-100 text-emerald-700" :
                  item.type === "code" ? "bg-amber-100 text-amber-700" :
                                         "bg-blue-100 text-blue-700"
                }`}>
                  {item.type}
                </span>
                {item.pinned && <Pin className="h-3 w-3 text-indigo-400 shrink-0" />}
                <span className="truncate text-gray-500 font-mono text-xs">{item.content}</span>
                <span className="ml-auto text-[11px] text-gray-300 shrink-0 tabular-nums">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────── */}
      <section className="py-28 px-5 bg-gray-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Why PasteQueue</p>
            <h2 className="text-4xl font-extrabold tracking-[-0.02em] text-gray-900 mb-4">
              What your OS clipboard should&apos;ve been
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto font-[450]">
              Built for developers, writers, and anyone who copies more than one thing at a time.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`group relative rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-0.5 transition-all duration-200 ${feature.border}`}
              >
                <div className={`inline-flex p-2.5 rounded-xl ${feature.bg} mb-5 ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="text-[15px] font-semibold tracking-tight text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-[450]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────── */}
      <section className="py-28 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Setup</p>
            <h2 className="text-4xl font-extrabold tracking-[-0.02em] text-gray-900 mb-4">
              Up and running in 60 seconds
            </h2>
            <p className="text-gray-500 font-[450]">
              No configuration. No learning curve. Just install and copy.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.step} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-gradient-to-r from-indigo-200 to-transparent" />
                )}
                <div className="relative inline-flex h-12 w-12 rounded-2xl bg-indigo-600 text-white text-lg font-bold items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-200">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 tracking-tight">{step.title}</h3>
                <p className="text-sm text-gray-500 font-[450] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing teaser ──────────────────── */}
      <section className="py-20 px-5 bg-gray-50/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-4xl font-extrabold tracking-[-0.02em] text-gray-900 mb-4">
              Start free. Scale when you&apos;re ready.
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto font-[450]">
              No credit card required to get started. Early users lock in the best rate when Pro launches.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
            {/* Free tier */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Free</p>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">$0</div>
              <p className="text-sm text-gray-500 mb-6">Forever, no card needed</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                {[
                  "Unlimited clipboard history",
                  "Full-text search",
                  "All transforms",
                  "Collections & pinning",
                  "Cross-device sync",
                  "Chrome extension",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl">
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Pro tier */}
            <div className="rounded-2xl border-2 border-indigo-500 bg-indigo-600 p-8 text-white relative overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-violet-500/30 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs font-semibold text-indigo-200 uppercase tracking-widest">Pro</p>
                  <span className="text-[10px] font-bold bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full tracking-wide">Coming soon</span>
                </div>
                <div className="text-4xl font-extrabold mb-1">~$7<span className="text-xl font-semibold text-indigo-300">/mo</span></div>
                <p className="text-sm text-indigo-200 mb-6">Early-access pricing locked in for you</p>
                <ul className="space-y-3 text-sm text-indigo-100 mb-8">
                  {[
                    "Everything in Free",
                    "Priority support",
                    "Advanced transforms",
                    "Team-shared collections",
                    "Auto-exclude sensitive patterns",
                    "Integrations (Notion, Slack, more)",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-300 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block">
                  <Button className="w-full bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl font-semibold">
                    Join Early Access
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────── */}
      <section className="py-28 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-extrabold tracking-[-0.02em] text-gray-900 mb-4">
              Everything you want to know
            </h2>
            <p className="text-gray-500 font-[450]">
              Can&apos;t find an answer?{" "}
              <a href="mailto:support@pastequeue.app" className="text-indigo-600 hover:underline underline-offset-4">
                Email us
              </a>{" "}
              and we&apos;ll reply within 24 hours.
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {faqs.map((faq, i) => (
              <details key={i} className="group py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 text-left select-none">
                  <span className="font-semibold text-gray-900 text-[15px] leading-snug group-open:text-indigo-600 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown className="h-5 w-5 text-gray-400 shrink-0 mt-0.5 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed font-[450]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────── */}
      <section className="py-28 px-5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 text-white text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold tracking-[-0.02em] mb-4 text-balance">
            Ready to work smarter?
          </h2>
          <p className="text-indigo-200 max-w-md mx-auto mb-10 font-[450] text-lg">
            Join professionals who have upgraded their clipboard workflow. Free to start — early users lock in the best Pro rate.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="px-10 gap-2 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl shadow-xl text-base font-semibold hover:shadow-2xl transition-all duration-200"
            >
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────── */}
      <footer className="border-t border-gray-100 py-10 px-5 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm font-bold tracking-tight">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600">
              <Clipboard className="h-3.5 w-3.5 text-white" />
            </div>
            PasteQueue
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-gray-900 transition-colors">Terms of Service</Link>
            <Link href="mailto:support@pastequeue.app" className="hover:text-gray-900 transition-colors">Support</Link>
          </div>
          <p className="text-xs text-gray-400 text-center">
            © {YEAR} PasteQueue · All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
