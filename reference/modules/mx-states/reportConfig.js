const commonTables = (slug, prefix, hasPriorityExecution = true, researcherClean = false) => {
  const core = `/reports/${slug}/03_csv_core`
  const detail = `/reports/${slug}/04_csv_detail`
  const researcherSuffix = researcherClean ? '_clean' : ''

  return {
    manifest: `/reports/${slug}/00_overview/manifest.csv`,
    finalReport: `/reports/${slug}/01_final_report/state_reporte_final_cliente.pdf`,
    bundle: `/reports/${slug}/01_final_report/state_paquete_completo_bundle.pdf`,
    sectorSummary: `${core}/${prefix}_sector_summary.csv`,
    municipalitySummary: `${core}/${prefix}_municipality_summary.csv`,
    offerLineSummary: `${core}/${prefix}_offer_line_summary.csv`,
    strategicVehicleSummary: `${core}/${prefix}_strategic_vehicle_summary.csv`,
    lineOperatingProspective: `${core}/${prefix}_line_operating_prospective.csv`,
    lineFinancialRoadmap: `${core}/${prefix}_line_financial_roadmap.csv`,
    priorityLineExecutionPortfolio: hasPriorityExecution ? `${core}/${prefix}_priority_line_execution_portfolio.csv` : null,
    priorityLineExecutionFichas: hasPriorityExecution ? `${core}/${prefix}_priority_line_execution_fichas.csv` : null,
    groundedCapabilityPackages: `${core}/${prefix}_grounded_capability_packages.csv`,
    groundedPackagePriorityTop4: `${core}/${prefix}_grounded_package_priority_top4.csv`,
    groundedPackage90dPlans: `${core}/${prefix}_grounded_package_90d_plans.csv`,
    groundedPackageWeeklyBoardSummary: `${core}/${prefix}_grounded_package_weekly_board_summary.csv`,
    groundedPackageNamedSummary: `${core}/${prefix}_grounded_package_named_summary.csv`,
    groundedPackagePilotClients: `${core}/${prefix}_grounded_package_pilot_clients_concrete.csv`,
    opportunityGraph: `${detail}/${prefix}_opportunity_graph.csv`,
    sectorCandidates: `${detail}/${prefix}_sector_candidates.csv`,
    researcherProductIntelligence: `${detail}/${prefix}_researcher_product_intelligence${researcherSuffix}.csv`,
    researcherExternalOutputs: `${detail}/${prefix}_researcher_external_outputs${researcherSuffix}.csv`,
    researcherResolutionStatus: researcherClean ? null : `${detail}/${prefix}_researcher_resolution_status.csv`,
    refinedLineMatch: `${detail}/${prefix}_refined_line_match_enriched.csv`,
    officialSignalAssessment: `${detail}/${prefix}_official_signal_assessment.csv`,
    groundedCapabilityMatrix: `${detail}/${prefix}_grounded_capability_matrix.csv`,
    groundedCapabilityPackageMembers: `${detail}/${prefix}_grounded_capability_package_members.csv`,
    groundedPackagePortfolio: `${detail}/${prefix}_grounded_package_portfolio.csv`,
    groundedPackageWeeklyBoard: `${detail}/${prefix}_grounded_package_weekly_board.csv`,
    groundedPackageNamedWeeklyBoard: `${detail}/${prefix}_grounded_package_named_weekly_board.csv`,
  }
}

const buildState = (state) => ({
  ...state,
  tables: commonTables(state.slug, state.prefix, state.hasPriorityExecution, state.researcherClean),
})

