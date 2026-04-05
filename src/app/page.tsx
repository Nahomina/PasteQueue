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
  Globe,
  Pin,
  ArrowRight,
  Zap,
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
      "Pin your boilerplate, your address, your API keys. They never scroll away. The things you use daily are always one click away.",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "group-hover:border-rose-200",
  },
];

const steps = [
  {
    step: "1",
    title: "Sign up free",
    description: "Create your account with email in under 30 seconds. No credit card.",
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
          Chrome Extension — Free Forever
        </div>

        {/* Headline — Variation A */}
        <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1.06] max-w-3xl mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 bg-clip-text text-transparent text-balance">
          Your clipboard has amnesia.{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Fix it.
          </span>
        </h1>

        <p className="relative text-lg md:text-xl text-gray-500 max-w-xl mb-10 leading-relaxed font-[450] text-balance">
          Every Ctrl+C you&apos;ve ever lost ends here. PasteQueue queues,
          searches, and transforms everything you copy — across every device,
          forever. Install once. Never retype again.
        </p>

        <div className="relative flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Link href="/signup">
            <Button
              size="lg"
              className="gap-2 px-8 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-200 text-base font-semibold"
            >
              Kill the clipboard tax
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
                {/* Connector line */}
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

      {/* ── CTA ─────────────────────────────── */}
      <section className="py-28 px-5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 text-white text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold tracking-[-0.02em] mb-4 text-balance">
            Stop losing what you copy.
          </h2>
          <p className="text-indigo-200 max-w-md mx-auto mb-10 font-[450] text-lg">
            Join developers and knowledge workers who never retype from memory.
            Free to start — no credit card, no catch.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="px-10 gap-2 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl shadow-xl text-base font-semibold hover:shadow-2xl transition-all duration-200"
            >
              Get PasteQueue free
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
