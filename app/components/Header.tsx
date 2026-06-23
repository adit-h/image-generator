"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
      <nav className="flex items-center justify-between max-w-5xl mx-auto h-14 px-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Design Generator
        </Link>
        <div className="flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-foreground dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/gallery"
            className="text-sm font-medium text-gray-600 hover:text-foreground dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            Gallery
          </Link>
        </div>
      </nav>
    </header>
  );
}
