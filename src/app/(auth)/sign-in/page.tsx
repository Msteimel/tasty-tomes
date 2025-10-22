"use client";

import * as React from "react";
import { checkIfSignedIn } from "@/app/components/lib/utils";
import { Button } from "@/app/components/ui/button";
import { LinkAsButton } from "../../components/ui/LinkAsButton";
import { Input } from "@/app/components/ui/input";

export default function SignInPage() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignInTEMP = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem("signedIn", "true");
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userPassword", formData.password);

    console.log("signing in with", formData.email, formData.password);

    window.location.href = "/";
  };

  const isUserSignedIn = checkIfSignedIn();

  return (
    <div className="max-w-3xl mx-auto">
      <h1>Sign In Page</h1>
      {!isUserSignedIn ? (
        <>
          <form onSubmit={handleSignInTEMP}>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
              autoComplete="email"
              value={formData.email || ""}
            />
            <Input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
              value={formData.password || ""}
            />
            <Button variant="default" size="lg" type="submit">
              Sign In!
            </Button>
          </form>
          <p>not a member?</p>
          <LinkAsButton href="/sign-up" variant="outline" size="sm">
            Sign Up
          </LinkAsButton>
        </>
      ) : (
        <p>You are already signed in.</p>
      )}
    </div>
  );
}
