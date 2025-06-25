
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileForm from '@/components/ProfileForm';
import SuggestedPolicies from '@/components/SuggestedPolicies';
import TaxVisual from '@/components/TaxVisual';
import { Button } from '@/components/ui/button';
import { FileText, Calculator } from 'lucide-react';

export interface UserProfile {
  annualIncome: number;
  monthlyRent: number;
  investments: {
    ppf: number;
    elss: number;
    nps: number;
    other: number;
  };
  insurancePremiums: number;
  ageGroup: string;
  employmentType: string;
}

export interface PolicySuggestion {
  id: string;
  title: string;
  estimatedSavings: string;
  description: string;
  category: string;
}

export interface TaxData {
  currentTaxableIncome: number;
  potentialSavings: number;
  finalTaxableAmount: number;
}

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [suggestions, setSuggestions] = useState<PolicySuggestion[]>([]);
  const [taxData, setTaxData] = useState<TaxData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileSubmit = async (profile: UserProfile) => {
    setIsLoading(true);
    setUserProfile(profile);
    
    // Simulate API calls - replace with actual backend calls
    try {
      // POST /profile
      console.log('Submitting profile:', profile);
      
      // Mock data for demonstration
      const mockSuggestions: PolicySuggestion[] = [
        {
          id: '1',
          title: 'Section 80C – Investment Deductions',
          estimatedSavings: 'Save up to ₹46,800',
          description: 'Invest in PPF, ELSS, NSC, or life insurance premiums to claim deductions up to ₹1.5 lakh.',
          category: 'Investment'
        },
        {
          id: '2',
          title: 'Section 80D – Health Insurance Premium',
          estimatedSavings: 'Save up to ₹15,600',
          description: 'Claim deductions for health insurance premiums paid for yourself and family members.',
          category: 'Insurance'
        },
        {
          id: '3',
          title: 'HRA Exemption',
          estimatedSavings: 'Save up to ₹50,000',
          description: 'House Rent Allowance exemption based on your monthly rent and salary structure.',
          category: 'Allowance'
        }
      ];

      const mockTaxData: TaxData = {
        currentTaxableIncome: profile.annualIncome,
        potentialSavings: 112400,
        finalTaxableAmount: profile.annualIncome - 112400
      };

      setSuggestions(mockSuggestions);
      setTaxData(mockTaxData);
      setActiveTab('suggestions');
    } catch (error) {
      console.error('Error submitting profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportSummary = async () => {
    // Simulate export API call
    console.log('Exporting summary...');
    // In real implementation: GET /export-summary
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            Law2Ledger
          </h1>
          <p className="text-lg text-gray-600">
            Smart Tax Planning & Policy Suggestions Dashboard
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg p-1 shadow-sm border">
            {[
              { id: 'profile', label: 'Financial Profile', icon: Calculator },
              { id: 'suggestions', label: 'Suggestions', icon: FileText },
              { id: 'visual', label: 'Tax Breakdown', icon: FileText }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  disabled={tab.id !== 'profile' && !userProfile}
                >
                  <IconComponent className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Financial Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileForm onSubmit={handleProfileSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>
          )}

          {activeTab === 'suggestions' && userProfile && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Recommended Policies & Schemes</h2>
                <Button onClick={handleExportSummary} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Summary
                </Button>
              </div>
              <SuggestedPolicies suggestions={suggestions} />
            </div>
          )}

          {activeTab === 'visual' && taxData && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Tax Breakdown Analysis</h2>
              <TaxVisual data={taxData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
