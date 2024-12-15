'use client';

import { Target, Clock, CheckSquare, Building2, Cpu, ClipboardCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Features() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Win More Government Contracts</h1>
          <p className="text-gray-700">
            Stop missing opportunities. Let AI match you with the right contracts and guide you through the bidding process.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg border">
            <Target className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Smart Matching</h3>
            <p className="text-sm text-gray-700">From $25K to $125K+ contracts, we find opportunities that match your business capabilities.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <Clock className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Never Miss Deadlines</h3>
            <p className="text-sm text-gray-700">Track submission windows, Q&A periods, and site visits all in one place.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <CheckSquare className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Compliance Assurance</h3>
            <p className="text-sm text-gray-700">We help you meet all documentation and certification requirements.</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-gray-900">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border">
              <Building2 className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900">1. Profile Your Business</h3>
              <p className="text-sm text-gray-700">Tell us about your capabilities, certifications, and past performance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <Cpu className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900">2. AI-Powered Matching</h3>
              <p className="text-sm text-gray-700">We analyze contracts from SEAO and other sources to find your perfect matches.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <ClipboardCheck className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900">3. Guided Bidding</h3>
              <p className="text-sm text-gray-700">Get step-by-step assistance through the entire proposal process.</p>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-gray-900">We Handle</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-gray-800">Daily opportunity monitoring</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-gray-800">Success probability assessment</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-gray-800">Competition analysis</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-gray-800">Documentation requirements</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-50 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Ready to Transform Your Contract Success?</h2>
          <p className="text-gray-700 mb-6 text-sm">
            Join our waitlist to be among the first to experience the future of government contracting.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-800 transition-colors"
          >
            Join the Waitlist
          </Link>
        </div>
      </div>
    </main>
  );
} 