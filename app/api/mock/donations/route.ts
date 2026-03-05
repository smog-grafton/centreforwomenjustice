import { NextResponse } from 'next/server';
import { mockStore } from '@/lib/mockStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const donation = mockStore.donations.add(body);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return NextResponse.json(donation);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process donation' }, { status: 500 });
  }
}
