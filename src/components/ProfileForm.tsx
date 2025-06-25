
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserProfile } from '@/pages/Index';

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

  return (
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
                {['Salaried', 'Self-employed', 'Government'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type}>{type}</Label>
                  </div>
                ))}
              </RadioGroup>
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
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="ppf">PPF (₹)</Label>
              <Input
                id="ppf"
                type="number"
                {...register('investments.ppf', { valueAsNumber: true })}
                placeholder="e.g., 150000"
              />
            </div>
            <div>
              <Label htmlFor="elss">ELSS (₹)</Label>
              <Input
                id="elss"
                type="number"
                {...register('investments.elss', { valueAsNumber: true })}
                placeholder="e.g., 50000"
              />
            </div>
            <div>
              <Label htmlFor="nps">NPS (₹)</Label>
              <Input
                id="nps"
                type="number"
                {...register('investments.nps', { valueAsNumber: true })}
                placeholder="e.g., 50000"
              />
            </div>
            <div>
              <Label htmlFor="other">Other (₹)</Label>
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
  );
};

export default ProfileForm;
