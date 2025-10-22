"use client";

import * as React from "react";
import { checkIfSignedIn } from "@/app/components/lib/utils";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export default function SignUpPage() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isUserSignedIn = checkIfSignedIn();

  const handleSignUpTEMP = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Signing up with data:", formData);

    // Simulate successful sign-up by setting signedIn to true
    localStorage.setItem("signedIn", "true");
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userPassword", formData.password);

    window.location.href = "/";
  };

  return (
    <div>
      Sign Up Page
      {!isUserSignedIn ? (
        <div>
          <form onSubmit={handleSignUpTEMP}>
            <Input
              placeholder="First Name"
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              onChange={handleInputChange}
            />
            <Input
              placeholder="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              onChange={handleInputChange}
            />
            <Input
              placeholder="Username"
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              onChange={handleInputChange}
            />
            <Input
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              onChange={handleInputChange}
            />
            <Input
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
            />
            <Button variant="default" size="lg" type="submit">
              Sign Up!
            </Button>
          </form>
        </div>
      ) : (
        <div>You are already signed in.</div>
      )}
    </div>
  );
}
