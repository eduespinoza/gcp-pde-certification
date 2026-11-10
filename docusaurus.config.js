// @ts-check
const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Google Cloud Professional Data Engineer Study Guide',
  tagline: 'Comprehensive Curriculum, Deep Architectures, Practice Questions & Exam Blueprints',
  favicon: 'img/favicon.ico',

  url: 'https://eduespinoza.github.io',
  baseUrl: '/gcp-pde-certification',
  organizationName: 'eduespinoza',
  projectName: 'gcp-pde-certification',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  clientModules: [
    require.resolve('./src/clientModules/mermaidFix.js'),
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      es: {
        label: 'Español',
        htmlLang: 'es-ES',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'GCP Data Engineer Guide',
        logo: {
          alt: 'Google Cloud Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Study Curriculum',
          },
          {
            to: '/docs/exam-prep/master-cheat-sheet',
            label: 'Cheat Sheet',
            position: 'left',
          },
          {
            to: '/docs/exam-prep/practice-exam-questions',
            label: 'Practice Questions',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Curriculum',
            items: [
              {
                label: 'Section 1: Designing Data Systems',
                to: '/docs/module-1-designing-systems/security-and-compliance',
              },
              {
                label: 'Section 2: Ingesting & Processing',
                to: '/docs/module-2-ingesting-processing/planning-data-pipelines',
              },
              {
                label: 'Section 3: Storing Data',
                to: '/docs/module-3-storing-data/selecting-storage-systems',
              },
            ],
          },
          {
            title: 'Advanced & Ops',
            items: [
              {
                label: 'Section 4: Analysis, BI & ML',
                to: '/docs/module-4-analysis-and-ml/visualization-and-bi',
              },
              {
                label: 'Section 5: Maintaining & Automating',
                to: '/docs/module-5-operations-and-reliability/resource-optimization',
              },
              {
                label: 'Master Cheat Sheet',
                to: '/docs/exam-prep/master-cheat-sheet',
              },
            ],
          },
          {
            title: 'Certification',
            items: [
              {
                label: 'Official Exam Guide',
                href: 'https://cloud.google.com/certification/data-engineer',
              },
              {
                label: 'Practice Exam Questions',
                to: '/docs/exam-prep/practice-exam-questions',
              },
            ],
          },
        ],
        copyright: `Google Cloud Professional Data Engineer Study Platform. Built for Certification Candidates.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'python', 'sql', 'json', 'yaml'],
      },
    }),
};

module.exports = config;
