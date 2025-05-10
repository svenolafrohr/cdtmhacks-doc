
import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

  // Process data for chart display
  const chartData = useMemo(() => {
    if (!samples || samples.length === 0) return [];
    
    // Group by date and type
    const groupedData = samples.reduce((acc, sample) => {
      const date = sample.date ? formatDate(sample.date).split(',')[0] : 'Unknown Date';
      
      if (!acc[date]) {
        acc[date] = {};
      }
      
      // For multiple readings of the same type in a day, take the average
      if (acc[date][sample.type]) {
        acc[date][sample.type].sum += sample.value;
        acc[date][sample.type].count += 1;
        acc[date][sample.type].unit = sample.unit;
      } else {
        acc[date][sample.type] = {
          sum: sample.value,
          count: 1,
          unit: sample.unit
        };
      }
      
      return acc;
    }, {} as Record<string, Record<string, {sum: number, count: number, unit: string}>>);
    
    // Convert to array format for recharts
    return Object.entries(groupedData).map(([date, types]) => {
      const point: any = { date };
      
      Object.entries(types).forEach(([type, data]) => {
        point[type] = data.sum / data.count;
        point[`${type}Unit`] = data.unit;
      });
      
      return point;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [samples]);
  
  // Get unique measurement types for chart configuration
  const measurementTypes = useMemo(() => {
    const types = new Set<string>();
    samples.forEach(sample => {
      types.add(sample.type);
    });
    return Array.from(types);
  }, [samples]);
  
  // Colors for different measurement types
  const typeColors = {
    "HeartRate": "#FF5252",
    "StepCount": "#4CAF50",
    "DistanceWalkingRunning": "#2196F3",
    "ActiveEnergyBurned": "#FFC107",
    "BloodPressureSystolic": "#9C27B0",
    "BloodPressureDiastolic": "#673AB7",
    "RespiratoryRate": "#00BCD4",
    "OxygenSaturation": "#3F51B5"
  };
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Wearable Data</CardTitle>
      </CardHeader>
      <CardContent>
        {samples && samples.length > 0 ? (
          <>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name, props) => {
                      const unit = props.payload[`${name}Unit`];
                      return [`${value} ${unit}`, name];
                    }}
                  />
                  <Legend />
                  {measurementTypes.map((type) => (
                    <Line 
                      key={type} 
                      type="monotone" 
                      dataKey={type} 
                      stroke={typeColors[type as keyof typeof typeColors] || colorScheme?.text || '#8884d8'} 
                      activeDot={{ r: 8 }} 
                      name={type}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              {measurementTypes.map((type) => (
                <div key={type} className="text-sm">
                  <span 
                    className="inline-block w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: typeColors[type as keyof typeof typeColors] || colorScheme?.text || '#8884d8' }}
                  />
                  <span className="font-medium">{type}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-6 text-center text-gray-500">No wearable data recorded</div>
        )}
      </CardContent>
    </Card>
  );
};

export default WearableDataSection;
