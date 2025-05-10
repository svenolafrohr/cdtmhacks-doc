
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

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
  // Early return if no data is present, but still render the component with a message
  if (!wearableObservations) {
    return (
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Wearable Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-gray-500">
            Keine Wearable-Daten vorhanden
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Access samples array safely, defaulting to an empty array if not present
  const samples = wearableObservations.samples || [];
  
  // If samples array is empty, show empty state
  if (samples.length === 0) {
    return (
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Wearable Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-gray-500">
            Keine Wearable-Daten vorhanden
          </div>
        </CardContent>
      </Card>
    );
  }

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
  
  // Prepare chart data
  const prepareChartData = (dataArray: any[]) => {
    return dataArray
      .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
      .map(item => {
        return {
          date: item.datetime,
          value: item.frequency || item.level,
          unit: item.unit
        };
      });
  };
  
  // Get chart configuration based on measurement type
  const getChartConfig = (type: string) => {
    switch(type) {
      case 'heart_rate':
        return {
          color: '#ef4444',
          refValue: 75,
          refLabel: 'Normal resting rate',
          yAxisDomain: [40, 180],
          unit: 'bpm'
        };
      case 'blood_pressure':
        return {
          color: '#3b82f6',
          refValue: 120,
          refLabel: 'Normal systolic',
          yAxisDomain: [60, 180],
          unit: 'mmHg'
        };
      default:
        return {
          color: '#8b5cf6',
          yAxisDomain: ['auto', 'auto'],
          unit: ''
        };
    }
  };

  const renderWearableChart = (type: string, dataArray: any[]) => {
    const chartData = prepareChartData(dataArray);
    const config = getChartConfig(type);
    
    // Skip charts if there's not enough data
    if (chartData.length < 2) return null;
    
    return (
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => formatDate(value).split(',')[0]} 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={config.yAxisDomain} 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value} ${config.unit || chartData[0]?.unit || ''}`, '']}
              labelFormatter={(label) => formatDate(label).split(',')[0]}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={config.color} 
              activeDot={{ r: 8 }}
              name={type.replace('_', ' ')}
            />
            {config.refValue && (
              <ReferenceLine 
                y={config.refValue} 
                stroke={config.color} 
                strokeDasharray="3 3" 
                label={{ value: config.refLabel, fill: config.color, fontSize: 12 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

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
          <div key={type} className="mb-6 last:mb-0">
            <h4 className="font-medium text-gray-900 mb-2 capitalize">
              {type.replace('_', ' ')}
            </h4>
            
            {/* Add chart visualization */}
            {renderWearableChart(type, data)}
            
            <div className="space-y-3 mt-3">
              {data.slice(0, 3).map((item, index) => (
                <div key={index} className="flex justify-between items-start pb-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    {renderWearableData(item)}
                    {item.method && (
                      <div className="text-xs text-gray-500 mt-0.5">Method: {item.method}</div>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {item.datetime ? formatDate(item.datetime).split(',')[0] : 'Date not available'}
                  </span>
                </div>
              ))}
              {data.length > 3 && (
                <div className="text-xs text-gray-500 text-center">
                  + {data.length - 3} more measurements
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WearableDataSection;
