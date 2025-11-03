"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDevUser } from "@/app/components/dev/RoleSwitcher";
import { userIdToSlug } from "@/lib/userMappings";

export default function ProfilePage() {
  const router = useRouter();
  const currentUserId = useDevUser();

  useEffect(() => {
    // Redirect to the user's specific profile page
    const username = userIdToSlug[currentUserId] || "current-user";
    router.push(`/profile/${username}`);
  }, [currentUserId, router]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <p className="text-gray-600">Redirecting to your profile...</p>
    </div>
  );
}
