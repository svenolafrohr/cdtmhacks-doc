
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface WearableDataProps {
  wearableObservations: Array<{
    measurement_type: string;
    datetime: string;
    systolic?: number;
    diastolic?: number;
    frequency?: number;
    analyte?: string;
    level?: number;
    unit?: string;
    method?: string;
    ref_range_lower?: number;
    ref_range_upper?: number;
    is_abnormal?: boolean;
  }>;
}

const WearableDataSection: React.FC<WearableDataProps> = ({ wearableObservations }) => {
  if (!wearableObservations || wearableObservations.length === 0) return null;

  const renderWearableData = (data: WearableDataProps['wearableObservations'][0]) => {
    switch (data.measurement_type) {
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
        
      default:
        if (data.analyte) {
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
        return <div className="text-gray-500">No details available</div>;
    }
  };

  // Group by measurement type
  const groupedData = wearableObservations.reduce((acc, item) => {
    if (!acc[item.measurement_type]) {
      acc[item.measurement_type] = [];
    }
    acc[item.measurement_type].push(item);
    return acc;
  }, {} as Record<string, typeof wearableObservations>);

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
