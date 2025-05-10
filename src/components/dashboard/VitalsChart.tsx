
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface VitalsChartProps {
  data: Array<{
    date: string;
    systolic: number;
    diastolic: number;
    heartRate: number;
    temperature: number;
  }>;
  metric: 'bloodPressure' | 'heartRate' | 'temperature';
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const VitalsChart: React.FC<VitalsChartProps> = ({ data, metric }) => {
  let yAxisDomain: [number, number];
  let renderLines;
  let yAxisLabel = '';
  let referenceLine = null;

  switch (metric) {
    case 'bloodPressure':
      yAxisDomain = [60, 160];
      yAxisLabel = 'mmHg';
      renderLines = (
        <>
          <Line
            type="monotone"
            dataKey="systolic"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            name="Systolic"
          />
          <Line
            type="monotone"
            dataKey="diastolic"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            name="Diastolic"
          />
          <ReferenceLine y={120} stroke="#EF4444" strokeDasharray="3 3" label="Systolic normal" />
          <ReferenceLine y={80} stroke="#3B82F6" strokeDasharray="3 3" label="Diastolic normal" />
        </>
      );
      break;
    case 'heartRate':
      yAxisDomain = [40, 120];
      yAxisLabel = 'BPM';
      renderLines = (
        <Line
          type="monotone"
          dataKey="heartRate"
          stroke="#8B5CF6"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
          name="Heart Rate"
        />
      );
      referenceLine = <ReferenceLine y={75} stroke="#8B5CF6" strokeDasharray="3 3" label="Normal range" />;
      break;
    case 'temperature':
      yAxisDomain = [97, 102];
      yAxisLabel = '°F';
      renderLines = (
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#F59E0B"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
          name="Temperature"
        />
      );
      referenceLine = <ReferenceLine y={98.6} stroke="#F59E0B" strokeDasharray="3 3" label="Normal" />;
      break;
  }

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height={240}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate} 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={yAxisDomain} 
            tick={{ fontSize: 12 }}
            label={{ 
              value: yAxisLabel, 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 12 }
            }}
          />
          <Tooltip 
            formatter={(value) => [`${value}`, '']}
            labelFormatter={(label) => {
              try {
                return new Date(label).toLocaleDateString();
              } catch (e) {
                return label;
              }
            }}
          />
          <Legend />
          {renderLines}
          {referenceLine}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VitalsChart;
