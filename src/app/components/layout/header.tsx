"use client";

import { useEffect, useState } from "react";
import { LinkAsButton } from "../ui/LinkAsButton";

export function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // This effect is to ensure the component re-renders on client side to check localStorage
    const checkSignedIn = localStorage.getItem("signedIn") === "true";

    setIsSignedIn(checkSignedIn);
  }, []);

  return (
    <header className="w-full bg-background/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-lg font-semibold">Tasty Tomes</h1>
        {isSignedIn ? (
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
