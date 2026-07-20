import { intelligenceModules } from './intelligenceFramework'

export const reportStatuses = ['draft', 'ready', 'archived']
export const reportTypes = ['report', 'analysis', 'dataset', 'dashboard', 'brief', 'idea', 'workspace']

export function getSeedReports() {
  return intelligenceModules.flatMap((module) =>
    (module.reportPacks ?? []).map((pack) => ({
      id: `${module.id}:${pack.id}`,
      moduleId: module.id,
      title: pack.title,
      status: pack.status,
      type: pack.type,
      source: 'module-seed',
      createdAt: null,
      updatedAt: null,
    })),
  )
}
