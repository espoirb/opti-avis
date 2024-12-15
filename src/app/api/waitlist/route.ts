import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Create server-side Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables for server Supabase client');
}

const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    console.log('API Route - Received user data:', userData);

    // Generate a unique ID
    const unique_id = Math.random().toString(36).substring(7);

    const waitlistEntry = {
      unique_id,
      // Required fields
      full_name: userData.fullName,
      job_title: userData.jobTitle,
      email: userData.email,
      phone_number: userData.phoneNumber,
      language: userData.language,
      company_name: userData.companyName,
      business_sector: userData.businessSector,
      has_capacity: userData.hasCapacity === 'yes',
      interested_in_automation: userData.interestedInAutomation === 'yes',
      target_markets: userData.targetMarkets,
      other_markets: userData.otherMarkets || null,
      budget: userData.budget,
      alert_method: userData.alertMethod,
      beta_tester: userData.betaTester === 'yes',
      
      // Optional fields
      company_size: userData.companySize || null,
      annual_revenue: userData.annualRevenue || null,
      gov_experience: userData.govExperience || null,
      contracts_annually: userData.contractsAnnually ? parseInt(userData.contractsAnnually) : null,
      success_rate: userData.successRate ? parseInt(userData.successRate) : null,
      business_goals: userData.businessGoals || []
    };

    console.log('API Route - Attempting to insert:', waitlistEntry);
    console.log('API Route - Using URL:', supabaseUrl);
    console.log('API Route - Service Key exists:', !!supabaseServiceKey);

    const { data, error } = await supabase
      .from('waitlist')
      .insert([waitlistEntry])
      .select()
      .single();

    if (error) {
      console.error('API Route - Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log('API Route - Successfully inserted data:', data);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('API Route - Detailed error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create waitlist entry' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const uniqueId = searchParams.get('uniqueId');

    console.log('API Route - Searching for uniqueId:', uniqueId);

    if (!uniqueId) {
      console.log('API Route - No uniqueId provided');
      return NextResponse.json(
        { error: 'Missing uniqueId parameter' },
        { status: 400 }
      );
    }

    // First, let's check what's in the table
    const { data: allData, error: listError } = await supabase
      .from('waitlist')
      .select('unique_id')
      .limit(5);

    console.log('API Route - First 5 entries in table:', allData);

    if (listError) {
      console.error('API Route - Error listing entries:', listError);
    }

    // Now try to find the specific entry
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .eq('unique_id', uniqueId)
      .single();

    if (error) {
      console.error('API Route - Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      console.log('API Route - No data found for uniqueId:', uniqueId);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('API Route - Found data:', data);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('API Route - Detailed error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to find waitlist entry' },
      { status: 500 }
    );
  }
} 