export const stateReports = [
  buildState({
    id: 'morelos',
    title: 'Morelos',
    code: 'MX-MOR',
    slug: 'morelos',
    prefix: 'mx-mor',
    accent: 'info',
    packageDate: '2026-04-19',
    mode: 'Dense Research',
    hasPriorityExecution: false,
    researcherClean: true,
    thesis:
      'Dense researcher coverage and a broad service economy make Morelos suitable for early science-to-market pilots in automation, decision intelligence, health analytics, and bioeconomy applications.',
  }),
  buildState({
    id: 'tlaxcala',
    title: 'Tlaxcala',
    code: 'MX-TLA',
    slug: 'tlaxcala',
    prefix: 'mx-tla',
    accent: 'success',
    packageDate: '2026-04-20',
    mode: 'Low Coverage',
    thesis:
      'Tlaxcala is best positioned for institution-led investment theses: manufacturing, materials, agro-bioeconomy, and decision intelligence should be validated before scaling.',
  }),
  buildState({
    id: 'queretaro',
    title: 'Queretaro',
    code: 'MX-QUE',
    slug: 'queretaro',
    prefix: 'mx-que',
    accent: 'primary',
    packageDate: '2026-04-20',
    mode: 'Standard',
    thesis:
      'Queretaro combines metropolitan demand, industrial depth, and visible research capacity, creating a strong case for international investment in decision intelligence, automation, health analytics, and industrial services.',
  }),
]

const controlSet = {
  dashboard: [
    {
      title: 'Dashboard Controls',
      items: [
        { id: 'lens-readiness', label: 'Readiness radar', kind: 'lens', value: 'readiness' },
        { id: 'lens-demand', label: 'Demand mix', kind: 'lens', value: 'demand' },
        { id: 'lens-projects', label: 'Project funnel', kind: 'lens', value: 'projects' },
      ],
    },
  ],
  market: [
    {
      title: 'Market Controls',
      items: [
        { id: 'lens-sectors', label: 'Sectors', kind: 'lens', value: 'sectors' },
        { id: 'lens-municipalities', label: 'Municipalities', kind: 'lens', value: 'municipalities' },
        { id: 'lens-offers', label: 'Offer lines', kind: 'lens', value: 'offers' },
        { id: 'lens-vehicles', label: 'Vehicles', kind: 'lens', value: 'vehicles' },
      ],
    },
    { title: 'Depth', items: [{ id: 'top-5', label: 'Top 5', kind: 'depth', value: 5 }, { id: 'top-10', label: 'Top 10', kind: 'depth', value: 10 }] },
  ],
  science: [
    {
      title: 'Science Controls',
      items: [
        { id: 'lens-institutions', label: 'Institutions', kind: 'lens', value: 'institutions' },
        { id: 'lens-disciplines', label: 'Disciplines', kind: 'lens', value: 'disciplines' },
        { id: 'lens-researchers', label: 'Researchers', kind: 'lens', value: 'researchers' },
      ],
    },
  ],
  product: [
    {
      title: 'Product Controls',
      items: [
        { id: 'lens-demand', label: 'Demand', kind: 'lens', value: 'demand' },
        { id: 'lens-readiness', label: 'Readiness', kind: 'lens', value: 'readiness' },
        { id: 'lens-vehicles', label: 'Vehicles', kind: 'lens', value: 'vehicles' },
      ],
    },
  ],
  roadmap: [
    {
      title: 'Roadmap Controls',
      items: [
        { id: 'lens-time', label: 'Time to revenue', kind: 'lens', value: 'time' },
        { id: 'lens-budget', label: 'Budget bands', kind: 'lens', value: 'budget' },
        { id: 'lens-risk', label: 'Risk pressure', kind: 'lens', value: 'risk' },
      ],
    },
  ],
  execution: [
    {
      title: 'Execution Controls',
      items: [
        { id: 'lens-tier', label: 'Tier flow', kind: 'lens', value: 'tier' },
        { id: 'lens-consortium', label: 'Consortium', kind: 'lens', value: 'consortium' },
        { id: 'lens-clients', label: 'Target clients', kind: 'lens', value: 'clients' },
      ],
    },
  ],
  grounded: [
    {
      title: 'Evidence Controls',
      items: [
        { id: 'lens-researchers', label: 'Researcher count', kind: 'lens', value: 'researchers' },
        { id: 'lens-lines', label: 'Parent lines', kind: 'lens', value: 'lines' },
        { id: 'lens-boundary', label: 'Evidence boundary', kind: 'lens', value: 'boundary' },
      ],
    },
  ],
  board: [
    {
      title: 'Board Controls',
      items: [
        { id: 'lens-goals', label: 'Goals', kind: 'lens', value: 'goals' },
        { id: 'lens-gates', label: 'Gates', kind: 'lens', value: 'gates' },
        { id: 'lens-risks', label: 'Risks', kind: 'lens', value: 'risks' },
      ],
    },
  ],
  clients: [
    {
      title: 'Client Proof Controls',
      items: [
        { id: 'view-pipeline', label: 'Proof funnel', kind: 'view', value: 'pipeline' },
        { id: 'view-matrix', label: 'Fit matrix', kind: 'view', value: 'matrix' },
        { id: 'view-shortlist', label: 'Shortlist', kind: 'view', value: 'shortlist' },
      ],
    },
  ],
}

