import { themes as prismThemes } from 'prism-react-renderer';

const config = {
  title: 'NovaRestore Wiki',
  tagline: 'Documentación oficial de NovaRestore',
  favicon: 'img/logo.png',

  future: {
    v4: true,
  },

  url: 'https://zanthxny.github.io',
  baseUrl: '/NovaStudios/',
  trailingSlash: false,

  organizationName: 'zanthxny',
  projectName: 'NovaStudios',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/logo.png',
    navbar: {
      title: 'NovaRestore',
      logo: {
        alt: 'NovaRestore Logo',
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
          href: 'https://github.com/zanthxny/NovaStudios',
          label: 'GitHub',
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
            {
              label: 'Introducción',
              to: '/intro',
            },
            {
              label: 'Instalación',
              to: '/instalacion',
            },
          ],
        },
        {
          title: 'Comunidad',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/zanthxny/NovaStudios',
            },
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

export default config;
