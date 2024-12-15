'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WaitlistFormProps {
  onSubmit: (formData: any) => void;
  isSubmitting: boolean;
}

const formSteps = [
  {
    title: 'Primary Contact',
    fields: ['fullName', 'jobTitle', 'email', 'phoneNumber']
  },
  {
    title: 'Company Info',
    fields: ['companyName', 'businessSector', 'language']
  },
  {
    title: 'Key Qualification',
    fields: ['hasCapacity', 'interestedInAutomation', 'targetMarkets', 'otherMarkets']
  },
  {
    title: 'Solution Interest',
    fields: ['budget', 'alertMethod']
  },
  {
    title: 'Beta Testing',
    fields: ['betaTester']
  },
  {
    title: 'Company Profile',
    subtitle: '(Optional)',
    fields: ['companySize', 'annualRevenue']
  },
  {
    title: 'Experience',
    subtitle: '(Optional)',
    fields: ['govExperience', 'contractsAnnually', 'successRate']
  },
  {
    title: 'Goals',
    subtitle: '(Optional)',
    fields: ['businessGoals']
  }
];

const inputBaseClass = "w-full p-3.5 border rounded-xl bg-white text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm hover:border-gray-300";
const selectBaseClass = "w-full p-3.5 border rounded-xl bg-white text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm hover:border-gray-300";
const labelBaseClass = "block text-sm font-medium text-gray-700 mb-1.5";

