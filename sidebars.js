/**
 * Sidebars configuration for Google Cloud Professional Data Engineer Study Guide
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '🚀 Exam Strategy & Blueprint',
    },
    {
      type: 'category',
      label: 'Module 1: Designing Data Systems (~22%)',
      collapsed: false,
      items: [
        'module-1-designing-systems/security-and-compliance',
        'module-1-designing-systems/reliability-and-fidelity',
        'module-1-designing-systems/flexibility-and-portability',
        'module-1-designing-systems/data-migrations',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Ingesting & Processing (~25%)',
      collapsed: false,
      items: [
        'module-2-ingesting-processing/planning-data-pipelines',
        'module-2-ingesting-processing/building-pipelines',
        'module-2-ingesting-processing/deploying-operationalizing',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: Storing Data (~20%)',
      collapsed: false,
      items: [
        'module-3-storing-data/selecting-storage-systems',
        'module-3-storing-data/data-warehouse-bigquery',
        'module-3-storing-data/data-lake-architectures',
        'module-3-storing-data/modern-data-platform-dataplex',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Analysis & Machine Learning (~15%)',
      collapsed: false,
      items: [
        'module-4-analysis-and-ml/visualization-and-bi',
        'module-4-analysis-and-ml/ai-ml-and-rag',
        'module-4-analysis-and-ml/data-sharing-analytics-hub',
      ],
    },
    {
      type: 'category',
      label: 'Module 5: Operations & Reliability (~18%)',
      collapsed: false,
      items: [
        'module-5-operations-and-reliability/resource-optimization',
        'module-5-operations-and-reliability/automation-and-dag-design',
        'module-5-operations-and-reliability/workload-capacity-management',
        'module-5-operations-and-reliability/monitoring-and-troubleshooting',
        'module-5-operations-and-reliability/disaster-recovery-and-resilience',
      ],
    },
    {
      type: 'category',
      label: 'Exam Prep & Master Toolkit',
      collapsed: false,
      items: [
        'exam-prep/master-cheat-sheet',
        'exam-prep/practice-exam-questions',
      ],
    },
  ],
};

module.exports = sidebars;
