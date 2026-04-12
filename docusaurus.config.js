const { themes: prismThemes } = require('prism-react-renderer');

const config = {
  title: 'NovaRestore Wiki',
  tagline: 'Official NovaRestore documentation',
  favicon: 'img/logo.png',

  url: 'https://zanthxny.github.io',
  baseUrl: '/NovaStudios/',
  trailingSlash: false,

  organizationName: 'zanthxny',
  projectName: 'NovaStudios',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localeConfigs: {
      es: {
        label: 'ES',
        htmlLang: 'es',
      },
      en: {
        label: 'EN',
        htmlLang: 'en',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/logo.png',
    navbar: {
      title: '',
      logo: {
        alt: '',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentación',
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
          title: 'Docs',
          items: [
            { label: 'Introducción', to: '/' },
            { label: 'Instalación', to: '/instalacion' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} NovaRestore.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

module.exports = config;
