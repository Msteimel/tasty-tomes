"use client";

import Link from "next/link"; // Next.js Link component for client-side navigation
import { checkIfSignedIn } from "@/app/components/lib/utils";
import { LinkAsButton } from "../ui/LinkAsButton";

export function Header() {
  const isUserSignedIn = checkIfSignedIn();

  return (
    <header className="w-full bg-background/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Link wraps the logo/title for navigation to home page */}
        <Link
          href="/"
          className="text-lg font-semibold hover:opacity-80 transition-opacity">
          Tasty Tomes
        </Link>

        {/* LinkAsButton already uses Next.js Link internally for styled button links */}
        {isUserSignedIn ? (
          <LinkAsButton href="/profile" variant="outline" size="sm">
            Profile
          </LinkAsButton>
        ) : (
          <LinkAsButton href="/sign-in" variant="outline" size="sm">
            Sign In
          </LinkAsButton>
        )}
      </div>
    </header>
  );
}

export default Header;
