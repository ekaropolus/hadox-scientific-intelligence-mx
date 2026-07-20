export const frameworkRoles = {
  admin: 'framework-admin',
  owner: 'module-owner',
  analyst: 'analyst',
  viewer: 'viewer',
}

export const frameworkPermissions = {
  adminRead: 'admin:read',
  adminWrite: 'admin:write',
  auditRead: 'audit:read',
  moduleRead: 'module:read',
  moduleWrite: 'module:write',
  reportsRead: 'reports:read',
  reportsWrite: 'reports:write',
  usersWrite: 'users:write',
}

export const rolePermissions = {
  [frameworkRoles.admin]: Object.values(frameworkPermissions),
  [frameworkRoles.owner]: [
    frameworkPermissions.moduleRead,
    frameworkPermissions.moduleWrite,
    frameworkPermissions.reportsRead,
    frameworkPermissions.reportsWrite,
    frameworkPermissions.auditRead,
  ],
  [frameworkRoles.analyst]: [
    frameworkPermissions.moduleRead,
    frameworkPermissions.reportsRead,
    frameworkPermissions.reportsWrite,
  ],
  [frameworkRoles.viewer]: [frameworkPermissions.moduleRead, frameworkPermissions.reportsRead],
}

export function getPermissionsForRoles(roles = []) {
  return Array.from(new Set(roles.flatMap((role) => rolePermissions[role] ?? [])))
}

export function hasPermission(user, permission) {
  if (!user) return false
  return getPermissionsForRoles(user.roles ?? []).includes(permission)
}
