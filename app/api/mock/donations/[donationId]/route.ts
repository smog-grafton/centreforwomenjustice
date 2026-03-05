import { NextResponse } from 'next/server';
import { mockStore } from '@/lib/mockStore';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ donationId: string }> }
) {
  const { donationId } = await params;
  const donation = mockStore.donations.get(donationId);
  
  if (!donation) {
    return NextResponse.json({ error: 'Donation not found' }, { status: 404 });
  }
  
  return NextResponse.json(donation);
}
