'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface IdSearchFormProps {
  onSearch: (id: string) => void;
  isSearching: boolean;
}

export function IdSearchForm({ onSearch, isSearching }: IdSearchFormProps) {
  const [id, setId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id.trim()) {
      onSearch(id.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg h-[calc(100vh-12rem)] flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Check Application Status</h2>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label htmlFor="opti-avis-id" className="block text-sm font-medium text-gray-700 mb-1">
              OPTI-AVIS ID
            </label>
            <div className="relative">
              <input
                id="opti-avis-id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter your OPTI-AVIS ID"
                className="w-full p-3 pr-10 border rounded-lg bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required
              />
              <button
                type="submit"
                disabled={isSearching || !id.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Enter your ID to view your application status and notifications
            </p>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <p className="text-sm text-gray-600 text-center">
          Can't find your ID? Check your email for the confirmation message.
        </p>
      </div>
    </motion.div>
  );
} 