import * as React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-background/50 backdrop-blur-sm border-t border-border/50 mt-8">
      <div className="container mx-auto flex h-16 items-center px-4 justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Tasty Tomes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
