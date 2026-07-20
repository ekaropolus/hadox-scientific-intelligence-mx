export const platformInfo = {
  organizationName: 'Hadox Research Labs',
  platformName: 'Scientific Intelligence',
  productName: 'Scientific Intelligence',
  legalEmail: 'contact@hadox.org',
  supportEmail: 'contact@hadox.org',
  privacyPath: '/privacy-policy',
  termsPath: '/terms-and-conditions',
  statusPath: '/system-status',
  feedbackPath: '/feedback',
}

export const feedbackMailto = `mailto:${platformInfo.supportEmail}?subject=${encodeURIComponent(
  'Scientific Intelligence feedback',
)}`
