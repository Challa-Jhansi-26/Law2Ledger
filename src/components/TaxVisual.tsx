
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TaxData } from '@/pages/Index';
import { Info } from 'lucide-react';

interface TaxVisualProps {
  data: TaxData;
}

const TaxVisual: React.FC<TaxVisualProps> = ({ data }) => {
  const chartConfig = {
    currentIncome: {
      label: "Current Taxable Income",
      color: "#ef4444",
    },
    savings: {
      label: "Potential Savings",
      color: "#22c55e",
    },
    finalIncome: {
      label: "Final Taxable Income",
      color: "#3b82f6",
    },
  };

  const barChartData = [
    {
      name: 'Current Taxable Income',
      value: data.currentTaxableIncome,
      fill: '#ef4444',
    },
    {
      name: 'Potential Savings',
      value: data.potentialSavings,
      fill: '#22c55e',
    },
    {
      name: 'Final Taxable Income',
      value: data.finalTaxableAmount,
      fill: '#3b82f6',
    },
  ];

  const pieChartData = [
    {
      name: 'Taxable Amount',
      value: data.finalTaxableAmount,
      fill: '#3b82f6',
    },
    {
      name: 'Tax Savings',
      value: data.potentialSavings,
      fill: '#22c55e',
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const TaxTooltip = ({ title, description }: { title: string; description: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" className="inline-flex items-center gap-1 hover:text-blue-600">
            <span>{title}</span>
            <Info className="h-3 w-3" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="max-w-xs">
            <p className="text-sm">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <TaxTooltip 
                title="Current Taxable Income"
                description="Your total income that is subject to tax after basic exemptions but before applying any deductions or investments."
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(data.currentTaxableIncome)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Before applying tax-saving strategies
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <TaxTooltip 
                title="Potential Savings"
                description="The amount you can save in taxes by utilizing various deductions like Section 80C, 80D, HRA exemption, and other available tax benefits."
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(data.potentialSavings)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Through recommended strategies
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <TaxTooltip 
                title="Final Taxable Income"
                description="Your reduced taxable income after applying all recommended deductions and tax-saving investments. This is the amount on which you'll actually pay taxes."
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(data.finalTaxableAmount)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              After applying strategies
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Explanation Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-medium text-blue-900">Understanding Your Tax Breakdown</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                The charts below show how strategic tax planning can reduce your taxable income. 
                By investing in tax-saving instruments and claiming eligible deductions, you can 
                significantly lower your tax liability while building wealth for the future.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Breakdown Comparison</CardTitle>
            <p className="text-sm text-gray-600">
              Visual comparison of your income before and after tax optimization
            </p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Income Distribution</CardTitle>
            <p className="text-sm text-gray-600">
              Proportion of taxable income vs. potential savings
            </p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center gap-4 mt-4">
              {pieChartData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.fill }}
                  />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxVisual;
