'use client';

import { motion } from 'framer-motion';
import { Bell, Copy } from 'lucide-react';
import { useState } from 'react';

interface NotificationsPanelProps {
  userId?: string;
}

export function NotificationsPanel({ userId }: NotificationsPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = async () => {
    if (userId) {
      await navigator.clipboard.writeText(userId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto"
    >
      {/* Notifications Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-500">Notifications</h2>
        <Bell className="w-4 h-4 text-gray-400" />
      </div>

      {/* Content */}
      <div className="space-y-6">
        {userId && (
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl transition-all duration-200 hover:shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Your OPTI-AVIS ID</span>
              <button
                onClick={handleCopyId}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm transition-colors"
              >
                <Copy className="w-4 h-4 mr-1" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <code className="block w-full p-3 bg-white rounded-lg border border-blue-200 text-sm font-mono">
              {userId}
            </code>
            <p className="mt-2 text-xs text-gray-500">
              Save this ID to access your notifications and updates later.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-blue-50 border border-blue-100 rounded-xl transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 flex items-center">
                  Registration Confirmed 👋
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    New
                  </span>
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  You'll be among the first to know when we launch.
                </p>
                <span className="mt-2 text-xs text-gray-500 block">Just now</span>
              </div>
            </div>
          </motion.div>

          <div>
            <h3 className="text-xs font-medium uppercase text-gray-500 mb-3">Next Steps</h3>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gray-50 border border-gray-100 rounded-xl transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      We'll review your application
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      You'll receive updates about your position on the waitlist
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      We'll notify you when early access becomes available
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600 text-center">
          Keep an eye on your email for important updates and when new features become available.
        </p>
      </div>
    </motion.div>
  );
} 