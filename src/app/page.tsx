'use client';

import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import { NotificationsPanel } from '@/components/waitlist/NotificationsPanel';
import { useState, useEffect } from 'react';
import { createWaitlistUser, checkDatabaseTables, findWaitlistUser } from '@/lib/check-tables';
import { Info, Sparkles, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Clock, CheckSquare, Building2, Cpu, ClipboardCheck } from 'lucide-react';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [userId, setUserId] = useState<string>();
  const [showSearchField, setShowSearchField] = useState(false);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    // Verify database setup
    checkDatabaseTables();
  }, []);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await createWaitlistUser(formData);
      
      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      if (!data || !data[0]) {
        throw new Error('No data returned from server');
      }

      setUserId(data[0].unique_id);
      setShowNotifications(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      let errorMessage = 'Failed to submit form. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    
    setIsSearching(true);
    try {
      const { data, error } = await findWaitlistUser(searchId.trim());
      
      if (error) {
        throw error;
      }

      if (!data || !data[0]) {
        throw new Error('User not found');
      }

      setUserId(data[0].unique_id);
      setShowNotifications(true);
      setShowSearchField(false);
      setSearchId('');
    } catch (error) {
      console.error('Error searching:', error);
      let errorMessage = 'User not found. Please check your ID and try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="h-screen flex flex-col bg-white relative overflow-hidden">
      {/* Info Icon */}
      <button 
        onClick={() => setShowInfo(!showInfo)}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        aria-label="Show information"
      >
        <Info className="w-5 h-5 text-gray-600" />
      </button>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowInfo(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-lg mx-auto shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-black">About OPTI-AVIS</h2>
                <button 
                  onClick={() => setShowInfo(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 text-sm">
                <p className="text-gray-700">
                  OPTI-AVIS helps you win more government contracts by matching you with the right opportunities and guiding you through the bidding process.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-black">Smart Matching</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-black">Deadline Tracking</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-black">Compliance Check</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-black">Business Profile</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setShowInfo(false);
                      window.location.href = '/features';
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Learn more about our features →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <div className="pt-4 pb-2">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">OPTI-AVIS</h1>
            {!showNotifications ? (
              <>
                <p className="text-sm text-gray-700 mt-1">Join the waitlist for early access</p>
                <AnimatePresence mode="wait">
                  {showSearchField ? (
                    <motion.form 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 flex items-center justify-center gap-2"
                      onSubmit={handleSearch}
                    >
                      <div className="relative">
                        <input
                          type="text"
                          value={searchId}
                          onChange={(e) => setSearchId(e.target.value)}
                          placeholder="Enter your OPTI-AVIS ID"
                          className="w-64 px-3 py-1.5 pr-8 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          disabled={isSearching}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setShowSearchField(false);
                            setSearchId('');
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        type="submit"
                        disabled={isSearching || !searchId.trim()}
                        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                      >
                        {isSearching ? 'Searching...' : 'Check Status'}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onClick={() => setShowSearchField(true)}
                      className="mt-2 text-sm text-blue-700 hover:text-blue-800"
                    >
                      Already have an ID? Check your status
                    </motion.button>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="flex items-center justify-center gap-2 mt-1">
                <p className="text-gray-900 font-medium text-sm">Welcome to OPTI-AVIS!</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Early Access
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 flex items-center justify-center px-4 min-h-0">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {!showNotifications ? (
                <WaitlistForm key="form" onSubmit={handleSubmit} isSubmitting={isSubmitting} />
              ) : (
                <NotificationsPanel key="notifications" userId={userId} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
