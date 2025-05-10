
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface LabResultsProps {
  labResults: Array<{
    datetime: string;
    analyte: string;
    level: number;
    unit: string;
    method: string;
    ref_range_lower: number;
    ref_range_upper: number;
    is_abnormal: boolean;
    lab_provider: {
      name: string;
      address: string;
    };
  }>;
}

const LabResultsSection: React.FC<LabResultsProps> = ({ labResults }) => {
  if (!labResults || labResults.length === 0) return null;

  // Group lab results by date for better organization
  const groupedByDate = labResults.reduce((acc, result) => {
    const date = result.datetime ? formatDate(result.datetime).split(',')[0] : 'Date not available';
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(result);
    return acc;
  }, {} as Record<string, typeof labResults>);

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Lab Results</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(groupedByDate).map(([date, results], dateIndex) => (
          <div key={dateIndex} className="mb-6 last:mb-0">
            <h4 className="text-sm font-medium text-gray-500 mb-2">{date}</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Reference Range</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{result.analyte}</TableCell>
                    <TableCell>
                      {result.level} {result.unit}
                    </TableCell>
                    <TableCell>
                      {result.ref_range_lower}-{result.ref_range_upper} {result.unit}
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        result.is_abnormal 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {result.is_abnormal ? 'Abnormal' : 'Normal'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="text-xs text-gray-500 mt-1">
              Provider: {results[0]?.lab_provider.name}, {results[0]?.lab_provider.address}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LabResultsSection;
