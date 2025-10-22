"use client";

import { checkIfSignedIn } from "@/app/components/lib/utils";
import { Button } from "@/app/components/ui/button";
import { LinkAsButton } from "@/app/components/ui/LinkAsButton";

export default function ProfilePage() {
  const isUserSignedIn = checkIfSignedIn(); // Since this is the profile page, we assume the user is signed in.

  const signUserOut = () => {
    localStorage.setItem("signedIn", "false");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    window.location.href = "/";
  };

  return isUserSignedIn ? (
    <div className="flex flex-col">
      User Profile Page
      <Button variant="default" size="lg" onClick={signUserOut}>
        Sign Out
      </Button>
    </div>
  ) : (
    <div className="flex flex-col">
      Please sign in to view your profile.
      <LinkAsButton href="/sign-in" variant="default" size="sm">
        Sign In
      </LinkAsButton>
    </div>
  );
}
