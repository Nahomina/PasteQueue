/**
 * Copyright © 2026 PasteQueue. All rights reserved.
 */
import Link from "next/link";
import { Clipboard } from "lucide-react";

const YEAR = new Date().getFullYear();

export const metadata = {
  title: "Privacy Policy — PasteQueue",
  description: "How PasteQueue collects, uses, and protects your data.",
};

export default function PrivacyPage() {
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
        <h1>Privacy Policy</h1>
        <p className="text-gray-500 text-sm">Last updated: April 5, {YEAR}</p>

        <h2>1. Single Purpose Statement</h2>
        <p>
          PasteQueue&apos;s single purpose is to save clipboard history to the user&apos;s
          personal PasteQueue account, enabling cross-device access, search, and
          content transformation. The Chrome extension&apos;s sole function is to
          capture text copied by the user and sync it to their account.
        </p>

        <h2>2. Data We Collect</h2>
        <p>PasteQueue collects the following data:</p>
        <ul>
          <li>
            <strong>Clipboard content:</strong> The text content of items you explicitly
            copy while the extension is active. We do not collect passwords, financial
            data, credit card numbers, or any data from forms marked as sensitive
            (password fields, payment fields).
          </li>
          <li>
            <strong>Account information:</strong> Your name and email address, used
            solely to identify your account.
          </li>
          <li>
            <strong>Usage metadata:</strong> Timestamps, source URLs, and content type
            (text/URL/code) associated with each clipboard item.
          </li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <p>
          Clipboard data is transmitted securely (TLS 1.3) to our servers solely to
          provide the clipboard history sync feature. Your data is:
        </p>
        <ul>
          <li>Never sold to any third party</li>
          <li>Never shared with advertisers or data brokers</li>
          <li>Never used for advertising targeting</li>
          <li>Never analyzed beyond what is required to provide the service</li>
        </ul>

        <h2>4. Data Storage &amp; Security</h2>
        <p>
          All data is stored in an encrypted PostgreSQL database hosted on Supabase
          with Row Level Security (RLS) enforced — meaning no user can ever access
          another user&apos;s data. Data in transit is protected by TLS. Sensitive
          clipboard values may be additionally encrypted at rest.
        </p>

        <h2>5. User Control &amp; Deletion</h2>
        <ul>
          <li>You can delete any individual clipboard item at any time from the dashboard.</li>
          <li>You can clear your entire queue history with one click.</li>
          <li>You can disable clipboard capture by uninstalling the extension or signing out.</li>
          <li>You can request full account deletion by emailing <a href="mailto:support@pastequeue.app">support@pastequeue.app</a>. All data will be permanently deleted within 30 days.</li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>
          Clipboard data is retained until you delete it or close your account.
          Deleted items are permanently removed from our servers within 24 hours.
        </p>

        <h2>7. Third-Party Services</h2>
        <ul>
          <li><strong>Supabase:</strong> Database and authentication provider. <a href="https://supabase.com/privacy" target="_blank" rel="noopener">Privacy Policy</a></li>
          <li><strong>Vercel:</strong> Hosting provider. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a></li>
        </ul>

        <h2>8. Chrome Extension Permissions</h2>
        <p>The PasteQueue Chrome extension requests the following permissions:</p>
        <ul>
          <li><strong>clipboardRead:</strong> Required to capture copied text and save it to the user&apos;s personal clipboard history queue.</li>
          <li><strong>storage:</strong> Required to store your authentication token locally so you stay signed in.</li>
          <li><strong>notifications:</strong> Optional — used to confirm when an item has been saved.</li>
        </ul>

        <h2>9. Changes to This Policy</h2>
        <p>
          We will notify users of material changes via email or an in-app banner at
          least 14 days before the changes take effect.
        </p>

        <h2>10. Contact</h2>
        <p>
          For privacy questions or data deletion requests, email{" "}
          <a href="mailto:support@pastequeue.app">support@pastequeue.app</a>.
        </p>
      </main>

      <footer className="border-t border-gray-100 py-8 px-5 text-center text-xs text-gray-400">
        © {YEAR} PasteQueue · <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
      </footer>
    </div>
  );
}
