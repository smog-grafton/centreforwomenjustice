import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export interface DonatePageHero {
  pill_text: string | null;
  title: string | null;
  highlight_text: string | null;
  body: string | null;
  primary_cta_label: string | null;
  primary_cta_url: string | null;
  secondary_cta_label: string | null;
  secondary_cta_url: string | null;
  background_image_url: string | null;
  foreground_image_url: string | null;
}

export interface DonatePageTransparency {
  title: string | null;
  body: string | null;
  /** API may return array or comma-separated string */
  bullets: string[] | string;
  cta_label: string | null;
  cta_url: string | null;
  image_url: string | null;
}

export interface DonatePageOtherWays {
  title: string | null;
  subtitle: string | null;
}

export interface PaymentGatewayApi {
  id: number;
  name: string;
  code: string | null;
  type: string;
  description: string | null;
  url: string | null;
  sort_order: number;
}

export interface DonatePageData {
  hero: DonatePageHero | null;
  transparency: DonatePageTransparency | null;
  other_ways: DonatePageOtherWays | null;
  payment_gateways: PaymentGatewayApi[];
}

export interface CampaignApi {
  id: number;
  slug: string;
  title: string;
  short_description: string | null;
  full_description: string | null;
  goal_amount: number;
  raised_amount: number;
  currency: string;
  cover_image: string | null;
  cover_image_url: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string;
  impact_bullets: string[];
  is_featured: boolean;
}

export interface DonationPayload {
  campaign_slug?: string | null;
  amount: number;
  currency?: string;
  frequency?: 'one-time' | 'monthly';
  donor_name?: string | null;
  donor_email: string;
  donor_phone?: string | null;
  is_anonymous?: boolean;
  payment_gateway_id?: number | null;
}

export interface DonationResponse {
  id: number;
  receipt_number: string;
  amount: number;
  currency: string;
  status: string;
}

export interface DonationReceiptApi {
  id: number;
  receipt_number: string;
  amount: number;
  currency: string;
  frequency: string;
  donor_name: string | null;
  donor_email: string;
  is_anonymous: boolean;
  status: string;
  created_at: string;
  paid_at: string | null;
  campaign: { id: number; slug: string; title: string } | null;
  payment_gateway: { id: number; name: string; type: string } | null;
}

export async function fetchDonatePage(): Promise<DonatePageData | null> {
  const res = await fetch(`${API_URL}/api/v1/donate/page`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchCampaigns(): Promise<CampaignApi[]> {
  const res = await fetch(`${API_URL}/api/v1/campaigns`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchCampaignBySlug(slug: string): Promise<CampaignApi | null> {
  const res = await fetch(`${API_URL}/api/v1/campaigns/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function submitDonation(payload: DonationPayload): Promise<DonationResponse> {
  const res = await fetch(`${API_URL}/api/v1/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? 'Failed to process donation');
  }
  return res.json();
}

export async function fetchDonation(id: string): Promise<DonationReceiptApi | null> {
  const res = await fetch(`${API_URL}/api/v1/donations/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}
