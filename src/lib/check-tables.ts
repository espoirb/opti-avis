import { supabase } from './supabase';
import type { PostgrestError } from '@supabase/supabase-js';

// Types matching our database schema
interface WaitlistUser {
  id: string;
  created_at: string;
  unique_id: string;
  
  // Required fields
  full_name: string;
  job_title: string;
  email: string;
  phone_number: string;
  language: string;
  company_name: string;
  business_sector: string;
  has_capacity: boolean;
  interested_in_automation: boolean;
  target_markets: string[];
  other_markets?: string;
  budget: string;
  alert_method: string;
  beta_tester: boolean;
  
  // Optional fields
  company_size?: string;
  annual_revenue?: string;
  gov_experience?: string;
  contracts_annually?: number;
  success_rate?: number;
  business_goals?: string[];
}

interface CreateWaitlistResponse {
  data: WaitlistUser[] | null;
  error: Error | null;
}

export async function checkDatabaseTables() {
  console.log('🔍 Checking database tables and permissions...\n');

  try {
    // Test 1: Check if we can access the waitlist table
    console.log('Testing table access...');
    const { data: waitlistData, error: waitlistError } = await supabase
      .from('waitlist')
      .select('*')
      .limit(1);

    if (waitlistError) {
      console.error('❌ Error accessing waitlist table:', waitlistError.message);
      return;
    }

    console.log('✅ Waitlist table exists and is accessible');
    
    // Test 2: Try inserting a test record
    console.log('\nTesting insert permissions...');
    const testEntry = {
      unique_id: 'test-' + Math.random().toString(36).substring(7),
      full_name: 'Test User',
      job_title: 'Test Role',
      email: 'test@example.com',
      phone_number: '1234567890',
      language: 'english',
      company_name: 'Test Company',
      business_sector: 'Test Sector',
      has_capacity: true,
      interested_in_automation: true,
      target_markets: ['test'],
      budget: '50-200',
      alert_method: 'email',
      beta_tester: true
    };

    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testEntry),
    });

    if (!response.ok) {
      console.error('❌ Insert permission test failed');
      return;
    }

    console.log('✅ Insert permissions verified');
      
    // Test 3: Try selecting the test record
    console.log('\nTesting select permissions...');
    const getResponse = await fetch(`/api/waitlist?uniqueId=${testEntry.unique_id}`);

    if (!getResponse.ok) {
      console.error('❌ Select permission test failed');
    } else {
      console.log('✅ Select permissions verified');
    }

    // Clean up test entry
    console.log('\nCleaning up test data...');
    const deleteResponse = await fetch(`/api/waitlist?uniqueId=${testEntry.unique_id}`, {
      method: 'DELETE',
    });

    if (!deleteResponse.ok) {
      console.error('❌ Cleanup failed');
    } else {
      console.log('✅ Test data cleaned up successfully');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

export const createWaitlistUser = async (userData: any): Promise<CreateWaitlistResponse> => {
  try {
    console.log('Client - Sending data to API:', userData);
    
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    console.log('Client - Response status:', response.status);
    const responseData = await response.json();
    console.log('Client - Response data:', responseData);

    if (!response.ok) {
      throw new Error(responseData.error || 'Failed to create waitlist entry');
    }

    const { data, error } = responseData;

    if (error) {
      return { data: null, error: new Error(error) };
    }

    return { data: [data], error: null };
  } catch (error) {
    console.error('Client - Error creating waitlist user:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('An unexpected error occurred') 
    };
  }
}; 

export async function findWaitlistUser(uniqueId: string): Promise<CreateWaitlistResponse> {
  try {
    console.log('Client - Searching for user with ID:', uniqueId);
    
    const response = await fetch(`/api/waitlist?uniqueId=${uniqueId}`);
    console.log('Client - Search response status:', response.status);
    
    const responseData = await response.json();
    console.log('Client - Search response data:', responseData);

    if (!response.ok) {
      throw new Error(responseData.error || 'Failed to find waitlist entry');
    }

    const { data, error } = responseData;

    if (error) {
      return { data: null, error: new Error(error) };
    }

    if (!data) {
      return { data: null, error: new Error('User not found') };
    }

    return { data: [data], error: null };
  } catch (error) {
    console.error('Client - Error searching for user:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('An unexpected error occurred') 
    };
  }
}