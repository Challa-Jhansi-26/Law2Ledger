
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PolicySuggestion } from '@/pages/Index';

interface SuggestedPoliciesProps {
  suggestions: PolicySuggestion[];
}

const SuggestedPolicies: React.FC<SuggestedPoliciesProps> = ({ suggestions }) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'investment':
        return 'bg-blue-100 text-blue-800';
      case 'insurance':
        return 'bg-green-100 text-green-800';
      case 'allowance':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (suggestions.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-gray-500">No suggestions available. Please submit your financial profile first.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {suggestions.map((suggestion) => (
        <Card key={suggestion.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start gap-2">
              <CardTitle className="text-lg leading-tight">{suggestion.title}</CardTitle>
              <Badge className={getCategoryColor(suggestion.category)}>
                {suggestion.category}
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {suggestion.estimatedSavings}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              {suggestion.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SuggestedPolicies;
