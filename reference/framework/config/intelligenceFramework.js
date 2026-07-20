import { modulePlugins } from '@/modules'
import { platformInfo } from '@/framework/config/platformInfo'

export const frameworkBrand = {
  name: platformInfo.platformName,
  shortName: platformInfo.platformName,
  navName: process.env.NEXT_PUBLIC_IAF_NAV_NAME || platformInfo.organizationName,
  logoMark: process.env.NEXT_PUBLIC_IAF_LOGO_MARK || 'SI',
  tagline: 'Scientific intelligence platform for Mexican state capability reports and investable science opportunities.',
  defaultModuleId: process.env.NEXT_PUBLIC_IAF_DEFAULT_MODULE || 'investment-dashboard',
}

export const intelligenceModules = modulePlugins

export function getIntelligenceModule(moduleId) {
  return intelligenceModules.find((module) => module.id === moduleId) ?? null
}

export function getDefaultIntelligenceModule() {
  return getIntelligenceModule(frameworkBrand.defaultModuleId) ?? intelligenceModules[0]
}
