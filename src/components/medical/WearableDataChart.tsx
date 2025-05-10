
import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { formatDate } from '@/lib/utils';

interface WearableDataPoint {
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

interface WearableDataChartProps {
  data: WearableDataPoint[];
}

const WearableDataChart: React.FC<WearableDataChartProps> = ({ data }) => {
  // Sort data by date to ensure chronological display
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  // Determine color based on measurement type
  const getLineColor = (type: string): string => {
    const typeToColor: Record<string, string> = {
      'HeartRate': '#EF4444', // Red
      'BloodPressure': '#3B82F6', // Blue
      'Steps': '#10B981', // Green
      'BodyTemperature': '#F59E0B', // Amber
      'BloodGlucose': '#8B5CF6', // Purple
      'Weight': '#6366F1', // Indigo
      'SleepAnalysis': '#6B7280', // Gray
      'DistanceWalkingRunning': '#EC4899', // Pink
      'RespiratoryRate': '#14B8A6', // Teal
      'OxygenSaturation': '#06B6D4', // Cyan
    };

    return typeToColor[type] || '#6B7280'; // Default to gray if type is not found
  };

  const formatCustomTick = (tickItem: any) => {
    try {
      const date = new Date(tickItem);
      return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
    } catch (e) {
      return tickItem;
    }
  };

  const unit = data[0]?.unit || '';
  const type = data[0]?.type || 'Measurement';
  const lineColor = getLineColor(type);

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sortedData}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatCustomTick}
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fontSize: 12 }}
            label={{
              value: unit,
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 12, fill: '#6B7280' }
            }}
          />
          <Tooltip
            formatter={(value) => [`${value} ${unit}`, type]}
            labelFormatter={(label) => {
              try {
                return formatDate(label, true);
              } catch (e) {
                return label;
              }
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            name={type}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WearableDataChart;
