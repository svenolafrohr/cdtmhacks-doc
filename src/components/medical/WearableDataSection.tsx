
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface WearableSample {
  date: string;
  type: string;
  unit: string;
  value: number;
  device: string;
  source: string;
  metadata?: {
    HKMetadataKeyHeartRateMotionContext?: number;
  };
}

interface WearableData {
  samples?: WearableSample[];
}

interface WearableDataProps {
  wearableObservations: WearableData | null;
}

const WearableDataSection: React.FC<WearableDataProps> = ({ wearableObservations }) => {
  // Early return if no data or samples array is missing/empty
  if (!wearableObservations || !wearableObservations.samples || wearableObservations.samples.length === 0) return null;
  
  // Use the samples array from the wearable data structure
  const samples = wearableObservations.samples;

  // Transform Apple Health data types to more readable formats
  const getMeasurementType = (type: string) => {
    if (type === 'HKQuantityTypeIdentifierHeartRate') return 'heart_rate';
    if (type === 'HKQuantityTypeIdentifierBloodPressureSystolic') return 'blood_pressure';
    return type;
  };

  // Group by measurement type - using proper array methods on samples
  const groupedData = samples.reduce((acc: Record<string, Array<any>>, item) => {
    const measurementType = getMeasurementType(item.type);
    
    if (!acc[measurementType]) {
      acc[measurementType] = [];
    }
    
    // Transform the data to match the expected format for rendering
    const transformedItem = {
      measurement_type: measurementType,
      datetime: item.date,
      frequency: measurementType === 'heart_rate' ? item.value * 60 : undefined, // Convert from count/s to bpm
      level: measurementType !== 'heart_rate' ? item.value : undefined,
      unit: item.unit,
      method: item.source,
      is_abnormal: false // We don't have abnormal data in the sample
    };
    
    acc[measurementType].push(transformedItem);
    return acc;
  }, {});

  const renderWearableData = (data: any) => {
    switch (data.measurement_type) {
      case 'heart_rate':
        return (
          <div className="flex">
            <span className="font-medium">{data.frequency}</span>
            <span className="ml-1">bpm</span>
            {data.is_abnormal && (
              <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Abnormal</span>
            )}
          </div>
        );
        
      case 'blood_pressure':
        return (
          <div className="flex">
            <span className="font-medium">{data.systolic}/{data.diastolic}</span>
            <span className="ml-1">mmHg</span>
            {data.is_abnormal && (
              <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Abnormal</span>
            )}
          </div>
        );
      
      default:
        return (
          <div>
            <div className="flex">
              <span className="font-medium">{data.level}</span>
              <span className="ml-1">{data.unit}</span>
              {data.is_abnormal && (
                <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Abnormal</span>
              )}
            </div>
            {(data.ref_range_lower !== undefined && data.ref_range_upper !== undefined) && (
              <div className="text-xs text-gray-500 mt-0.5">
                Reference: {data.ref_range_lower}-{data.ref_range_upper} {data.unit}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Wearable Data</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(groupedData).map(([type, data]) => (
          <div key={type} className="mb-4 last:mb-0">
            <h4 className="font-medium text-gray-900 mb-2 capitalize">
              {type.replace('_', ' ')}
            </h4>
            
            <div className="space-y-3">
              {data.map((item, index) => (
                <div key={index} className="flex justify-between items-start pb-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    {renderWearableData(item)}
                    {item.method && (
                      <div className="text-xs text-gray-500 mt-0.5">Method: {item.method}</div>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {item.datetime ? formatDate(item.datetime) : 'Date not available'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WearableDataSection;