const buildModule = ({ id, title, summary, icon, controls, defaultLens = 'readiness' }) => ({
  id,
  title,
  summary,
  eyebrow: 'Science investment module',
  accent: 'primary',
  icon,
  route: `/intelligence/${id}`,
  permissions: ['science:read', 'business:read', 'reports:read'],
  controlGroups: controls,
  defaultLens,
})

export const modulePlugins = [
  buildModule({
    id: 'investment-dashboard',
    title: 'Investment Dashboard',
    icon: 'activity',
    defaultLens: 'readiness',
    controls: controlSet.dashboard,
    summary: 'A forward-looking view of state readiness, project potential, and investor-relevant science opportunities.',
  }),
  buildModule({
    id: 'market-intelligence',
    title: 'Market Intelligence',
    icon: 'bar-chart',
    defaultLens: 'sectors',
    controls: controlSet.market,
    summary: 'Demand, sectors, municipalities, offer lines, and strategic vehicles that define the opportunity base.',
  }),
  buildModule({
    id: 'science-capacity',
    title: 'Science Capacity',
    icon: 'activity',
    defaultLens: 'institutions',
    controls: controlSet.science,
    summary: 'Researcher, institution, discipline, and works evidence supporting science-to-market claims.',
  }),
  buildModule({
    id: 'product-lines',
    title: 'Product Lines',
    icon: 'git-branch',
    defaultLens: 'demand',
    controls: controlSet.product,
    summary: 'Investable science-backed product and service lines, with vehicles and readiness signals.',
  }),
  buildModule({
    id: 'roadmap',
    title: 'Roadmap',
    icon: 'trending-up',
    defaultLens: 'time',
    controls: controlSet.roadmap,
    summary: 'Operating prospective, capital bands, revenue timing, and 12/24/36-month milestones.',
  }),
  buildModule({
    id: 'priority-execution',
    title: 'Priority Execution',
    icon: 'target',
    defaultLens: 'tier',
    controls: controlSet.execution,
    summary: 'Ranked projects, consortium logic, target clients, execution thesis, and budget sequencing.',
  }),
  buildModule({
    id: 'grounded-packages',
    title: 'Grounded Packages',
    icon: 'grid',
    defaultLens: 'researchers',
    controls: controlSet.grounded,
    summary: 'Evidence-backed capability packages grounded in researchers, works, topics, and institutions.',
  }),
  buildModule({
    id: 'ninety-day-board',
    title: '90-Day Board',
    icon: 'file-analytics',
    defaultLens: 'goals',
    controls: controlSet.board,
    summary: 'Near-term execution plans, gates, risks, owners, cadence, and first deliverables.',
  }),
  buildModule({
    id: 'pilot-clients',
    title: 'Pilot Clients',
    icon: 'briefcase',
    defaultLens: 'pipeline',
    controls: controlSet.clients,
    summary: 'Named accounts, science packages, outreach readiness, and 90-day proof paths for international science investment.',
  }),
]
