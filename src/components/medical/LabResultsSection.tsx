
import React from 'react';
import { formatDate } from '@/lib/utils';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { AlertCircle } from 'lucide-react';
import EditableSection from './EditableSection';

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
  colorScheme?: {
    bg: string;
    border: string;
    text: string;
    highlight: string;
    highlightText: string;
  };
}

const LabResultsSection: React.FC<LabResultsProps> = ({ labResults, colorScheme }) => {
  if (!labResults || labResults.length === 0) {
    return (
      <EditableSection title="Lab Results">
        <div className="py-3 text-center text-gray-500">No lab results recorded</div>
      </EditableSection>
    );
  }

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
    <EditableSection title="Lab Results">
      {Object.entries(groupedByDate).map(([date, results], dateIndex) => (
        <div key={dateIndex} className="mb-6 last:mb-0">
          <h4 className="text-sm font-medium text-gray-500 mb-2">{date}</h4>
          <div className="overflow-x-auto">
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
                      <div className="flex items-center">
                        {result.is_abnormal ? (
                          <>
                            <AlertCircle className="h-4 w-4 text-red-600 mr-1" />
                            <span>Abnormal</span>
                          </>
                        ) : (
                          <span>Normal</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Provider: {results[0]?.lab_provider.name}, {results[0]?.lab_provider.address}
          </div>
        </div>
      ))}
    </EditableSection>
  );
};

export default LabResultsSection;
