
import React, { useMemo } from 'react';
import { formatDate } from '@/lib/utils';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import EditableSection from './EditableSection';

interface WearableDataProps {
  wearableObservations: {
    samples?: Array<{
      date: string;
      type: string;
      unit: string;
      value: number;
      device: string;
      source: string;
      metadata?: {
        HKMetadataKeyHeartRateMotionContext?: number;
      };
    }>;
  };
  colorScheme?: {
    bg: string;
    border: string;
    text: string;
    highlight: string;
    highlightText: string;
  };
}

const WearableDataSection: React.FC<WearableDataProps> = ({ wearableObservations, colorScheme }) => {
  const { samples = [] } = wearableObservations || {};
  
  // Group data by date for better organization
  const groupedByDate = useMemo(() => {
    if (!samples || samples.length === 0) return {};
    
    return samples.reduce((acc, sample) => {
      const date = sample.date ? formatDate(sample.date).split(',')[0] : 'Date not available';
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(sample);
      return acc;
    }, {} as Record<string, typeof samples>);
  }, [samples]);

  return (
    <EditableSection title="Wearable Data">
      {samples && samples.length > 0 ? (
        <>
          {Object.entries(groupedByDate).map(([date, dateData], dateIndex) => (
            <div key={dateIndex} className="mb-6 last:mb-0">
              <h4 className="text-sm font-medium text-gray-500 mb-2">{date}</h4>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Measurement</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dateData.map((sample, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{sample.type}</TableCell>
                        <TableCell>
                          {sample.value} {sample.unit}
                        </TableCell>
                        <TableCell>{sample.device}</TableCell>
                        <TableCell>{sample.source}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="py-3 text-center text-gray-500">No wearable data recorded</div>
      )}
    </EditableSection>
  );
};

export default WearableDataSection;
