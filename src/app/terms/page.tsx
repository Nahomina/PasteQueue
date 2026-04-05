/**
 * Copyright © 2026 PasteQueue. All rights reserved.
 */
import Link from "next/link";
import { Clipboard } from "lucide-react";

const YEAR = new Date().getFullYear();

export const metadata = {
  title: "Terms of Service — PasteQueue",
  description: "Terms and conditions for using PasteQueue.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-5 h-14 flex items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-base tracking-tight">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
            <Clipboard className="h-4 w-4 text-white" />
          </div>
          PasteQueue
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-5 py-16 prose prose-gray prose-headings:tracking-tight prose-headings:font-bold">
        <h1>Terms of Service</h1>
        <p className="text-gray-500 text-sm">Last updated: April 5, {YEAR}</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using PasteQueue (&quot;the Service&quot;), you agree to be
          bound by these Terms of Service. If you do not agree to these terms,
          do not use the Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          PasteQueue is a clipboard management tool that captures, stores, and
          syncs clipboard history across devices. The Service includes a web
          application and a Chrome browser extension.
        </p>

        <h2>3. User Accounts</h2>
        <ul>
          <li>You must provide accurate information when creating an account.</li>
          <li>You are responsible for maintaining the security of your account credentials.</li>
          <li>You must be at least 13 years old to use the Service.</li>
          <li>One person or entity may not maintain more than one free account.</li>
        </ul>

        <h2>4. Acceptable Use</h2>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>Store or transmit malicious code, viruses, or harmful content</li>
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe on intellectual property rights of others</li>
          <li>Attempt to gain unauthorized access to the Service or other accounts</li>
          <li>Reverse engineer or attempt to extract source code</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          The Service, including all software, design, and content, is owned by
          PasteQueue and protected by copyright law. © {YEAR} PasteQueue.
          All rights reserved. You may not copy, modify, or distribute any
          part of the Service without written permission.
        </p>

        <h2>6. Your Content</h2>
        <p>
          You retain full ownership of your clipboard data. By using the Service,
          you grant PasteQueue a limited license to store and process your data
          solely to provide the Service. We do not claim ownership of your content.
        </p>

        <h2>7. Disclaimer of Warranties</h2>
        <p>
          The Service is provided &quot;as is&quot; without warranties of any kind.
          PasteQueue does not warrant that the Service will be uninterrupted,
          error-free, or meet your specific requirements.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, PasteQueue shall not be liable
          for any indirect, incidental, special, or consequential damages arising
          from your use of the Service.
        </p>

        <h2>9. Termination</h2>
        <p>
          We may terminate or suspend your account at any time for violation of
          these Terms. You may terminate your account at any time by contacting
          support. Upon termination, your data will be deleted within 30 days.
        </p>

        <h2>10. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will notify
          users of significant changes via email at least 14 days in advance.
        </p>

        <h2>11. Contact</h2>
        <p>
          For questions about these Terms, email{" "}
          <a href="mailto:support@pastequeue.app">support@pastequeue.app</a>.
        </p>
      </main>

      <footer className="border-t border-gray-100 py-8 px-5 text-center text-xs text-gray-400">
        © {YEAR} PasteQueue · <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
      </footer>
    </div>
  );
}