export function WaitlistForm({ onSubmit, isSubmitting }: WaitlistFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Required fields
    fullName: '',
    jobTitle: '',
    email: '',
    phoneNumber: '',
    language: '',
    companyName: '',
    businessSector: '',
    hasCapacity: '',
    interestedInAutomation: '',
    targetMarkets: [] as string[],
    otherMarkets: '',
    budget: '',
    alertMethod: '',
    betaTester: '',

    // Optional fields
    companySize: '',
    annualRevenue: '',
    govExperience: '',
    contractsAnnually: '',
    successRate: '',
    businessGoals: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else if (name === 'targetMarkets' || name === 'businessGoals') {
      const select = e.target as HTMLSelectElement;
      const values = Array.from(select.selectedOptions, option => option.value);
      setFormData(prev => ({
        ...prev,
        [name]: values
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const isStepValid = () => {
    const currentFields = formSteps[currentStep].fields;
    return currentFields.every(field => {
      // Optional fields in steps 6, 7, and 8
      if (currentStep >= 5) {
        return true;
      }
      if (field === 'otherMarkets') {
        return !formData.targetMarkets.includes('other') || formData.otherMarkets;
      }
      if (Array.isArray(formData[field as keyof typeof formData])) {
        return (formData[field as keyof typeof formData] as any[]).length > 0;
      }
      return formData[field as keyof typeof formData];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === formSteps.length - 1) {
      onSubmit(formData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const renderField = (fieldName: string) => {
    switch (fieldName) {
      case 'fullName':
        return (
          <div>
            <label htmlFor="fullName" className={labelBaseClass}>Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className={inputBaseClass}
              required
            />
          </div>
        );
      case 'jobTitle':
        return (
          <div>
            <label htmlFor="jobTitle" className={labelBaseClass}>Job Title</label>
            <input
              id="jobTitle"
              type="text"
              name="jobTitle"
              placeholder="Enter your job title"
              value={formData.jobTitle}
              onChange={handleChange}
              className={inputBaseClass}
              required
            />
          </div>
        );
      case 'email':
        return (
          <div>
            <label htmlFor="email" className={labelBaseClass}>Professional Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your@company.com"
              value={formData.email}
              onChange={handleChange}
              className={inputBaseClass}
              required
            />
          </div>
        );
      case 'phoneNumber':
        return (
          <div>
            <label htmlFor="phoneNumber" className={labelBaseClass}>Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder="e.g., (123) 456-7890"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={inputBaseClass}
              required
              pattern="[0-9\s\(\)\-\+]+"
              title="Please enter a valid phone number"
            />
          </div>
        );
      case 'language':
        return (
          <div>
            <label htmlFor="language" className={labelBaseClass}>Preferred Language</label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className={selectBaseClass}
              required
            >
              <option value="">Select language</option>
              <option value="english">English</option>
              <option value="french">French</option>
              <option value="both">Both English & French</option>
            </select>
          </div>
        );
      case 'companyName':
        return (
          <div>
            <label htmlFor="companyName" className={labelBaseClass}>Company Name</label>
            <input
              id="companyName"
              type="text"
              name="companyName"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
              className={inputBaseClass}
              required
            />
          </div>
        );
      case 'businessSector':
        return (
          <div>
            <label htmlFor="businessSector" className={labelBaseClass}>Business Sector</label>
            <input
              id="businessSector"
              type="text"
              name="businessSector"
              placeholder="e.g., Technology, Construction, Healthcare"
              value={formData.businessSector}
              onChange={handleChange}
              className={inputBaseClass}
              required
            />
          </div>
        );
      case 'hasCapacity':
        return (
          <div>
            <label htmlFor="hasCapacity" className={labelBaseClass}>Do you have additional capacity to take on new contracts?</label>
            <select
              id="hasCapacity"
              name="hasCapacity"
              value={formData.hasCapacity}
              onChange={handleChange}
              className={selectBaseClass}
              required
            >
              <option value="">Select answer</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        );
      case 'interestedInAutomation':
        return (
          <div>
            <label htmlFor="interestedInAutomation" className={labelBaseClass}>
              Would you be interested in an automated system that alerts you about relevant tenders and assists with proposal writing?
            </label>
            <select
              id="interestedInAutomation"
              name="interestedInAutomation"
              value={formData.interestedInAutomation}
              onChange={handleChange}
              className={selectBaseClass}
              required
            >
              <option value="">Select answer</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        );
      case 'targetMarkets':
        return (
          <div>
            <label htmlFor="targetMarkets" className={labelBaseClass}>Which government markets interest you?</label>
            <select
              id="targetMarkets"
              name="targetMarkets"
              multiple
              value={formData.targetMarkets}
              onChange={handleChange}
              className={`${selectBaseClass} h-32`}
              required
            >
              <option value="provincial-qc">Provincial - Quebec</option>
              <option value="federal">Federal</option>
              <option value="municipal">Municipal</option>
              <option value="other">Other</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
          </div>
        );
      case 'otherMarkets':
        return formData.targetMarkets.includes('other') ? (
          <div>
            <label htmlFor="otherMarkets" className={labelBaseClass}>Please specify other markets</label>
            <input
              id="otherMarkets"
              type="text"
              name="otherMarkets"
              placeholder="Enter other markets"
              value={formData.otherMarkets}
              onChange={handleChange}
              className={inputBaseClass}
              required
            />
          </div>
        ) : null;
      case 'budget':
        return (
          <div>
            <label htmlFor="budget" className={labelBaseClass}>Monthly budget range</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={selectBaseClass}
              required
            >
              <option value="">Select budget range</option>
              <option value="50-200">$50-200</option>
              <option value="200-500">$200-500</option>
              <option value="500+">$500+</option>
            </select>
          </div>
        );
      case 'alertMethod':
        return (
          <div>
            <label htmlFor="alertMethod" className={labelBaseClass}>Preferred notification method</label>
            <select
              id="alertMethod"
              name="alertMethod"
              value={formData.alertMethod}
              onChange={handleChange}
              className={selectBaseClass}
              required
            >
              <option value="">Select notification method</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="both">Both</option>
            </select>
          </div>
        );
      case 'betaTester':
        return (
          <div>
            <label htmlFor="betaTester" className={labelBaseClass}>Interested in being a beta tester?</label>
            <select
              id="betaTester"
              name="betaTester"
              value={formData.betaTester}
              onChange={handleChange}
              className={selectBaseClass}
              required
            >
              <option value="">Select answer</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        );
      // Optional fields below
      case 'companySize':
        return (
          <div>
            <label htmlFor="companySize" className={`${labelBaseClass} text-gray-500`}>Company Size (Optional)</label>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className={selectBaseClass}
            >
              <option value="">Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
          </div>
        );
      case 'annualRevenue':
        return (
          <div>
            <label htmlFor="annualRevenue" className={`${labelBaseClass} text-gray-500`}>Annual Revenue (Optional)</label>
            <select
              id="annualRevenue"
              name="annualRevenue"
              value={formData.annualRevenue}
              onChange={handleChange}
              className={selectBaseClass}
            >
              <option value="">Select revenue range</option>
              <option value="<1M">Less than $1M</option>
              <option value="1M-5M">$1M - $5M</option>
              <option value="5M-20M">$5M - $20M</option>
              <option value="20M-50M">$20M - $50M</option>
              <option value="50M+">$50M+</option>
            </select>
          </div>
        );
      case 'govExperience':
        return (
          <div>
            <label htmlFor="govExperience" className={`${labelBaseClass} text-gray-500`}>Government Contract Experience (Optional)</label>
            <select
              id="govExperience"
              name="govExperience"
              value={formData.govExperience}
              onChange={handleChange}
              className={selectBaseClass}
            >
              <option value="">Select experience level</option>
              <option value="never">Never</option>
              <option value="provincial">Provincial level only</option>
              <option value="federal">Federal level only</option>
              <option value="both">Both provincial and federal</option>
            </select>
          </div>
        );
      case 'contractsAnnually':
        return (
          <div>
            <label htmlFor="contractsAnnually" className={`${labelBaseClass} text-gray-500`}>Number of contracts pursued annually (Optional)</label>
            <input
              id="contractsAnnually"
              type="number"
              name="contractsAnnually"
              placeholder="Enter number of contracts"
              value={formData.contractsAnnually}
              onChange={handleChange}
              className={inputBaseClass}
              min="0"
            />
          </div>
        );
      case 'successRate':
        return (
          <div>
            <label htmlFor="successRate" className={`${labelBaseClass} text-gray-500`}>Current success rate (Optional)</label>
            <input
              id="successRate"
              type="number"
              name="successRate"
              placeholder="Enter success rate (%)"
              value={formData.successRate}
              onChange={handleChange}
              className={inputBaseClass}
              min="0"
              max="100"
            />
          </div>
        );
      case 'businessGoals':
        return (
          <div>
            <label htmlFor="businessGoals" className={`${labelBaseClass} text-gray-500`}>What are your primary objectives? (Optional)</label>
            <select
              id="businessGoals"
              name="businessGoals"
              multiple
              value={formData.businessGoals}
              onChange={handleChange}
              className={`${selectBaseClass} h-32`}
            >
              <option value="increase">Increase number of government contracts</option>
              <option value="improve">Improve bid success rate</option>
              <option value="reduce">Reduce proposal preparation time</option>
              <option value="explore">Explore new government opportunities</option>
              <option value="other">Other</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
          </div>
        );
      default:
        return null;
    }
  };

  const content = (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-medium text-gray-900">{formSteps[currentStep].title}</h2>
            {formSteps[currentStep].subtitle && (
              <p className="text-sm text-gray-500 mt-0.5">{formSteps[currentStep].subtitle}</p>
            )}
          </div>
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {formSteps.length}
          </span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="relative min-h-[400px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20, position: "absolute", width: "100%" }}
              animate={{ opacity: 1, x: 0, position: "relative" }}
              exit={{ opacity: 0, x: -20, position: "absolute" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-5"
            >
              {formSteps[currentStep].fields.map(fieldName => (
                <motion.div 
                  key={fieldName} 
                  className="transition-all duration-200 hover:translate-y-[-2px]"
                  layout
                >
                  {renderField(fieldName)}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </form>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t border-gray-100 mt-6">
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
        ) : (
          <div></div>
        )}
        <button
          onClick={() => {
            const form = document.querySelector('form');
            if (form) form.requestSubmit();
          }}
          disabled={!isStepValid() || isSubmitting}
          className={`flex items-center px-6 py-2 rounded-lg transition-all duration-200 ${
            currentStep === formSteps.length - 1
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              : 'bg-gray-800 text-white hover:bg-gray-900 shadow-md hover:shadow-lg'
          } disabled:opacity-50 disabled:shadow-none`}
        >
          {isSubmitting ? (
            'Submitting...'
          ) : currentStep === formSteps.length - 1 ? (
            'Submit'
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );

  return content;
}
