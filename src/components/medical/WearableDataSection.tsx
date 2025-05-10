
import React, { useMemo } from 'react';
import { formatDate } from '@/lib/utils';
import EditableSection from './EditableSection';
import WearableDataChart from './WearableDataChart';

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
  
  // Group data by measurement type for graphing
  const groupedByType = useMemo(() => {
    if (!samples || samples.length === 0) return {};
    
    return samples.reduce((acc, sample) => {
      const type = sample.type || 'Unknown';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(sample);
      return acc;
    }, {} as Record<string, typeof samples>);
  }, [samples]);

  return (
    <EditableSection title="Wearable Data">
      {samples && samples.length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedByType).map(([type, data], index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h4 className="text-sm font-medium text-gray-500 mb-2">{type}</h4>
              <WearableDataChart data={data} />
              <div className="mt-2 text-xs text-gray-500">
                <span>Quelle: {data[0]?.source || 'Unknown'}</span>
                <span className="ml-4">Gerät: {data[0]?.device || 'Unknown'}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-3 text-center text-gray-500">No wearable data recorded</div>
      )}
    </EditableSection>
  );
};

export default WearableDataSection;
