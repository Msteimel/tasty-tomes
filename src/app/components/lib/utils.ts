"use client";

import { clsx, type ClassValue } from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkIfSignedIn(): boolean {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // This effect is to ensure the component re-renders on client side to check localStorage
    const checkSignedIn = localStorage.getItem("signedIn") === "true";

    setIsSignedIn(checkSignedIn);
  }, []);
  return isSignedIn;
}
