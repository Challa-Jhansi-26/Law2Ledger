
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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="ppf">
                  <InvestmentTooltip 
                    title="PPF (₹)" 
                    description="Public Provident Fund - A 15-year tax-saving investment with EEE benefits. Maximum contribution: ₹1.5 lakh per year. Returns are tax-free."
                  />
                </Label>
                <Input
                  id="ppf"
                  type="number"
                  {...register('investments.ppf', { valueAsNumber: true })}
                  placeholder="e.g., 150000"
                />
              </div>
              <div>
                <Label htmlFor="elss">
                  <InvestmentTooltip 
                    title="ELSS (₹)" 
                    description="Equity Linked Savings Scheme - Mutual funds with 3-year lock-in period. Eligible for Section 80C deduction up to ₹1.5 lakh."
                  />
                </Label>
                <Input
                  id="elss"
                  type="number"
                  {...register('investments.elss', { valueAsNumber: true })}
                  placeholder="e.g., 50000"
                />
              </div>
              <div>
                <Label htmlFor="nps">
                  <InvestmentTooltip 
                    title="NPS (₹)" 
                    description="National Pension System - Retirement savings with additional ₹50,000 deduction under Section 80CCD(1B), over and above Section 80C limit."
                  />
                </Label>
                <Input
                  id="nps"
                  type="number"
                  {...register('investments.nps', { valueAsNumber: true })}
                  placeholder="e.g., 50000"
                />
              </div>
              <div>
                <Label htmlFor="other">
                  <InvestmentTooltip 
                    title="Other Investments (₹)" 
                    description="Other 80C investments like NSC, tax-saving FDs, life insurance premiums, home loan principal, children's tuition fees, etc."
                  />
                </Label>
                <Input
                  id="other"
                  type="number"
                  {...register('investments.other', { valueAsNumber: true })}
                  placeholder="e.g., 25000"
                />
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
