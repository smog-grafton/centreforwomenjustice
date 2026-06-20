export interface ExternalDonationLink {
  id: string;
  providerName: string;
  url: string;
  description: string;
  badgeLabel?: string;
  isFeatured: boolean;
}

export interface SiteSettings {
  donationExternalLinks: ExternalDonationLink[];
  currencyDefaults: {
    code: string;
    symbol: string;
  };
  receiptFooterText: string;
  contactEmail: string;
  supportPhone: string;
}

export const siteSettings: SiteSettings = {
  donationExternalLinks: [
    {
      id: 'ext-1',
      providerName: 'GoFundMe',
      url: 'https://www.gofundme.com/f/CWJU-legal-aid',
      description: 'Support our emergency legal aid fund via GoFundMe.',
      badgeLabel: 'Popular',
      isFeatured: true
    },
    {
      id: 'ext-2',
      providerName: 'GlobalGiving',
      url: 'https://www.globalgiving.org/projects/justice-for-ugandan-women/',
      description: 'Donate through GlobalGiving for tax-deductible contributions in the US/UK.',
      isFeatured: false
    },
    {
      id: 'ext-3',
      providerName: 'PayPal',
      url: 'https://paypal.me/CWJU',
      description: 'Quick and easy donations via PayPal.',
      isFeatured: false
    }
  ],
  currencyDefaults: {
    code: 'USD',
    symbol: '$'
  },
  receiptFooterText: 'Thank you for your generous support. Your contribution helps us promote justice and equality for women in Uganda. CWJU is a registered non-profit organization.',
  contactEmail: 'donations@CWJU.org',
  supportPhone: '+256 414 123 456'
};
