import React, { useMemo } from 'react';
import { formatDate } from '@/lib/utils';
import EditableSection from './EditableSection';
import WearableDataChart from './WearableDataChart';

interface WearableDataPoint {
  date: string;
  type: string;
  unit: string;
  value: number;
  device: string;
  source: string;
  measurement_type?: string;
  datetime?: string;
  level?: number;
  systolic?: number;
  diastolic?: number;
  metadata?: {
    HKMetadataKeyHeartRateMotionContext?: number;
  };
}

interface WearableDataProps {
  wearableObservations: WearableDataPoint[] | {
    samples?: WearableDataPoint[];
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
  // Handle both array and object with samples property formats
  const samples = useMemo(() => {
    if (!wearableObservations) return [];
    
    // If wearableObservations is an array, use it directly
    if (Array.isArray(wearableObservations)) {
      return wearableObservations;
    }
    
    // Otherwise, try to access the samples property if it exists
    return (wearableObservations as { samples?: WearableDataPoint[] }).samples || [];
  }, [wearableObservations]);
  
  // Transform data points to a consistent format
  const normalizedSamples = useMemo(() => {
    return samples.map(sample => {
      return {
        date: sample.date || sample.datetime || new Date().toISOString(),
        type: sample.type || sample.measurement_type || 'Unknown',
        unit: sample.unit || '',
        value: sample.value !== undefined ? sample.value : sample.level || 0,
        device: sample.device || 'Unknown',
        source: sample.source || 'Unknown',
        metadata: sample.metadata,
        // Handle blood pressure specially
        ...(sample.measurement_type === 'blood pressure' && {
          systolic: sample.systolic,
          diastolic: sample.diastolic
        })
      };
    });
  }, [samples]);
  
  // Group data by measurement type for graphing
  const groupedByType = useMemo(() => {
    if (!normalizedSamples || normalizedSamples.length === 0) return {};
    
    return normalizedSamples.reduce((acc, sample) => {
      const type = sample.type || 'Unknown';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(sample);
      return acc;
    }, {} as Record<string, typeof normalizedSamples>);
  }, [normalizedSamples]);

  return (
    <EditableSection title="Wearable Data">
      {normalizedSamples && normalizedSamples.length > 0 ? (
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
