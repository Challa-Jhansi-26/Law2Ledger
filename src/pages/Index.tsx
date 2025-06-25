
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
  details?: string;
  eligibility?: string;
  category: string;
  officialLink?: string;
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
      
      // Enhanced mock data with more Indian schemes and correct URLs
      const mockSuggestions: PolicySuggestion[] = [
        {
          id: '1',
          title: 'Section 80C – Investment Deductions',
          estimatedSavings: 'Save up to ₹46,800',
          description: 'Maximize your tax savings by investing up to ₹1.5 lakh annually in tax-saving instruments.',
          details: 'Invest in PPF, ELSS mutual funds, NSC, life insurance premiums, or home loan principal repayment to claim deductions under Section 80C.',
          eligibility: 'Available to all taxpayers. Maximum deduction of ₹1.5 lakh per financial year.',
          category: 'Investment',
          officialLink: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-preparation-help/deductions-from-gross-total-income/section-80c'
        },
        {
          id: '2',
          title: 'Section 80D – Health Insurance Premium',
          estimatedSavings: 'Save up to ₹15,600',
          description: 'Get tax deductions on health insurance premiums paid for yourself, spouse, children, and parents.',
          details: 'Deduction up to ₹25,000 for self and family, plus ₹25,000 for parents (₹50,000 if parents are senior citizens).',
          eligibility: 'All taxpayers paying health insurance premiums. Additional benefits for senior citizen parents.',
          category: 'Insurance',
          officialLink: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-preparation-help/deductions-from-gross-total-income/section-80d'
        },
        {
          id: '3',
          title: 'HRA Exemption',
          estimatedSavings: 'Save up to ₹50,000',
          description: 'House Rent Allowance exemption based on your monthly rent and salary structure.',
          details: 'Exemption is the minimum of: actual HRA received, 50% of salary (40% for non-metro cities), or actual rent minus 10% of salary.',
          eligibility: 'Salaried employees receiving HRA and staying in rented accommodation.',
          category: 'Allowance',
          officialLink: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-preparation-help/exempt-income/house-rent-allowance-hra'
        },
        {
          id: '4',
          title: 'Section 80CCD(1B) – NPS Additional Deduction',
          estimatedSavings: 'Save up to ₹15,600',
          description: 'Get an additional ₹50,000 deduction over and above Section 80C limit by investing in National Pension System.',
          details: 'This deduction is over and above the ₹1.5 lakh limit under Section 80C, making your total deduction potential ₹2 lakh.',
          eligibility: 'All taxpayers investing in NPS. Separate from Section 80C limit.',
          category: 'Investment',
          officialLink: 'https://www.npscra.nsdl.co.in/nps-benefits.php'
        },
        {
          id: '5',
          title: 'Section 24(b) – Home Loan Interest',
          estimatedSavings: 'Save up to ₹62,400',
          description: 'Claim deduction on home loan interest up to ₹2 lakh per year for self-occupied property.',
          details: 'Interest paid on home loan for self-occupied property is deductible up to ₹2 lakh. No limit for let-out property.',
          eligibility: 'Property owners with home loans. Property should be acquired/constructed with borrowed capital.',
          category: 'Investment',
          officialLink: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-preparation-help/deductions-from-gross-total-income/section-24'
        },
        {
          id: '6',
          title: 'Pradhan Mantri Mudra Yojana',
          estimatedSavings: 'Loans up to ₹10 lakhs',
          description: 'Collateral-free loans for micro and small enterprises to promote entrepreneurship.',
          details: 'Three categories: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 lakhs), Tarun (₹5 lakhs to ₹10 lakhs). No processing fee or penalty on prepayment.',
          eligibility: 'Small businesses, shopkeepers, artisans, and service providers. No collateral required.',
          category: 'Government Scheme',
          officialLink: 'https://www.mudra.org.in/'
        },
        {
          id: '7',
          title: 'Pradhan Mantri Suraksha Bima Yojana',
          estimatedSavings: 'Insurance cover of ₹2 lakhs for ₹20/year',
          description: 'Accidental death and disability insurance scheme offering affordable coverage.',
          details: 'Premium of ₹20 per annum for ₹2 lakh coverage. Auto-renewal option available. Coverage for accidental death and permanent total disability.',
          eligibility: 'Age 18-70 years with active bank account. One person, one premium.',
          category: 'Insurance',
          officialLink: 'https://www.jansuraksha.gov.in/content/pmsby'
        },
        {
          id: '8',
          title: 'Pradhan Mantri Jeevan Jyoti Bima Yojana',
          estimatedSavings: 'Life cover of ₹2 lakhs for ₹436/year',
          description: 'Term life insurance scheme providing life coverage at affordable premium.',
          details: 'Annual renewable term insurance of ₹2 lakh for premium of ₹436 per annum. Death benefit payable to nominee.',
          eligibility: 'Age 18-50 years with bank account and Aadhaar. Coverage till age 55.',
          category: 'Insurance',
          officialLink: 'https://www.jansuraksha.gov.in/content/pmjjby'
        },
        {
          id: '9',
          title: 'Atal Pension Yojana',
          estimatedSavings: 'Guaranteed pension up to ₹5,000/month',
          description: 'Government-backed pension scheme ensuring fixed monthly pension after age 60.',
          details: 'Minimum pension of ₹1,000 to maximum ₹5,000 per month. Government co-contribution for eligible subscribers. Spouse pension and return of corpus available.',
          eligibility: 'Age 18-40 years, not covered under EPF/EPS or NPS. Must have Aadhaar and bank account.',
          category: 'Investment',
          officialLink: 'https://www.npscra.nsdl.co.in/apy.php'
        },
        {
          id: '10',
          title: 'Pradhan Mantri Kisan Samman Nidhi',
          estimatedSavings: 'Direct benefit of ₹6,000/year',
          description: 'Income support scheme providing financial assistance to small and marginal farmers.',
          details: 'Direct cash transfer of ₹6,000 per year in three equal installments of ₹2,000 each. Transferred directly to bank accounts.',
          eligibility: 'Small and marginal farmer families owning cultivable land up to 2 hectares. Land ownership records required.',
          category: 'Government Scheme',
          officialLink: 'https://pmkisan.gov.in/'
        },
        {
          id: '11',
          title: 'Senior Citizens Savings Scheme',
          estimatedSavings: 'Higher interest rates up to 8.2%',
          description: 'Government-backed savings scheme exclusively for senior citizens with attractive interest rates.',
          details: 'Investment limit of ₹30 lakhs with 5-year tenure. Quarterly interest payout option. Tax deduction under Section 80C.',
          eligibility: 'Age 60 years and above. Retired employees can invest from age 55.',
          category: 'Investment',
          officialLink: 'https://www.indiapost.gov.in/VAS/Pages/IndiaPostSavingsSchemes.aspx'
        },
        {
          id: '12',
          title: 'Sukanya Samriddhi Yojana',
          estimatedSavings: 'Tax benefits + up to 8.2% returns',
          description: 'Government savings scheme for girl child education and marriage expenses.',
          details: 'Investment between ₹250 to ₹1.5 lakh per year. 21-year maturity period. Triple tax benefit (EEE). Higher interest rates than PPF.',
          eligibility: 'Girl child below 10 years of age. Maximum two accounts per family.',
          category: 'Investment',
          officialLink: 'https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=88'
        }
      ];

      const mockTaxData: TaxData = {
        currentTaxableIncome: profile.annualIncome,
        potentialSavings: 150000, // Calculated based on profile
        finalTaxableAmount: profile.annualIncome - 150000
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
    // Enhanced export functionality
    if (!userProfile || !taxData || suggestions.length === 0) {
      alert('Please complete your financial profile first to export summary.');
      return;
    }

    try {
      console.log('Exporting summary...');
      
      // Create a detailed summary
      const summary = {
        profile: userProfile,
        taxBreakdown: taxData,
        recommendations: suggestions,
        exportDate: new Date().toLocaleDateString('en-IN'),
        totalPotentialSavings: taxData.potentialSavings
      };

      // In a real implementation, this would call: GET /export-summary
      // For now, we'll create a downloadable text summary
      const summaryText = `
LAW2LEDGER - TAX PLANNING SUMMARY
Generated on: ${summary.exportDate}

FINANCIAL PROFILE:
- Annual Income: ₹${userProfile.annualIncome.toLocaleString('en-IN')}
- Monthly Rent: ₹${userProfile.monthlyRent.toLocaleString('en-IN')}
- Age Group: ${userProfile.ageGroup}
- Employment: ${userProfile.employmentType}

CURRENT INVESTMENTS:
- PPF: ₹${userProfile.investments.ppf.toLocaleString('en-IN')}
- ELSS: ₹${userProfile.investments.elss.toLocaleString('en-IN')}
- NPS: ₹${userProfile.investments.nps.toLocaleString('en-IN')}
- Other: ₹${userProfile.investments.other.toLocaleString('en-IN')}
- Insurance Premiums: ₹${userProfile.insurancePremiums.toLocaleString('en-IN')}

TAX ANALYSIS:
- Current Taxable Income: ₹${taxData.currentTaxableIncome.toLocaleString('en-IN')}
- Potential Tax Savings: ₹${taxData.potentialSavings.toLocaleString('en-IN')}
- Final Taxable Income: ₹${taxData.finalTaxableAmount.toLocaleString('en-IN')}

RECOMMENDED STRATEGIES:
${suggestions.map((suggestion, index) => `
${index + 1}. ${suggestion.title}
   Potential Savings: ${suggestion.estimatedSavings}
   Description: ${suggestion.description}
`).join('')}

Note: This summary is for informational purposes only. Please consult a tax advisor for personalized advice.
      `;

      // Create and download the summary
      const blob = new Blob([summaryText], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Law2Ledger-Tax-Summary-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log('Summary exported successfully');
    } catch (error) {
      console.error('Error exporting summary:', error);
      alert('Failed to export summary. Please try again.');
    }
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
