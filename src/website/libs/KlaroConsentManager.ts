
const KlaroConfig = {
    version: 1,

    elementID: 'klaro',

    styling: {
        theme: ['light', 'top', 'wide'],
    },
    noAutoLoad: false,
    htmlTexts: true,
    embedded: false,
    groupByPurpose: true,
    storageMethod: 'cookie',
    cookieName: 'consent_decision',
    cookieExpiresAfterDays: 365,
    default: true,
    mustConsent: true,
    acceptAll: true,
    hideDeclineAll: false,
    hideLearnMore: false,
    noticeAsModal: false,

    translations: {
        en: {
            privacyPolicyUrl: '/privacy-policy',
            service: {
                purpose: 'Purpose',
                purposes: 'Purposes'
            },
            consentModal: {
                title: 'Privacy Settings',
                description:
                    'This website store and access cookies on your device - these cookies helps the maintainer understand on how to improve the user experience of the website and its service. <br/><br/>You can change or revoke this at any time in the privacy settings.',
            },

            googleAnalytics: {
                description: 'Example of an inline tracking script',
                title: 'Google Analytics Tracking',
            },
            // adsense: {
            //     description: 'Displaying of advertisements',
            //     title: 'Google Adsense Advertisement',
            // },
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                advertising: 'Advertising',
                styling: 'Styling',
            },
        },
    },

    // This is a list of third-party services that Klaro will manage for you.
    services: [
        {
            name: 'google-analytics',
            title: 'Google Analytics',
            default: true,
            purposes: ['analytics'],

            cookies: [
                /^_ga(_.*)?/,
            ],
            required: false,
            optOut: false,
            onlyOnce: true,
        },
        // {
        //     name: 'google-adsense',
        //     title: 'Google AdSense',
        //     purposes: ['advertising'],
        // },
    ],
};


export default KlaroConfig