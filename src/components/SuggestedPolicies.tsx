
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PolicySuggestion } from '@/pages/Index';
import { ExternalLink, BookOpen } from 'lucide-react';

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

  const handleLearnMore = (suggestionId: string) => {
    // This would typically navigate to a detailed page or open a modal
    console.log(`Opening detailed information for suggestion: ${suggestionId}`);
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
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-sm">
              {suggestion.description}
            </p>
            
            {/* Additional details for better understanding */}
            <div className="space-y-2">
              {suggestion.details && (
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium text-blue-900 text-sm mb-1">How it works:</h4>
                  <p className="text-blue-800 text-xs">{suggestion.details}</p>
                </div>
              )}
              
              {suggestion.eligibility && (
                <div className="bg-amber-50 p-3 rounded-md">
                  <h4 className="font-medium text-amber-900 text-sm mb-1">Eligibility:</h4>
                  <p className="text-amber-800 text-xs">{suggestion.eligibility}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleLearnMore(suggestion.id)}
                className="flex-1"
              >
                <BookOpen className="h-3 w-3 mr-1" />
                Learn More
              </Button>
              {suggestion.officialLink && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open(suggestion.officialLink, '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SuggestedPolicies;
