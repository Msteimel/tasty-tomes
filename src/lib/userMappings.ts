/**
 * User profile mappings for the application
 * In production, this would come from a database
 */

export const userIdToSlug: Record<string, string> = {
  "user-001": "current-user",
  "user-002": "sarah-johnson",
  "test-admin": "admin-user",
  "test-contributor": "contributor-user",
  "test-viewer": "viewer-user",
  "non-member": "non-member",
};

export const usernameToUserId: Record<string, string> = {
  "current-user": "user-001",
  "sarah-johnson": "user-002",
  "admin-user": "test-admin",
  "contributor-user": "test-contributor",
  "viewer-user": "test-viewer",
  "non-member": "non-member",
};

export const userProfiles: Record<
  string,
  { name: string; email: string; joinDate: Date }
> = {
  "user-001": {
    name: "Current User",
    email: "user-001@example.com",
    joinDate: new Date("2024-01-01"),
  },
  "user-002": {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    joinDate: new Date("2024-02-15"),
  },
  "test-admin": {
    name: "Admin User",
    email: "admin@example.com",
    joinDate: new Date("2024-03-01"),
  },
  "test-contributor": {
    name: "Contributor User",
    email: "contributor@example.com",
    joinDate: new Date("2024-04-10"),
  },
  "test-viewer": {
    name: "Viewer User",
    email: "viewer@example.com",
    joinDate: new Date("2024-05-20"),
  },
  "non-member": {
    name: "Non-Member",
    email: "nonmember@example.com",
    joinDate: new Date("2024-06-15"),
  },
};
