"use client";

import { Button } from "@/app/components/ui/button";

export default function ProfilePage() {
  return (
    <div className="flex flex-col">
      User Profile Page
      <Button
        variant="default"
        size="lg"
        onClick={() => {
          localStorage.removeItem("signedIn");
          window.location.href = "/";
        }}>
        Sign Out
      </Button>
    </div>
  );
}
