"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCookbookById } from "@/lib/dummyData";
import { Cookbook, CookbookMember } from "@/lib/types";
import { CookbookRole } from "@/lib/permissions";
import {
  canManageMembers,
  getRoleBadgeColor,
  getRoleDescription,
  canRemoveMember,
  canChangeMemberRole,
  getUserRole,
} from "@/lib/permissions";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export default function ManageMembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [cookbook, setCookbook] = useState<Cookbook | null>(null);
  const [members, setMembers] = useState<CookbookMember[]>([]);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<
    "admin" | "editor" | "contributor" | "viewer"
  >("viewer");
  const [isLoading, setIsLoading] = useState(true);

  // TODO: Replace with actual authenticated user
  const currentUserId = "Current User";

  useEffect(() => {
    params.then(({ id }) => {
      const loadedCookbook = getCookbookById(id);
      if (loadedCookbook) {
        setCookbook(loadedCookbook);
        setMembers(loadedCookbook.members);
      }
      setIsLoading(false);
    });
  }, [params]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!cookbook) {
    router.push("/cookbook");
    return null;
  }

  // Check permissions
  if (!canManageMembers(cookbook, currentUserId)) {
    router.push(`/cookbook/${cookbook.id}`);
    return null;
  }

  const handleInviteMember = () => {
    if (!newMemberEmail.trim()) {
      alert("Please enter an email address");
      return;
    }

    // Check if member already exists
    if (members.some((m) => m.userId === newMemberEmail)) {
      alert("This user is already a member of the cookbook");
      return;
    }

    // TODO: In production, this would validate the email and look up the user
    const newMember: CookbookMember = {
      userId: newMemberEmail,
      username: newMemberEmail, // In real app, this would be the user's display name
      role: newMemberRole,
      addedAt: new Date(),
    };

    setMembers([...members, newMember]);
    setNewMemberEmail("");
    setNewMemberRole("viewer");

    // TODO: Save to database
    console.log("Added member:", newMember);
  };

  const handleRemoveMember = (userId: string) => {
    const memberToRemove = members.find((m) => m.userId === userId);
    if (!memberToRemove) return;

    if (!canRemoveMember(cookbook, memberToRemove)) {
      alert("Cannot remove the last owner of the cookbook");
      return;
    }

    if (
      !confirm(
        "Are you sure you want to remove this member from the cookbook?"
      )
    ) {
      return;
    }

    setMembers(members.filter((m) => m.userId !== userId));

    // TODO: Save to database
    console.log("Removed member:", userId);
  };

  const handleChangeMemberRole = (userId: string, newRole: string) => {
    const memberToUpdate = members.find((m) => m.userId === userId);
    if (!memberToUpdate) return;

    // Check if current user has permission to change this role
    if (
      !canChangeMemberRole(
        cookbook,
        currentUserId,
        memberToUpdate,
        newRole as CookbookRole
      )
    ) {
      alert(
        "You don't have permission to change this member's role. Admins cannot change owner roles or promote to owner."
      );
      return;
    }

    // If changing from owner to another role, check if there's another owner
    if (memberToUpdate.role === "owner" && newRole !== "owner") {
      const ownerCount = members.filter((m) => m.role === "owner").length;
      if (ownerCount <= 1) {
        alert(
          "Cannot change the role of the last owner. Add another owner first."
        );
        return;
      }
    }

    // Confirm role change
    const oldRoleLabel = memberToUpdate.role.charAt(0).toUpperCase() + memberToUpdate.role.slice(1);
    const newRoleLabel = newRole.charAt(0).toUpperCase() + newRole.slice(1);
    
    if (
      !confirm(
        `Are you sure you want to change ${userId}'s role from ${oldRoleLabel} to ${newRoleLabel}?`
      )
    ) {
      return;
    }

    setMembers(
      members.map((m) =>
        m.userId === userId
          ? {
              ...m,
              role: newRole as
                | "owner"
                | "admin"
                | "editor"
                | "contributor"
                | "viewer",
            }
          : m
      )
    );

    // TODO: Save to database
    console.log("Changed role:", userId, newRole);
  };

  const handleTransferOwnership = (newOwnerId: string) => {
    const currentUserRole = getUserRole(cookbook, currentUserId);
    
    // Only owners can transfer ownership
    if (currentUserRole !== "owner") {
      alert("Only owners can transfer ownership.");
      return;
    }

    if (
      !confirm(
        "Are you sure you want to transfer ownership? You will become an admin."
      )
    ) {
      return;
    }

    setMembers(
      members.map((m) => {
        if (m.userId === currentUserId) {
          return { ...m, role: "admin" as const };
        }
        if (m.userId === newOwnerId) {
          return { ...m, role: "owner" as const };
        }
        return m;
      })
    );

    // TODO: Save to database
    console.log("Transferred ownership to:", newOwnerId);
    alert("Ownership transferred successfully");
  };

  const owners = members.filter((m) => m.role === "owner");
  const admins = members.filter((m) => m.role === "admin");
  const editors = members.filter((m) => m.role === "editor");
  const contributors = members.filter((m) => m.role === "contributor");
  const viewers = members.filter((m) => m.role === "viewer");

  const currentUserRole = getUserRole(cookbook, currentUserId);
  const isCurrentUserOwner = currentUserRole === "owner";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/cookbook/${cookbook.id}`}
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to {cookbook.name}
        </Link>
        <h1 className="text-4xl font-bold mb-2">Manage Members</h1>
        <p className="text-gray-600">
          Add, remove, or change roles for cookbook members.
        </p>
      </div>

      {/* Invite New Member Section */}
      <section className="border rounded-lg p-6 bg-white shadow-sm mb-6">
        <h2 className="text-2xl font-bold mb-4">Invite New Member</h2>
        <div className="flex gap-3 mb-4">
          <Input
            type="email"
            placeholder="Enter email address"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            className="flex-1"
          />
          <Select
            value={newMemberRole}
            onValueChange={(value) =>
              setNewMemberRole(
                value as "admin" | "editor" | "contributor" | "viewer"
              )
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="viewer">Viewer</SelectItem>
              <SelectItem value="contributor">Contributor</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              {isCurrentUserOwner && <SelectItem value="admin">Admin</SelectItem>}
            </SelectContent>
          </Select>
          <Button type="button" onClick={handleInviteMember} variant="default">
            Invite
          </Button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-900">
            Role Permissions:
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              <strong>Owner:</strong> {getRoleDescription("owner")}
            </li>
            <li>
              <strong>Admin:</strong> {getRoleDescription("admin")}
            </li>
            <li>
              <strong>Editor:</strong> {getRoleDescription("editor")}
            </li>
            <li>
              <strong>Contributor:</strong> {getRoleDescription("contributor")}
            </li>
            <li>
              <strong>Viewer:</strong> {getRoleDescription("viewer")}
            </li>
          </ul>
        </div>
      </section>

      {/* Current Members Section */}
      <section className="border rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-2xl font-bold mb-4">
          Current Members ({members.length})
        </h2>

        {/* Owners */}
        {owners.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Owners ({owners.length})
            </h3>
            <div className="space-y-3">
              {owners.map((member) => (
                <div
                  key={member.userId}
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium">{member.userId}</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                          member.role
                        )}`}
                      >
                        Owner
                      </span>
                      {member.userId === currentUserId && (
                        <span className="text-xs text-gray-500">(You)</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Added {member.addedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {member.userId === currentUserId &&
                      owners.length === 1 && (
                        <span className="text-xs text-gray-500 italic">
                          Last owner
                        </span>
                      )}
                    {member.userId !== currentUserId && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleTransferOwnership(member.userId)
                        }
                        className="text-xs"
                      >
                        Transfer Ownership
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admins */}
        {admins.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Admins ({admins.length})
            </h3>
            <div className="space-y-3">
              {admins.map((member) => (
                <div
                  key={member.userId}
                  className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium">{member.userId}</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                          member.role
                        )}`}
                      >
                        Admin
                      </span>
                      {member.userId === currentUserId && (
                        <span className="text-xs text-gray-500">(You)</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Added {member.addedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCurrentUserOwner && (
                      <>
                        <Select
                          value={member.role}
                          onValueChange={(value) =>
                            handleChangeMemberRole(member.userId, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="contributor">
                              Contributor
                            </SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleRemoveMember(member.userId)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Editors */}
        {editors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Editors ({editors.length})
            </h3>
            <div className="space-y-3">
              {editors.map((member) => (
                <div
                  key={member.userId}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium">{member.userId}</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                          member.role
                        )}`}
                      >
                        Editor
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Added {member.addedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={member.role}
                      onValueChange={(value) =>
                        handleChangeMemberRole(member.userId, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {isCurrentUserOwner && (
                          <>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </>
                        )}
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="contributor">Contributor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveMember(member.userId)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contributors */}
        {contributors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Contributors ({contributors.length})
            </h3>
            <div className="space-y-3">
              {contributors.map((member) => (
                <div
                  key={member.userId}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium">{member.userId}</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                          member.role
                        )}`}
                      >
                        Contributor
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Added {member.addedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={member.role}
                      onValueChange={(value) =>
                        handleChangeMemberRole(member.userId, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {isCurrentUserOwner && (
                          <>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </>
                        )}
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="contributor">Contributor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveMember(member.userId)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Viewers */}
        {viewers.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Viewers ({viewers.length})
            </h3>
            <div className="space-y-3">
              {viewers.map((member) => (
                <div
                  key={member.userId}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium">{member.userId}</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                          member.role
                        )}`}
                      >
                        Viewer
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Added {member.addedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={member.role}
                      onValueChange={(value) =>
                        handleChangeMemberRole(member.userId, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {isCurrentUserOwner && (
                          <>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </>
                        )}
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="contributor">Contributor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveMember(member.userId)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {members.length === 0 && (
          <p className="text-gray-500 text-center py-6">
            No members yet. Invite someone to get started!
          </p>
        )}
      </section>
    </div>
  );
}
