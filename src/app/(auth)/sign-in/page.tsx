"use client";

import { Button } from "@/app/components/ui/button";
import { LinkAsButton } from "../../components/ui/LinkAsButton";

export default function SignInPage() {
  const handleSignInTEMP = () => {
    // will set a local storage item to simulate sign in for now
    localStorage.setItem("signedIn", "true");
    window.location.href = "/";
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1>Sign In Page</h1>
      <form onSubmit={handleSignInTEMP}>
        <Button variant="default" size="lg" type="submit">
          Sign In!
        </Button>
      </form>
      <p>not a member?</p>
      <LinkAsButton href="/sign-up" variant="outline" size="sm">
        Sign Up
      </LinkAsButton>
    </div>
  );
}
