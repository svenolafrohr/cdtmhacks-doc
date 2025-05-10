
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Calendar } from 'lucide-react';

interface AssessmentPlanProps {
  assessment: {
    summary: string;
  };
  plan: {
    plan: string;
    next_appointment: string;
  };
}

const AssessmentPlanSection: React.FC<AssessmentPlanProps> = ({ assessment, plan }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Assessment & Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-500 mb-1">Assessment</h4>
          <p className="text-gray-900 whitespace-pre-line">{assessment?.summary || 'No assessment provided'}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Plan</h4>
          <p className="text-gray-900 whitespace-pre-line">{plan?.plan || 'No plan provided'}</p>
          
          {plan?.next_appointment && (
            <div className="mt-3 p-2 bg-blue-50 border border-blue-100 rounded-md">
              <div className="flex items-center text-sm font-medium text-blue-700">
                <Calendar className="h-4 w-4 mr-1" /> 
                <span>Next Appointment</span>
              </div>
              <div className="text-blue-900">
                {formatDate(plan.next_appointment)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentPlanSection;
