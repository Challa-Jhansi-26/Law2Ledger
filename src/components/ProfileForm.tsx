
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { UserProfile } from '@/pages/Index';
import { Info } from 'lucide-react';

const profileSchema = z.object({
  annualIncome: z.number().min(0, 'Annual income must be positive'),
  monthlyRent: z.number().min(0, 'Monthly rent must be positive'),
  investments: z.object({
    ppf: z.number().min(0),
    elss: z.number().min(0),
    nps: z.number().min(0),
    other: z.number().min(0),
  }),
  insurancePremiums: z.number().min(0),
  ageGroup: z.string().min(1, 'Please select an age group'),
  employmentType: z.string().min(1, 'Please select employment type'),
});

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      annualIncome: 0,
      monthlyRent: 0,
      investments: {
        ppf: 0,
        elss: 0,
        nps: 0,
        other: 0,
      },
      insurancePremiums: 0,
      ageGroup: '',
      employmentType: '',
    },
  });

  const watchedAgeGroup = watch('ageGroup');
  const watchedEmploymentType = watch('employmentType');

  const InvestmentTooltip = ({ title, description }: { title: string; description: string }) => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button type="button" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800">
          <span>{title}</span>
          <Info className="h-3 w-3" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  {...register('annualIncome', { valueAsNumber: true })}
                  placeholder="e.g., 1200000"
                />
                <p className="text-xs text-gray-500 mt-1">Your total yearly income before taxes</p>
                {errors.annualIncome && (
                  <p className="text-sm text-red-600 mt-1">{errors.annualIncome.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="monthlyRent">Monthly Rent (₹)</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  {...register('monthlyRent', { valueAsNumber: true })}
                  placeholder="e.g., 25000"
                />
                <p className="text-xs text-gray-500 mt-1">Monthly house rent paid (eligible for HRA exemption)</p>
                {errors.monthlyRent && (
                  <p className="text-sm text-red-600 mt-1">{errors.monthlyRent.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="insurancePremiums">Annual Insurance Premiums (₹)</Label>
                <Input
                  id="insurancePremiums"
                  type="number"
                  {...register('insurancePremiums', { valueAsNumber: true })}
                  placeholder="e.g., 50000"
                />
                <p className="text-xs text-gray-500 mt-1">Health & life insurance premiums (eligible for Section 80D deduction)</p>
              </div>
            </CardContent>
          </Card>

          {/* Demographics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Demographics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Age Group</Label>
                <RadioGroup 
                  value={watchedAgeGroup} 
                  onValueChange={(value) => setValue('ageGroup', value)}
                  className="mt-2"
                >
                  {['18-25', '26-35', '36-45', '46-55', '55+'].map((age) => (
                    <div key={age} className="flex items-center space-x-2">
                      <RadioGroupItem value={age} id={age} />
                      <Label htmlFor={age}>{age}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <p className="text-xs text-gray-500 mt-1">Age affects tax deduction limits and investment options</p>
                {errors.ageGroup && (
                  <p className="text-sm text-red-600 mt-1">{errors.ageGroup.message}</p>
                )}
              </div>

              <div>
                <Label>Employment Type</Label>
                <RadioGroup 
                  value={watchedEmploymentType} 
                  onValueChange={(value) => setValue('employmentType', value)}
                  className="mt-2"
                >
                  {[
                    { value: 'Salaried', label: 'Salaried Employee' },
                    { value: 'Self-employed', label: 'Self-employed/Business' },
                    { value: 'Government', label: 'Government Employee' }
                  ].map((type) => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={type.value} id={type.value} />
                      <Label htmlFor={type.value}>{type.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <p className="text-xs text-gray-500 mt-1">Different employment types have different tax benefits</p>
                {errors.employmentType && (
                  <p className="text-sm text-red-600 mt-1">{errors.employmentType.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Investments (Annual)</CardTitle>
            <p className="text-sm text-gray-600">Enter your existing investments to get personalized tax-saving suggestions</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="ppf">PPF (₹)</Label>
                <Input
                  id="ppf"
                  type="number"
                  {...register('investments.ppf', { valueAsNumber: true })}
                  placeholder="e.g., 150000"
                />
                <div className="mt-2 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-900 font-medium mb-1">PPF (Public Provident Fund):</p>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    The PPF is a government-backed savings account where you can deposit money every year and earn guaranteed interest (typically 7–8%). It's completely tax-free, and you can deduct up to ₹1.5 lakh per year from your taxable income under Section 80C. The lock-in period is 15 years, making it great for long-term savings like retirement or your child's future.
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="elss">ELSS (₹)</Label>
                <Input
                  id="elss"
                  type="number"
                  {...register('investments.elss', { valueAsNumber: true })}
                  placeholder="e.g., 50000"
                />
                <div className="mt-2 p-3 bg-green-50 rounded-md">
                  <p className="text-sm text-green-900 font-medium mb-1">ELSS (Equity Linked Saving Scheme):</p>
                  <p className="text-xs text-green-800 leading-relaxed">
                    ELSS is a mutual fund that invests in the stock market and also helps you save tax under Section 80C (up to ₹1.5 lakh per year). It has the shortest lock-in among all tax-saving options — just 3 years. While it's market-linked (returns may vary), it often gives higher returns than fixed deposits or PPF over the long term. Great for people who are comfortable with some risk and want better returns.
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="nps">NPS (₹)</Label>
                <Input
                  id="nps"
                  type="number"
                  {...register('investments.nps', { valueAsNumber: true })}
                  placeholder="e.g., 50000"
                />
                <div className="mt-2 p-3 bg-purple-50 rounded-md">
                  <p className="text-sm text-purple-900 font-medium mb-1">NPS (National Pension System):</p>
                  <p className="text-xs text-purple-800 leading-relaxed">
                    NPS is a retirement savings scheme run by the government. You invest money regularly, which is split between debt and equity (you can choose the mix). You can get up to ₹50,000 extra tax benefit in addition to Section 80C under Section 80CCD(1B). You can withdraw only after age 60, so it's ideal for people looking to build a secure retirement fund.
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="other">Other Investments (₹)</Label>
                <Input
                  id="other"
                  type="number"
                  {...register('investments.other', { valueAsNumber: true })}
                  placeholder="e.g., 25000"
                />
                <div className="mt-2 p-3 bg-orange-50 rounded-md">
                  <p className="text-sm text-orange-900 font-medium mb-1">Other Investments:</p>
                  <p className="text-xs text-orange-800 leading-relaxed">
                    This includes a variety of tax-saving tools like: 5-year Fixed Deposits (from banks, with tax benefits), ULIPs (insurance + investment combo plans), Sukanya Samriddhi Yojana (for girl child savings), Senior Citizen Saving Scheme (SCSS) (for those above 60). These are all eligible for deductions under Section 80C and are ideal based on your goals like education, health, or retirement.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button type="submit" disabled={isLoading} className="px-8 py-2">
            {isLoading ? 'Analyzing...' : 'Get Tax Suggestions'}
          </Button>
        </div>
      </form>
    </TooltipProvider>
  );
};

export default ProfileForm;
