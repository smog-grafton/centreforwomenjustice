import { NextResponse } from 'next/server';
import { mockStore } from '@/lib/mockStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const application = mockStore.volunteerApplications.add(body);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return NextResponse.json(application);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
