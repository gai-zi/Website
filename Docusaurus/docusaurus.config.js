const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
    title: 'Blog & Document',
    tagline: 'gai-zi',
    url: 'https://gai-zi.github.io',
    baseUrl: '/Website/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'gai-zi', // Usually your GitHub org/user name.
    projectName: 'Website', // Usually your repo name.

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/gai-zi/Website/blob/main/Docusaurus/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl: 'https://github.com/gai-zi/Website/blob/main/Docusaurus/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
        navbar: {
            title: 'Gaizi',
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.svg',
            },
            items: [{
                    type: 'doc',
                    docId: 'intro',
                    position: 'left',
                    label: 'Tutorial',
                },
                { to: '/blog', label: 'Blog', position: 'left' },
                {
                    href: 'https://github.com/gai-zi',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [{
                    title: 'Docs',
                    items: [{
                        label: 'Docs',
                        href: 'https://www.docusaurus.io/zh-CN/',
                    }, ],
                },
                {
                    title: 'Community',
                    items: [{
                            label: 'Stack Overflow',
                            href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                        },
                        {
                            label: 'Discord',
                            href: 'https://discordapp.com/invite/docusaurus',
                        },
                        {
                            label: 'Twitter',
                            href: 'https://twitter.com/docusaurus',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [{
                            label: 'Blog',
                            to: '/blog',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/gai-zi',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme,
        },
    }),
});